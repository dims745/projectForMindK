<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$this->call(UsersTableSeeder::class);
//        DB::table('products')->insert([
//            'name' => str_random(10),
//            'description' => str_random(20),
//            'price' => random_int(1, 100),
//            'count' => random_int(1, 100),
//            'manufacturer' => str_random(8),
//            'categoryId' => random_int(1, 100),
//            'image' => str_random(12)
//        ]);

        DB::table('orderItems')->insert([
            'orderId' => random_int(1, 100),
            'count' => random_int(1, 10),
            'productId' => random_int(1, 19)
        ]);
    }
}
