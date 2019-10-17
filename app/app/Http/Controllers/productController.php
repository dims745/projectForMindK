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

    public function addOrderItem(Request $req) {
        $order = new OrderItem();
        $order->fill([
            'orderId' => $req->input('orderId'),
            'productId' => $req->input('productId'),
            'count' => $req->input('count')
        ]);
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
        $category->fill([
            'name' => $req->input('name'),
            'description' => $req->input('description')
        ]);
        $category->save();
        $category = Category::all();
        return response()->json($category);
    }

    public function getCategories() {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function addProduct(Request $req) {
        $product = new Product();
        $product->fill([
            'name' => $req->input('name'),
            'price' => $req->input('price'),
            'count' => $req->input('count'),
            'description' => $req->input('description'),
            'manufacturer' => $req->input('manufacturer'),
            'categoryId' => $req->input('categoryId'),
            'image' => $req->input('image')
        ]);
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
