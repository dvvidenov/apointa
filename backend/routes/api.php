<?php

use App\Http\Controllers\Api\AppointmentsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use \Illuminate\Http\Middleware\HandleCors;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\ServicesController;
use App\Http\Controllers\Api\EmployeesController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});


Route::group([
    'namespace' => 'App\Http\Controllers\Api',

], function () {
    Route::apiResource('businesses', BusinessController::class);
    Route::apiResource('services', ServicesController::class)->middleware('auth:sanctum');
    Route::apiResource('employees', EmployeesController::class)->middleware('auth:sanctum');
    Route::apiResource('categories', CategoriesController::class);
    Route::apiResource('appointments', AppointmentsController::class)->middleware('auth:sanctum');
    Route::apiResource('user', UserController::class)->middleware('auth:sanctum');



    // Route::apiResource('invoices', InvoiceController::class);

    // Route::post('invoices/bulk', ['uses' => 'InvoiceController@bulkStore']);
});
