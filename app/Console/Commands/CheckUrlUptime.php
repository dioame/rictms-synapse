<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Models\UptimeCheck;
use App\Models\Application;
use App\Models\Setting;

class CheckUrlUptime extends Command
{
    protected $signature = 'monitor:uptime';
    protected $description = 'Check the uptime of a specified URL';

    public function handle()
    {
        // $url = $this->argument('url');
        $urls = Application::whereNotNull('url')
        ->orderBy('created_at','DESC')
        ->pluck('url')
        ->toArray();
        
        foreach ($urls as $url) {
            $client = new Client();
            $statusCode = null;
        
            try {
                $response = $client->get($url, ['timeout' => Setting::UPTIME_HTTP_TIMEOUTS()]); // Set timeout to 10 seconds
                $statusCode = $response->getStatusCode();
        
                if ($statusCode === 200) {
                    $this->info("URL is up: {$url}");
                    Log::info("URL is up: {$url}");
                } else {
                    $this->warn("URL is down (Status Code: {$statusCode}): {$url}");
                    Log::warning("URL is down (Status Code: {$statusCode}): {$url}");
                }
            } catch (\Exception $e) {
                $this->error("Failed to check URL: {$url}");
                Log::error("Failed to check URL: {$url} - {$e->getMessage()}");
            }
        
            UptimeCheck::updateOrCreate(
                ['url' => $url], // Search for an existing record with this URL
                [
                    'status_code' => $statusCode ?? null,
                    'is_up' => $statusCode === 200,
                ]
            );
        }
        
    }
}
