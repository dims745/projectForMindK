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

    public function loginWithSN(Request $request) {
        $data = $request->input('response');
        if($request->input('isGoogle'))

        $url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
            .$data['tokenId'];

        else $url = "https://graph.facebook.com/v2.3/me?access_token="
            .$data['accessToken']
            .'&fields=name%2Cemail&locale=en_US&method=get&pretty=0&sdk=joey&suppress_http_code=1';

        $json = json_decode(file_get_contents($url), true);
        return $this->socialAuth($json);
    }

    public function socialAuth ($json) {
        if(!$json['email']) {$success = false;
            $token = 'nothing';
            return [
                'success' => $success,
                'token' => $token
            ];}

        $user = User::where('email', $json['email'])->first();

        if(!$user) {
            $user = User::create([
                'name' => $json['name'],
                'email' => $json['email'],
                'password' => "signUpWithSocialNetworkRandomKey:".str_random()
            ]);
            return [
                'success' => true,
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'token' => AuthHelper::makeToken($user->email, $user->id, $user->name)
            ];}

        return [
            'success' => true,
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'token' => AuthHelper::makeToken($user->email, $user->id, $user->name)
        ];
    }
}
