<?php

use Illuminate\Http\Request;

Route::post('/login', 'Auth\LoginController@checkLogin');

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');



Route::get('/categories', 'productController@getCategories');

Route::post('/categories', 'productController@addCategory');



Route::get('/products', 'productController@getAllProduct');

Route::post('/products', 'productController@addProduct');

Route::get('/products/popular', 'productController@showMostPopularProducts');

Route::get('/products/category/{category}', 'productController@getProductOfCategory');



Route::get('/resources/{resources}', 'Controller@getRes');

// TEMP

Route::post('/orderItem', 'productController@addOrderItem');

Route::get('/orderItem', 'productController@showOrderItems');
