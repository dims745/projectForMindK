<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('/', function () {
    return response()->json([
        'message' => 'nothing'
    ]);
});

Route::get('/login', function () {
    return response()->json([
        'message' => 'nothing'
    ]);
});

Route::post('/login', 'Auth\LoginController@checkLogin');

Route::get('/signIn', function() {
    return response()->json([
        'message' => 'nothing'
    ]);
});

Route::post('/categories', 'productController@getCategories');

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');

Route::post('/products/popular', 'productController@showMostPopularProducts');

Route::post('/products/add', 'productController@addProduct');
