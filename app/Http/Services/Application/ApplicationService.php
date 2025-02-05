<?php

namespace App\Http\Services\Application;

use App\Models\Application;
use GuzzleHttp\Client;
use App\Models\Setting;
use App\Models\UptimeCheck;

class ApplicationService
{
   public function store($params){
       Application::create($params);
       $this->checkUptime($params['url']);
   }

   public function update($id, $params){
       Application::find($id)->update($params);
       $this->checkUptime($params['url']);
   }

   private function checkUptime($url){
       $client = new Client();
       $statusCode = null;
       try {
            $response = $client->get($url, ['timeout' => Setting::UPTIME_HTTP_TIMEOUTS()]); // Set timeout to 10 seconds
            $statusCode = $response->getStatusCode();
       } catch (\Exception $e) {}

       UptimeCheck::updateOrCreate(
         ['url' => $url],
         [
            'status_code' => $statusCode ?? null,
            'is_up' => $statusCode === 200,
         ]
       );
   }
}