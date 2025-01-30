<?php
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SqaTestCase;
use App\Models\Application;
use Illuminate\Support\Str;

class SqaTestCaseSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all applications
        $applications = Application::all();

        foreach ($applications as $application) {
            // Generate a random number of test cases (10-20) for each application
            $testCaseCount = rand(10, 20);

            for ($i = 0; $i < $testCaseCount; $i++) {
                $testProcedureSteps = collect([
                    'Open the application',
                    'Navigate to the module',
                    'Perform an action',
                    'Enter input data',
                    'Submit the form',
                    'Verify the response',
                ])->random(rand(3, 6))->values()->toArray();

                $expectedResults = collect([
                    'Application should respond',
                    'User sees expected outcome',
                    'No errors encountered',
                    'Data is saved correctly',
                    'System provides feedback',
                    'Changes are reflected in UI',
                    'Logs are updated accordingly',
                ])->random(rand(3, 6))->values()->toArray();

                SqaTestCase::create([
                    'id' => Str::uuid(),
                    'application_id' => $application->id,
                    'module' => 'Module ' . ($i + 1),
                    'test_procedure' => json_encode($testProcedureSteps),
                    'expected_result' => json_encode($expectedResults),
                    'test_status' => collect(['Pending', 'Passed', 'Failed'])->random(),
                    'remarks' => fake()->sentence(),
                ]);
            }
        }
    }
}