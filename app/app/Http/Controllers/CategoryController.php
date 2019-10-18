<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function addCategory(Request $req) {
        $category = new Category();
        $category->fill($req->input());
        $category->save();
    }

    public function getCategories() {
        $categories = Category::all();
        return response()->json($categories);
    }
}
