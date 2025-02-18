<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class VirusTotalService
{
    protected $apiKey;
    protected $client;

    public function __construct()
    {
        // Use your VirusTotal API key here
        $this->apiKey = env('VIRUSTOTAL_API_KEY');
        $this->client = new Client();
    }

    /**
     * Check a file or URL with VirusTotal
     * @param string $url
     * @return mixed
     */
    public function check($url)
    {

        $encodedUrl = rtrim(strtr(base64_encode($url), '+/', '-_'), '=');

        // Create a new Guzzle client instance
        $client = new Client();

        // Send GET request to VirusTotal API
        try {
            $response = $client->request('GET', 'https://www.virustotal.com/api/v3/urls/' . $encodedUrl, [
                'headers' => [
                    'accept' => 'application/json',
                    'x-apikey' => $this->apiKey,
                ],
            ]);

            // Handle the response (this could be improved based on the API response structure)
            $data = json_decode($response->getBody()->getContents(), true);
            return $data;
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            // Handle any request exceptions (e.g., API errors)
            return ['error' => $e->getMessage()];
        }
    }
}
