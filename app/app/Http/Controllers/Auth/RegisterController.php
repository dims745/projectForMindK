<?php

namespace App\Http\Controllers\Auth;

use App\Helper;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;

class RegisterController extends Controller
{

    use RegistersUsers;

    protected $redirectTo = '/home';

    public function processingUserData(Request $req){
        $validator = $this->validator($req->all());
        if($validator->fails()){
           return response()->json([
               'success' => false,
               'message' => $validator->errors()->all()
           ]);
        }
        $user = $this->create($req->all());
        return response()->json([
            'success' => true,
            'token' => Helper::makeToken($user->email, $user->id, $user->name)
        ]);
    }

    public function verifyEmail() {
        return response()->json([
            'success' => true
        ]);
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
    }


    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
    }
}
