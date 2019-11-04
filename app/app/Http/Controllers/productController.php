<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class productController extends Controller
{

    public function showMostPopularProducts() {
        $products = [];
        $i = 0;
        $productIds = OrderItem::select('productId')
            ->groupBy('productId')
            ->orderBy(DB::raw(' sum(count) '),'desc')
            ->take(10)
            ->get();
        foreach ($productIds as $productId) {
            $products[$i] = Product::where('id', $productId->productId)
                ->first();
            $i++;
        }
        return $products;
    }

    public function addProduct(Request $req) {
        $product = new Product();
        $product->fill($req->input());
        $product->save();
    }

    public function getProduct(Request $req) {
        if($req->input('searchKey')) {
            return Product::where(
                'name',
                'ilike',
                '%'.$req->input('searchKey').'%'
            )->paginate(20);
        }
        if($req->input('category')) {
            return Product::where(
                'categoryId',
                $req->input('category')
            )->paginate(20);
        }
        if($req->input('items')) {
            return Product::whereIn(
                'id',
                explode(',', $req->input('items'))
            )->get();
        }
        return Product::paginate(20);
    }
}
