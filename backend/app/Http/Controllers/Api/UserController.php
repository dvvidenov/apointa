<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        Log::info('Update profile:', ['Request' => $request]);
        Log::info('Update profile:', ['User' => $user]);
        $attrs = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['numeric', 'min:10'],
            'email' => ['required', 'string', 'email',  Rule::unique('users')->ignore($user['id'])],
        ]);

        $user->update($attrs);
        Log::info('Update profile:', ['update' => $attrs]);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
