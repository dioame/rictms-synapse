<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class ApplicationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Create 100 entries
        foreach (range(1, 100) as $index) {
            DB::table('applications')->insert([
                'id' => Str::uuid()->toString(),
                'name' => $faker->company,
                'description' => $faker->sentence,
                'tech_stack' => $faker->randomElement([
                    'LAMP (Linux, Apache, MySQL, PHP)',
                    'MEAN (MongoDB, Express.js, Angular, Node.js)',
                    'MERN (MongoDB, Express.js, React, Node.js)',
                    'JAMstack (JavaScript, APIs, Markup)',
                    'TALL (Tailwind CSS, Alpine.js, Laravel, Livewire)',
                    'Django Stack (Python, Django, PostgreSQL)',
                    'Spring Boot Stack (Java, Spring Boot, MySQL)',
                    'Ruby on Rails Stack (Ruby, Rails, PostgreSQL)',
                    'ASP.NET Stack (C#, .NET, SQL Server)',
                    'Flask Stack (Python, Flask, SQLite)',
                    'Nuxt Stack (Vue.js, Nuxt.js, Node.js, PostgreSQL)',
                    'Quasar Stack (Vue.js, Quasar, Firebase)',
                    'Phoenix Stack (Elixir, Phoenix, PostgreSQL)',
                ]),
                'version' => $faker->randomElement(['1.0.0', '1.1.0', '2.0.0', '2.1.0', '3.0.0']),
                'repository' => $faker->url,
                'is_pia' => $faker->randomElement(['Yes', 'No']),
                'is_km' => $faker->randomElement(['Yes', 'No']),
                'author' => $faker->name,
                'developer' => $faker->name,
                'division' => $faker->randomElement(['PPD', 'PSD', 'HRMDD', '4PS', 'DRMD']),
                'section' => $faker->word,
                'region' => $faker->state,
                'url' => $faker->url,
                'deployment_date' => $faker->date(),
                'status' => $faker->randomElement(['active', 'inactive']),
                'request_status' => $faker->randomElement(['pending', 'approved', 'cancelled']),
                'accessibility' => $faker->randomElement(['Public', 'Private']),
                'development_strategy' => $faker->randomElement(['In-house', 'Outsourced']),
                'platform' => $faker->randomElement(['Web', 'Mobile', 'Desktop']),
                'computing_scheme' => $faker->randomElement(['On-premise', 'Cloud']),
                'internal_users' => $faker->randomElement(['IT Staff', 'Admin', 'Managers']),
                'no_of_internal_users' => $faker->randomElement(['100-500', '500-2000', '2000+']),
                'external_users' => $faker->randomElement(['General Public', 'Clients', 'Partners']),
                'no_of_external_users' => $faker->randomElement(['N/A', '1000+', '5000+']),
                'system_owner' => $faker->company,
                'location_of_deployment' => $faker->randomElement(['CO', 'FO', 'Regional Office']),
                'hostname_of_database' => $faker->domainName,
                'database_ip_address' => $faker->ipv4,
                'description_general_contents' => $faker->text,
                'information_systems_served' => $faker->sentence,
                'data_archiving' => $faker->randomElement(['Enabled', 'Disabled']),
                'sqa_tested' => $faker->randomElement(['Yes', 'No']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
