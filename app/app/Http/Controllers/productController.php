<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Category;

class productController extends Controller
{

    public function showMostPopularProducts() {
        $product = Product::all();
        return response()->json($product);
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
