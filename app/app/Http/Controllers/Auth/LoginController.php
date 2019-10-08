<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use function MongoDB\BSON\toJSON;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = '/home';

    public function checkLogin(Request $req)
    {
        $name = $req->input('login');
        $pass = $req->input('pass');
        $user = User::where('email', $name)
            ->where('password', $pass)
            ->first();
        if($user) {
            $success = true;
            $token = $this->makeToken($user->email, $user->id);
        }
        else {
            $success = false;
            $token = 'nothing';
        }
        return response()->json([
            'success' => $success,
            'token' => $token
        ]);
    }

    public static function verifyToken ($token) {

        $splitToken = explode('.', $token);
        if(!(json_decode(base64_decode($splitToken[0])) && json_decode(base64_decode($splitToken[1])))){
            return ["success" => 'false'];
        }
        $checking = LoginController::buildSignature($splitToken[0], $splitToken[1]);
        return [
            "success" => !!(LoginController::base64url_encode($checking) == $splitToken[2]),
            "id" => json_decode(base64_decode($splitToken[1]))->id,
            "email" => json_decode(base64_decode($splitToken[1]))->email
        ];
    }

    public static function makeToken($email, $id) {
        $headers = ['alg'=>'HS256','typ'=>'JWT'];
        $headers_encoded = LoginController::base64url_encode(json_encode($headers));

        $payload = ['email'=>$email, 'id'=>$id];
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
