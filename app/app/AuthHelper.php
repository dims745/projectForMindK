<?php

namespace App;

class AuthHelper
{
    public static function makeToken($email, $id, $name) {
        $headers = ['alg'=>'HS256','typ'=>'JWT'];
        $headers_encoded = AuthHelper::base64url_encode(json_encode($headers));

        $payload = ['email'=>$email, 'id'=>$id, 'name'=>$name];
        $payload_encoded = AuthHelper::base64url_encode(json_encode($payload));

        $signature_encoded = AuthHelper::base64url_encode(
            AuthHelper::buildSignature($headers_encoded,$payload_encoded)
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