<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class productController extends Controller
{
    public function showMostPopularProducts() {
        $product = Product::all();
        return response()->json($product)->header('Access-Control-Allow-Origin','*');
    }
    public function addProduct(Request $req) {
        $product = new Product();
        $product->name = $req->input('name');
        $product->prise = $req->input('prise');
        $product->count = $req->input('count');
        $product->description = $req->input('description');
        $product->producerId = $req->input('producerId');
        $product->save();
    }
}
