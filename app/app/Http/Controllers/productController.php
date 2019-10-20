<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
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

    public function getProductOfCategory($category ,Request $req) {
        $categoryId = Category::where('name', $category)->first()->id;
        $products = Product::where('categoryId', $categoryId)->get();
        return response()->json($products);
    }

    public function getAllProduct() {
        $products = Product::all();
        return response()->json($products);
    }
}
