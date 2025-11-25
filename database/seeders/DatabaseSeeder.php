<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Staff, Customer, Supplier, Product};
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Staff Members
        Staff::create([
            'name' => 'John Manager',
            'role' => 'manager',
            'email' => 'manager@trackandtrade.com',
            'password' => Hash::make('password123'),
        ]);

        Staff::create([
            'name' => 'Jane Staff',
            'role' => 'sales',
            'email' => 'sales@trackandtrade.com',
            'password' => Hash::make('password123'),
        ]);

        Staff::create([
            'name' => 'Bob Inventory',
            'role' => 'inventory',
            'email' => 'inventory@trackandtrade.com',
            'password' => Hash::make('password123'),
        ]);

        $this->command->info('Database seeded successfully!');
    }
}