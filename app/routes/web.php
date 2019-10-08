<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', function (Request $req) {
    if($req->input('token'))
        $auth = LoginController::verifyToken($req->input('token'));
    else
        $auth = false;
    return response()->json($auth);
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

Route::get('/verify/{key}', 'Auth\RegisterController@verifyEmail');

