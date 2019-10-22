<?php

namespace App\Http\Controllers;

use App\AuthHelper;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function addOrder(Request $req) {
        $token = $req->input('token');
        $s = AuthHelper::verifyToken($token);
        if(gettype($s)!='array')return response()->json('error of autorization');
        if(!$s['success'])return response()->json('error of autorization');
        $order = new Order();
        $order->fill([
            "userId" => $s['id'],
            "address" => $req->input('address')
        ]);
        $order->save();
        $bucket = $req->input('bucket');
        $t = [];$i = 0;
        foreach ($bucket as $key => $value) {
            $t[$i] = new OrderItem();
            $t[$i]->fill([
                "orderId" => $order->id,
                "productId" => $key,
                "count" => $value
            ]);
            $t[$i]->save();
            $i++;
        }
        return response()->json('success');
    }
}
