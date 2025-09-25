<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|integer',
        ]);

        // Create a new user
        $user = \App\Models\User::create([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'role' => $validatedData['role'],
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    // Login an existing user
   public function login(Request $request)
   {
       // Validate the request data
       $credentials = $request->validate([
           'email' => 'required|string|email',
           'password' => 'required|string',
       ]);

       // Attempt to authenticate the user
       if (!\Auth::attempt($credentials)) {
           return response()->json(['message' => 'Invalid credentials'], 401);
       }

       // Generate a token for the authenticated user
       $user = \Auth::user();
       $token = $user->createToken('auth_token')->plainTextToken;

       return response()->json(['message' => 'Login successful', 'access_token' => $token, 'token_type' => 'Bearer']);
   }
}
