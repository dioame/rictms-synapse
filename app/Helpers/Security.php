<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class Security
{
    public static function checkCspHeaders($url)
    {
        
        try {
      
    
            $response = Http::timeout(10)->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer' => $url,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            ])->get($url);

    
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
            $response = Http::timeout(10)->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer' => $url,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            ])->get($url);

            // Check for Potentially Leaked Server Information
            $leakedInfo = [];
            $headersToCheck = ['Server', 'X-Powered-By', 'X-AspNet-Version', 'X-Backend-Server'];

            foreach ($headersToCheck as $header) {
                $headerValue = $response->header($header);

            

                if ($headerValue) {
                    // If it's the "Server" header, ensure it contains a version number (digits after a slash)
                    if ($header === 'Server' && preg_match('/\/\d/', $headerValue)) {
                        // This checks if there is a server version number like "nginx/1.18.0"
                        $leakedInfo[$header] = $headerValue;
                    }
                    // If the header is one of the others, just add it directly
                    else if ($header !== 'Server') {
                        $leakedInfo[$header] = $headerValue;
                    }
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
            $response = Http::timeout(10)->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer' => $url,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            ])->get($url);

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
            $response = Http::timeout(10)->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer' => $url,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            ])->get($url);

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


    public static function checkCaptcha($url)
    {
        try {
            $response = Http::timeout(10)->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer' => $url,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            ])->get($url);

            $body = $response->body();
            $headers = $response->headers();

            // Extended CAPTCHA detection indicators (including reCAPTCHA v3)
            $captchaIndicators = [
                'g-recaptcha', 
                'hcaptcha',
                'cf-challenge',
                'data-sitekey', 
                'captcha',
                'grecaptcha.execute', // reCAPTCHA v3 execution
                'recaptcha/api.js?render=explicit', // reCAPTCHA v3 script
                'recaptcha.net/recaptcha/api.js?render=', // Alternate domain for reCAPTCHA v3
                'action="submit-captcha"', // Hidden form field sometimes used
                'grecaptcha.ready', // reCAPTCHA v3 initialization
                'window.__google_recaptcha_client', // Google reCAPTCHA v3 client variable
                'invisible-recaptcha', // Commonly used in reCAPTCHA v3 implementations
                'async defer src="https://www.google.com/recaptcha/api.js', // External script reference
                'async defer src="https://www.recaptcha.net/recaptcha/api.js' // Alternate Google domain
            ];
            
            foreach ($captchaIndicators as $indicator) {
                if (stripos($body, $indicator) !== false) {
                    return [
                        'status' => true,
                        'message' => 'CAPTCHA detected (possibly reCAPTCHA v3)',
                        'is_secure' => true
                    ];
                }
            }

            // Check for Cloudflare CAPTCHA challenge headers
            if (isset($headers['Server']) && stripos($headers['Server'][0], 'cloudflare') !== false && 
                isset($headers['cf-challenge'])) {
                return [
                    'status' => true,
                    'message' => 'Cloudflare CAPTCHA detected',
                    'is_secure' => true
                ];
            }

            return [
                'status' => false,
                'message' => 'No CAPTCHA detected',
                'is_secure' => false
            ];
        } catch (\Exception $e) {
            return [
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'is_secure' => false
            ];
        }
    }



    public static function checkSecurity($url)
    { 
        if($url){
            return [
                self::formatSecurityCheck("CSP Headers", 
                    "Evaluating the effectiveness of Content Security Policy (CSP) headers to mitigate code injection attacks.",
                    self::checkCspHeaders($url),
                    "Implement strict CSP policies to prevent unauthorized script execution.",
                    [
                        'https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy',
                        'https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html',
                        'https://www.w3.org/TR/CSP/',
                        'https://w3c.github.io/webappsec-csp/',
                        'https://web.dev/articles/csp',
                        'https://caniuse.com/#feat=contentsecuritypolicy',
                        'https://content-security-policy.com/'
                    ]
                ),
    
    
    
                self::formatSecurityCheck("Server Info Leaks", 
                    "Checking for exposed server information that could help attackers fingerprint the system.",
                    self::checkServerLeakers($url),
                    "Remove or obfuscate server-related headers to prevent information disclosure.",
                    [
                        'https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework',
                        'https://www.troyhunt.com/2012/02/shhh-dont-let-your-response-headers.html'
                    ]
                ),
    
                self::formatSecurityCheck("Insecure Cookies", 
                    "Assessing whether cookies have the proper security attributes (Secure and HttpOnly).",
                    self::checkInsecureCookies($url),
                    "Ensure all cookies are set with Secure and HttpOnly flags to prevent unauthorized access.",
                    [
                        'https://owasp.org/www-community/HttpOnly',
                        'https://owasp.org/www-project-web-security-testing-guide/v41/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes.html'
                    ]
                ),
    
                self::formatSecurityCheck("Clickjacking Protection", 
                    "Verifying the presence of headers that prevent clickjacking attacks.",
                    self::checkClickjackingProtection($url),
                    "Implement 'X-Frame-Options' or 'Content-Security-Policy: frame-ancestors' to mitigate clickjacking risks. Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.
                    If you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's `frame-ancestors` directive",
                    [
                        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options'
                    ]
                ),
    
                self::formatSecurityCheck("Check Captcha", 
                    "Verifying the presence of CAPTCHA mechanisms to prevent automated abuse.",
                    self::checkCaptcha($url),
                    "Implement CAPTCHA mechanisms to prevent automated abuse.",
                    []
                )
    
      
            ];
        }
       
    }
    

    private static function formatSecurityCheck($name, $description, $checkResult, $recommendation, $references)
    {
        return [
            "name" => $name." (".$checkResult["message"].")",
            "description" => $description,
            "isSecure" => $checkResult["is_secure"],
            "recommendation" => $checkResult["is_secure"] ? "No action needed. System is secure." : $recommendation,
            "references" => $references
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


    public static function checkJS($url)
    {

        try {
            // Initialize Guzzle client
            $client = new Client();
            $response = $client->get($url);
            $html = $response->getBody()->getContents();
    
            // Parse HTML using DomCrawler
            $crawler = new Crawler($html);
    
            // Extract JavaScript URLs
            $scripts = $crawler->filter('script[src]')->each(function ($node) {
                return $node->attr('src');
            });
    
            // Extract JavaScript versions
            $jsVersions = [];
            foreach ($scripts as $script) {
                if (preg_match('/([a-zA-Z0-9-]+)@([0-9]+\.[0-9]+\.[0-9]+)/', $script, $matches)) {
                    $jsVersions[$matches[1]] = $matches[2]; // Library => Version
                }
            }
    
            // Check vulnerabilities
            $vulnerabilities = [];
            foreach ($jsVersions as $lib => $version) {
                $vulnData = $this->checkNvdVulnerabilities($lib, $version);
                if (!empty($vulnData)) {
                    $vulnerabilities[$lib] = $vulnData;
                }
            }
    
            return response()->json([
                'scripts' => $scripts,
                'js_versions' => $jsVersions,
                'vulnerabilities' => $vulnerabilities,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch the website. ' . $e->getMessage()
            ], 500);
        }
    }

    private function checkNvdVulnerabilities($library, $version)
    {
        $client = new Client();
        $nvdApiKey = '60e97e39-4ac5-4db8-a9ae-b366514925dd';

        // Map common libraries to correct search terms
        $libraryMapping = [
            'jquery' => 'jQuery',
            'bootstrap' => 'Bootstrap',
            'vue' => 'Vue.js',
            'react' => 'React',
        ];
        
        $searchTerm = $libraryMapping[$library] ?? $library;

        $url = "https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch={$searchTerm}";
        
        if (!empty($nvdApiKey)) {
            $url .= "&apiKey={$nvdApiKey}";
        }

        try {
            $response = $client->get($url);
            $data = json_decode($response->getBody()->getContents(), true);

            $vulnerabilities = [];

            if (!empty($data['vulnerabilities'])) {
                foreach ($data['vulnerabilities'] as $vuln) {
                    $cve = $vuln['cve']['id'] ?? 'Unknown';
                    $desc = $vuln['cve']['descriptions'][0]['value'] ?? 'No description available';

                    // Check if the vulnerability affects this version
                    if (isset($vuln['cve']['vulnerableSoftware']) && is_array($vuln['cve']['vulnerableSoftware'])) {
                        foreach ($vuln['cve']['vulnerableSoftware'] as $software) {
                            if (strpos($software, $version) !== false) {
                                $vulnerabilities[] = [
                                    'cve_id' => $cve,
                                    'description' => $desc,
                                    'version_affected' => $version,
                                ];
                            }
                        }
                    }
                }
            }

            return $vulnerabilities;
        } catch (\Exception $e) {
            return ['error' => 'Failed to fetch vulnerability data'];
        }
    }
}