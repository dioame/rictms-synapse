<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class Security
{
    public static function checkCspHeaders($url)
    {
        try {
            $response = Http::timeout(10)->get($url);
    
            if ($response->failed()) {
                return [
                    "message" => "Error: Unable to reach the URL ($url). Status Code: " . $response->status(),
                    "is_secure" => false
                ];
            }
    
            // Get CSP Header
            $cspHeader = $response->header('Content-Security-Policy');
    
            return [
                "message" => $cspHeader ? "CSP Header Found: " . $cspHeader : "No CSP Header Found!",
                "is_secure" => (bool) $cspHeader
            ];
        } catch (RequestException $e) {
            return [
                "message" => "Request Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        } catch (\Exception $e) {
            return [
                "message" => "General Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        }
    }


    public static function checkServerLeakers($url)
    {
        try {
            $response = Http::timeout(10)->get($url);

            if ($response->failed()) {
                return [
                    "message" => "Error: Unable to reach the URL ($url). Status Code: " . $response->status(),
                    "is_secure" => false
                ];
            }

            // Check for Potentially Leaked Server Information
            $leakedInfo = [];
            $headersToCheck = ['Server', 'X-Powered-By', 'X-AspNet-Version', 'X-Backend-Server'];

            foreach ($headersToCheck as $header) {
                $headerValue = $response->header($header);

                if ($headerValue) {
                    // If it's the "Server" header, ensure it doesn't contain a version number
                    if ($header === 'Server' && !preg_match('/\d/', $headerValue)) {
                        continue; // Skip adding it if no version is present
                    }

                    $leakedInfo[$header] = $headerValue;
                }
            }

            return [
                "message" => empty($leakedInfo) ? "No Server Info Leaked!" : "Leaked Info Found",
                "is_secure" => empty($leakedInfo), // Secure if no sensitive headers are found
                "leaked_headers" => $leakedInfo
            ];
        } catch (RequestException $e) {
            return [
                "message" => "Request Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        } catch (\Exception $e) {
            return [
                "message" => "General Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        }
    }

    public static function checkInsecureCookies($url)
    {
        try {
            $response = Http::timeout(10)->get($url);

            if ($response->failed()) {
                return [
                    "message" => "Error: Unable to reach the URL ($url). Status Code: " . $response->status(),
                    "is_secure" => false
                ];
            }

            // ✅ Extract cookies from response headers
            $cookieHeader = $response->header('Set-Cookie');
            $insecureCookies = [];

            if ($cookieHeader) {
                $cookies = is_array($cookieHeader) ? $cookieHeader : [$cookieHeader];

                foreach ($cookies as $cookie) {
                    $hasHttpOnly = str_contains(strtolower($cookie), 'httponly');
                    $hasSecure = str_contains(strtolower($cookie), 'secure');

                    if (!$hasHttpOnly) {
                        $insecureCookies[] = "Cookie without HttpOnly: " . strtok($cookie, ';');
                    }
                    if (!$hasSecure) {
                        $insecureCookies[] = "Cookie without Secure: " . strtok($cookie, ';');
                    }
                }
            }

            return [
                "message" => empty($insecureCookies) ? "✅ All cookies are secure!" : "⚠️ Insecure Cookies Found",
                "is_secure" => empty($insecureCookies), // Secure if no insecure cookies are found
                "insecure_cookies" => $insecureCookies
            ];
        } catch (RequestException $e) {
            return [
                "message" => "❌ Request Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        } catch (\Exception $e) {
            return [
                "message" => "❌ General Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        }
    }

    public static function checkClickjackingProtection($url)
    {
        try {
            $response = Http::timeout(10)->get($url);

            if ($response->failed()) {
                return [
                    "message" => "❌ Error: Unable to reach the URL ($url). Status Code: " . $response->status(),
                    "is_secure" => false
                ];
            }

            // ✅ Check for 'X-Frame-Options' Header
            $xFrameOptions = $response->header('X-Frame-Options');
            $cspHeader = $response->header('Content-Security-Policy');

            $hasCspFrameAncestors = $cspHeader && str_contains(strtolower($cspHeader), 'frame-ancestors');

            $isSecure = $xFrameOptions || $hasCspFrameAncestors;

            return [
                "message" => $isSecure
                    ? "✅ Clickjacking Protection Found!"
                    : "⚠️ No Clickjacking Protection! Missing 'X-Frame-Options' and 'Content-Security-Policy (frame-ancestors)'.",
                "is_secure" => $isSecure,
                "protection_headers" => [
                    "X-Frame-Options" => $xFrameOptions ?: "Not Set",
                    "CSP frame-ancestors" => $hasCspFrameAncestors ? "Set" : "Not Set"
                ]
            ];
        } catch (RequestException $e) {
            return [
                "message" => "❌ Request Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        } catch (\Exception $e) {
            return [
                "message" => "❌ General Error: " . $e->getMessage(),
                "is_secure" => false
            ];
        }
    }

    public static function checkSecurity($url)
    {
        return [
            self::formatSecurityCheck("CSP Headers", 
                "Evaluating the effectiveness of Content Security Policy (CSP) headers to mitigate code injection attacks.",
                self::checkCspHeaders($url),
                "Implement strict CSP policies to prevent unauthorized script execution."
            ),

            self::formatSecurityCheck("Server Info Leaks", 
                "Checking for exposed server information that could help attackers fingerprint the system.",
                self::checkServerLeakers($url),
                "Remove or obfuscate server-related headers to prevent information disclosure."
            ),

            self::formatSecurityCheck("Insecure Cookies", 
                "Assessing whether cookies have the proper security attributes (Secure and HttpOnly).",
                self::checkInsecureCookies($url),
                "Ensure all cookies are set with Secure and HttpOnly flags to prevent unauthorized access."
            ),

            self::formatSecurityCheck("Clickjacking Protection", 
                "Verifying the presence of headers that prevent clickjacking attacks.",
                self::checkClickjackingProtection($url),
                "Implement 'X-Frame-Options' or 'Content-Security-Policy: frame-ancestors' to mitigate clickjacking risks."
            )
        ];
    }

    private static function formatSecurityCheck($name, $description, $checkResult, $recommendation)
    {
        return [
            "name" => $name." (".$checkResult["message"].")",
            "description" => $description,
            "isSecure" => $checkResult["is_secure"],
            "recommendation" => $checkResult["is_secure"] ? "No action needed. System is secure." : $recommendation
        ];
    }

    public static function countSecureChecks($url)
    {
        $securityResults = self::checkSecurity($url);

        // Count the number of checks that are secure (is_secure is true)
        $secureCount = array_reduce($securityResults, function ($count, $check) {
            return $count + ($check['isSecure'] ? 1 : 0);
        }, 0);

        return $secureCount;
    }
}