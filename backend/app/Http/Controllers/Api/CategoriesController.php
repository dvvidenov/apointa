<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CategoriesResource;
use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoriesResource::collection(Categories::all());
    }

    /**
     * Show the form for store a new resource.
     */
    public function store(Request $request)
    {
        $attrs = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);


        Categories::create($attrs);
        return response()->json("Category added");
    }


    /**
     * Display the specified resource.
     */
    public function show(Categories $categorie)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categories $categories)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $categorie)
    {
        
    }
}
