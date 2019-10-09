<?php

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

Route::post('/signIn', 'Auth\RegisterController@processingUserData');

Route::post('/verify', 'Auth\LoginController@verifyToken');

