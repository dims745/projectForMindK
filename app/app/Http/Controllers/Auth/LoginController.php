<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;

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
            $token = LoginController::makeToken($user->email, $user->id, $user->name);
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
        $checking = LoginController::buildSignature($splitToken[0], $splitToken[1]);
        return response()->json([
            "success" => !!(LoginController::base64url_encode($checking) == $splitToken[2]),
            "id" => json_decode(base64_decode($splitToken[1]))->id,
            "email" => json_decode(base64_decode($splitToken[1]))->email,
            "name" => json_decode(base64_decode($splitToken[1]))->name
        ]);
    }

    public static function makeToken($email, $id, $name) {
        $headers = ['alg'=>'HS256','typ'=>'JWT'];
        $headers_encoded = LoginController::base64url_encode(json_encode($headers));

        $payload = ['email'=>$email, 'id'=>$id, 'name'=>$name];
        $payload_encoded = LoginController::base64url_encode(json_encode($payload));

        $signature_encoded = LoginController::base64url_encode(
            LoginController::buildSignature($headers_encoded,$payload_encoded)
        );

        $token = "$headers_encoded.$payload_encoded.$signature_encoded";
        return $token;
    }

    public static function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    public static function buildSignature($header, $payload) {
        $key = 'secret';
        $signature = hash_hmac('SHA256',"$header.$payload",$key,true);
        return $signature;
    }
}
