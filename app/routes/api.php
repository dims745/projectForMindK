<?php

use Illuminate\Http\Request;

Route::post('/login', 'Auth\LoginController@checkLogin');

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');

Route::post('/loginBySN', 'Auth\LoginController@loginWithSN');

//

Route::get('/categories', 'CategoryController@getCategories');

// Route::post('/categories', 'CategoryController@addCategory');

//

Route::get('/products/popular', 'productController@showMostPopularProducts');

Route::get('/products', 'productController@getProduct');

// Route::post('/products', 'productController@addProduct');

//

Route::post('/order', 'OrderController@addOrder');
