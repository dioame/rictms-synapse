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
                'version' => $faker->randomElement(['1.0.0', '1.1.0', '2.0.0', '2.1.0', '3.0.0']),
                'frontend_language' => $faker->randomElement(['JavaScript', 'TypeScript', 'Python', 'Ruby']),
                'frontend_framework' => $faker->randomElement(['Vue.js', 'React', 'Angular', 'Svelte']),
                'backend_language' => $faker->randomElement(['PHP', 'Python', 'Java', 'Node.js']),
                'backend_framework' => $faker->randomElement(['Laravel', 'Django', 'Spring', 'Express']),
                'sqa_status' => $faker->randomElement(['pending', 'in_progress', 'passed', 'failed', 'flagged', 'not_applicable']),
                'repository' => $faker->url,
                'is_pia' => $faker->randomElement(['Yes', 'No']),
                'author' => $faker->name,
                'developer' => $faker->name,
                'division' => $faker->word,
                'section' => $faker->word,
                'region' => $faker->state,
                'url' => $faker->url,
                'deployment_date' => $faker->date(),
                'status' => $faker->randomElement(['active', 'inactive']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
