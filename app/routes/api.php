<?php

use Illuminate\Http\Request;

Route::post('/login', 'Auth\LoginController@checkLogin');

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');



Route::get('/categories', 'CategoryController@getCategories');

Route::post('/categories', 'CategoryController@addCategory');



Route::get('/products', 'productController@getAllProduct');

Route::post('/products', 'productController@addProduct');

Route::get('/products/popular', 'productController@showMostPopularProducts');

Route::get('/products/category/{category}', 'productController@getProductOfCategory');



Route::get('/resources/{resources}', 'Controller@getRes');

// TEMP

Route::post('/orderItem', 'OrderController@addOrderItem');

Route::get('/orderItem', 'OrderController@showOrderItems');
