<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ActualApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Load the JSON file
        $jsonPath = database_path('seeders/json/focrg_ict_inventory.json');
        if (!File::exists($jsonPath)) {
            $this->command->error("JSON file not found: {$jsonPath}");
            return;
        }

        $jsonData = File::get($jsonPath);
        $applications = json_decode($jsonData, true);

        if (!$applications) {
            $this->command->error("Invalid JSON format.");
            return;
        }
        foreach ($applications as $app) {
            DB::table('applications')->insert([
                'id' => Str::uuid()->toString(),
                'name' => $app['name'] ?? null,
                'abbr' => strtoupper(Str::limit(preg_replace('/\b(\w)/', '$1', $app['name'] ), 3, '')),
                'description' => $app['description'] ?? null,
                'tech_stack' => $app['tech_stack'] ?? null,
                'version' => $app['version'] ?? null,
                'url' => $app['url'] ?? null,
                'deployment_date' => isset($app['deployment_date']) ? date('Y-m-d', strtotime($app['deployment_date'])) : null,
                'status' => $app['STATUS'] ?? null,
                'accessibility' => $app['accessibility'] ?? null,
                'development_strategy' => $app['development_strategy'] ?? null,
                'platform' => $app['platform'] ?? null,
                'computing_scheme' => $app['computing_scheme'] ?? null,
                'no_of_internal_users' => $app['no_of_internal_users'] ?? null,
                'internal_users' => $app['internal_users'] ?? null,
                'no_of_external_users' => $app['no_of_external_users'] ?? null,
                'external_users' => $app['external_users'] ?? null,
                'system_owner' => $app['system_owner'] ?? null,
                'location_of_deployment' => $app['location_of_deployment'] ?? null,
                'hostname_of_database' => $app['hostname_of_database'] ?? null,
                'database_ip_address' => $app['database_ip_address'] ?? null,
                'description_general_contents' => $app['description_general_contents'] ?? null,
                'information_systems_served' => $app['information_system_served'] ?? null,
                'data_archiving' => $app['data_archiving'] ?? null,
                'sqa_tested' => $app['sqa_tested'] ?? null,
                'encoded_by' => 1,
                'request_status' => 'approved',
                'division' => $app['division'] ?? null,
                'region' => "CARAGA",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
