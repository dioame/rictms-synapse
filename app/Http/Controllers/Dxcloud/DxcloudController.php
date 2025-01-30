<?php

namespace App\Http\Controllers\Dxcloud;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class DxcloudController extends Controller
{
    public function index()
    {   
        $dxcloud_url = env('DXCLOUD_URL', 'Not Found');
        $dxcloud_username = env('DXCLOUD_USERNAME');
        $dxcloud_password = env('DXCLOUD_PASSWORD');

        if ($dxcloud_url === 'Not Found') {
            return Inertia::render('Dxcloud/Index', [
                'message' => 'DXCLOUD URL not found',
            ]);
        }

        $data = [
            'email' => $dxcloud_username,
            'password' => $dxcloud_password,
        ];

        $response = Http::withHeaders([
            'accept' => '*/*',
            'Content-Type' => 'application/json',
            'X-CSRF-TOKEN' => csrf_token(),
        ])->post($dxcloud_url . '/api/auth/login', $data);

    
        if (!$response->successful()) {
            return Inertia::render('Dxcloud/Index', [
                'message' => 'Failed to authenticate with DXCLOUD',
            ]);
        }

        $token = $response->json()['data']['access_token'];
        $psgc_response = Http::withHeaders([
            'accept' => '*/*',
            'Authorization' => 'Bearer ' . $token,
        ])->get($dxcloud_url . '/api/psgc/regions');
        
        $regions = [];
        if ($psgc_response->successful()) {
            $regions = $psgc_response->json()['data'];
        }

        return Inertia::render('Dxcloud/Index', [
            'dxcloud_url' => $dxcloud_url,
            'regions' => $regions
        ]);   
    }


    public function download(Request $request)
    {   
        $dxcloud_url = env('DXCLOUD_URL', 'Not Found');
        $dxcloud_username = env('DXCLOUD_USERNAME');
        $dxcloud_password = env('DXCLOUD_PASSWORD');

        if ($dxcloud_url === 'Not Found') {
            return Inertia::render('Dxcloud/Index', [
                'message' => 'DXCLOUD URL not found',
            ]);
        }

        $data = [
            'email' => $dxcloud_username,
            'password' => $dxcloud_password,
        ];

        $response = Http::withHeaders([
            'accept' => '*/*',
            'Content-Type' => 'application/json',
            'X-CSRF-TOKEN' => csrf_token(),
        ])->post($dxcloud_url . '/api/auth/login', $data);

        if (!$response->successful()) {
            return Inertia::render('Dxcloud/Index', [
                'message' => 'Failed to authenticate with DXCLOUD',
            ]);
        }

        $token = $response->json()['data']['access_token'];

        $result = [];

        $result[] = [
            'region_code' => $request->region_code,
            'province' => []
        ];

        $province_details_response = Http::withHeaders([
            'accept' => '*/*',
            'Authorization' => 'Bearer ' . $token,
        ])->get($dxcloud_url . '/api/psgc/provincesByRegion', [
            'region' => $request->region_code
        ]);

        if ($province_details_response->successful()) {
            $provinces = $province_details_response->json()['data']['provinces'];

            foreach ($provinces as $province) {
                $provinceData = [
                    ...$province,
                    'munis' => []
                ];

                $munis_details_response = Http::withHeaders([
                    'accept' => '*/*',
                    'Authorization' => 'Bearer ' . $token,
                ])->get($dxcloud_url . '/api/psgc/municipalityByProvince', [
                    'province' => $province['code']
                ]);

                if ($munis_details_response->successful()) {
                    $munis = $munis_details_response->json()['data']['municipalities'];
                    
                    foreach ($munis as $muni) {
                        $muniData = [
                            ...$muni,
                            'brgy' => []
                        ];
                        
                        $brgy_details_response = Http::withHeaders([
                            'accept' => '*/*',
                            'Authorization' => 'Bearer ' . $token,
                        ])->get($dxcloud_url . '/api/psgc/barangayByMunicipality', [
                            'municipality' => $muni['code']
                        ]);

                        if ($brgy_details_response->successful()) {
                            $muniData['brgy'] = $brgy_details_response->json()['data']['barangay'];
                        }

                        $provinceData['munis'][] = $muniData;
                    }
                }
                
                $result[0]['province'][] = $provinceData;
            }
        }

        return Response::json($result)
            ->header('Content-Type', 'application/json')
            ->header('Content-Disposition', 'attachment; filename="dxcloud_data.json"');
    }
}