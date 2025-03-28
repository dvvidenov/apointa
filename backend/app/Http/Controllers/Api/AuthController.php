<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBusinessRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Employees;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = Auth::user();
        $token = $request->user()->createToken('API Token')->plainTextToken;
        $business = $user->business;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'business' => $business
        ]);
    }

    public function register(Request $request)
    {
        if (
            $request->has('isBusiness')
            && $request->isBusiness
        ) {
            $userValidator = Validator::make($request->all(), [
                'name' => ['required','string','max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:6', 'confirmed'],
            ]);
            $newBusiness = $request->business;
            $businessRequest = new StoreBusinessRequest();
            $businessValidator = Validator::make($newBusiness, $businessRequest->rules());

            $errors = [];

            if ($userValidator->fails()) {
                $errors['user'] = $userValidator->errors();
            }

            if ($businessValidator->fails()) {
                $errors['business'] = $businessValidator->errors();
            }

            if (!empty($errors)) {
                return response()->json(['errors' => $errors], 422);
            }

            DB::beginTransaction();
            try {


                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => 'owner'
                ]);


                $newBusiness['user_id'] = $user['id'];

                $business = Business::create($businessValidator->validated());


                $user->update(['business_bulstat' => $business['bulstat']]);

                DB::commit();
                return response()->json(['message' => 'Регистрацията е успешна!'], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json(['error' => 'Възникна грешка. Моля, опитайте отново.'], 500);
            }
        } else {
            $request->validate([
                'name' => ['required','string','max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:6', 'confirmed'],
            ]);

            $role = $request->role ?? 'client';

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => $role
            ]);
            if ($role == 'employee') {
                Employees::create([
                    'user_id' => $user['id'],
                    'business_bulstat' => $request->bulstat,
                    'status' => 'working'
                ]);
            }
        }

        if ($role != 'employee') {

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
            $user = Auth::user();
            $token = $request->user()->createToken('API Token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'business' => $business ?? null
            ], 200);
        }
        return response()->json('Employee added', 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
