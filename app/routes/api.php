<?php

use Illuminate\Http\Request;

Route::post('/login', 'Auth\LoginController@checkLogin');

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');

Route::post('/categories', 'productController@getCategories');

Route::post('/products/popular', 'productController@showMostPopularProducts');

Route::post('/products/add', 'productController@addProduct');

Route::post('/orderItem/add', 'productController@addOrderItem');

Route::post('/orderItem/show', 'productController@showOrderItems');
