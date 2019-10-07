<?php

Route::get('/', function () {
    return view('welcome');
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

Route::post('/signIn', 'Auth\LoginController@processingUserData');

Route::get('/verify/{key}', 'Auth\LoginController@verifyEmail');
//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
