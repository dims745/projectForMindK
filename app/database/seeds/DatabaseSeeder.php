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
        for($i=0;$i<7;$i++){
            DB::table('categories')->insert([
                'name' => str_random(10),
                'description' => str_random(50),
            ]);
        }
        for($i=0;$i<200;$i++)
        DB::table('products')->insert([
            'name' => str_random(10),
            'description' => str_random(30),
            'price' => random_int(1, 100),
            'count' => random_int(1, 100),
            'manufacturer' => str_random(8),
            'categoryId' => random_int(1, 7),
        ]);
        for($i=0;$i<3000;$i++)
        DB::table('orderItems')->insert([
            'orderId' => random_int(1, 100),
            'count' => random_int(1, 10),
            'productId' => random_int(1, 200)
        ]);
    }
}
