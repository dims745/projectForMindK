<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Category;
use App\Order;
use App\OrderItem;
use Illuminate\Support\Facades\DB;

class productController extends Controller
{

    public function showMostPopularProducts() {
        $products = [];
        $i = 1;
        $productIds = OrderItem::select('productId', DB::raw('sum(count)'))
            ->groupBy('productId')
            ->orderBy(DB::raw(' sum(count) '),'desc')
            ->take(10)
            ->get();
        foreach ($productIds as $productId) {
            $products[$i] = Product::where('id', $productId->productId)
                ->first();
            $i++;
        }
        return response()->json($products);
    }

    public function addOrderItem(Request $req) {
        $order = new OrderItem();
        $order->orderId = $req->input('orderId');
        $order->productId = $req->input('productId');
        $order->count = $req->input('count');
        $order->save();
        $order = OrderItem::all();
        return response()->json($order);
    }

    public function showOrderItems() {
        $orders = OrderItem::all();
        return response()->json($orders);
    }

    public function addCategory(Request $req) {
        $category = new Category();
        $category->name = $req->input('name');
        $category->description = $req->input('description');
        $category->save();
    }

    public function getCategories() {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function addProduct(Request $req) {
        $product = new Product();
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product->count = $req->input('count');
        $product->description = $req->input('description');
        $product->manufacturer = $req->input('manufacturer');
        $product->categoryId = $req->input('categoryId');
        $product->save();
    }

    public function getProductOfCategory(Request $req) {
        $category = $req->input('category');
        $products = Product::where('categoryId', $category)->get();
        return response()->json($products);
    }
}
