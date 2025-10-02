<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => ['required','string', 'max:255', 'unique:users,username'],
            'email'    => ['required','string','email','max:255','unique:users,email'],
            'password' => ['required','string','min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        // Create a new user
        try{
            $user = User::create([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
        }
        catch(\Exception $e){
            return response()->json(['message' => 'Registration failed', 'error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    // Login an existing user
   public function login(Request $request)
   {
       // Validate the request data
       $validator = Validator::make($request->all(), [
           'email' => ['required','string','email'],
           'password' => ['required','string'],
       ]);

       if ($validator->fails()) {
           return response()->json(['errors' => $validator->errors()], 422);
       }

       $credentials = $validator->validated();

       // Attempt to authenticate the user
       if (!Auth::attempt($credentials)) {
           return response()->json(['message' => 'Invalid credentials'], 401);
       }

       // Generate a token for the authenticated user
       $user  = Auth::user();
       $token = $user->createToken('auth_token')->plainTextToken;

       return response()->json(['message' => 'Login successful', 'access_token' => $token, 'token_type' => 'Bearer']);
   }

   // Reset user password
   public function resetPassword(Request $request)
   {
        // Validate the request data      
        $validator = Validator::make($request->all(), [
            'email' => ['required','string','email'],
            'password' => ['required','string','min:8','confirmed'],
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();    
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's password
        $user->password = bcrypt($validatedData['password']);
        $user->save();

        return response()->json(['message' => 'Password reset successful']);
   }
   
}
