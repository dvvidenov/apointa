<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected function corsResponse($data, $status = 200)
{
    return response()->json($data, $status)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

}
