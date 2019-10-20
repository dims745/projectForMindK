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
        $splitToken = explode('.', $token);
        if(!(json_decode(base64_decode($splitToken[0])) && json_decode(base64_decode($splitToken[1])))){
            return response()->json(["success" => 'false']);
        }
        $checking = AuthHelper::buildSignature($splitToken[0], $splitToken[1]);
        return response()->json([
            "success" => !!(AuthHelper::base64url_encode($checking) == $splitToken[2]),
            "id" => json_decode(base64_decode($splitToken[1]))->id,
            "email" => json_decode(base64_decode($splitToken[1]))->email,
            "name" => json_decode(base64_decode($splitToken[1]))->name
        ]);
    }
}
