<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function addOrderItem(Request $req) {
        $order = new OrderItem();
        $order->fill($req->input());
        $order->save();
    }

    public function showOrderItems() {
        $orders = OrderItem::all();
        return response()->json($orders);
    }
}
