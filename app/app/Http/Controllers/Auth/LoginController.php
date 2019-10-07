<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function checkLogin(Request $req)
    {
        $name = $req->input('login');
        $pass = $req->input('pass');
        $user = User::where('email', $name)->where('password', $pass)->first();
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
            'token' => $token,
            'login' => $name,
            'password' => $pass,
            'user' => $user
        ]);
    }

    public function processingUserData(Request $req){

        return response()->json([
            'success' => true,
            'token' => 'tokenCoding',
            'data' => $req->all()
        ]);
    }

    public function verifyEmail() {
        return response()->json([
            'success' => true
        ]);
    }
    /*public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }*/
    public function verifyToken ($token) {
        $splitToken = explode($token, '.');
        $checking = $this->buildSignature($splitToken[0], $splitToken[1]);
        return !!($checking == $splitToken[2]);
    }
    public function makeToken($email, $id) {
        $headers = ['alg'=>'HS256','typ'=>'JWT'];
        $headers_encoded = $this->base64url_encode(json_encode($headers));

        $payload = ['email'=>$email, 'id'=>$id];
        $payload_encoded = $this->base64url_encode(json_encode($payload));

        $signature_encoded = $this->base64url_encode($this->buildSignature($headers_encoded,$payload_encoded));

        $token = "$headers_encoded.$payload_encoded.$signature_encoded";
        return $token;
    }
    public function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    public function buildSignature($header, $payload) {
        $key = 'secret';
        $signature = hash_hmac('SHA256',"$header.$payload",$key,true);
    }
}
