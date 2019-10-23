<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\User;
use App\AuthHelper;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = '/home';

    public function checkLogin(Request $req)
    {
        $name = $req->input('email');
        $pass = $req->input('pass');
        $user = User::where('email', $name)
            ->where('password', $pass)
            ->first();
        if($user) {

            $success = true;
            $token = AuthHelper::makeToken($user->email, $user->id, $user->name);
            return [
                'success' => $success,
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'token' => $token
            ];
        }
        else {
            $success = false;
            $token = 'nothing';
            return [
                'success' => $success,
                'token' => $token
            ];
        }

    }

    public function verifyToken (Request $req) {
        $token = $req->input('token');
        return AuthHelper::verifyToken($token);
    }

    public function loginFB(Request $request) {
        return response()->json($request->input('response'));
    }

    public function loginG(Request $request) {
        return response()->json($request->input('response'));
    }
}
