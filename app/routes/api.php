<?php

use Illuminate\Http\Request;

Route::post('/login', 'Auth\LoginController@checkLogin');

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');



Route::get('/categories', 'productController@getCategories');

Route::post('/categories', 'productController@addCategory');



Route::get('/products/popular', 'productController@showMostPopularProducts');

Route::post('/products', 'productController@addProduct');

Route::get('/products', 'productController@getAllProduct');

Route::get('/products/category', 'productController@getProductOfCategory');



// TEMP

Route::post('/orderItem/add', 'productController@addOrderItem');

Route::post('/orderItem/show', 'productController@showOrderItems');
