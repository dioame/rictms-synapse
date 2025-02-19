<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);
        Role::create(['name' => 'server_admin']);
        Role::create(['name' => 'db_admin']);
        Role::create(['name' => 'developers']);
        Role::create(['name' => 'sqa']);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'username' => 'admin',
            'password' => bcrypt('admin')

        ]);
        // assign role user to the users
        // User::factory(50)->create()->each(function ($user) {
        //     $user->assignRole('user');
        //     $faker = \Faker\Factory::create();
        //     $user->username = $faker->username; 
        //     $user->created_at = $faker->dateTimeBetween('-1 year', 'now');
        //     $user->save();
        // });



        $user = User::find(1);
        $user->assignRole('admin');
    }
}
