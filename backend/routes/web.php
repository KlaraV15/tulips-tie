<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return view('welcome');

});
Route::get('/send-mail', [App\Http\Controllers\MailController::class, 'sendMail']);

Route::get('/test-reset/{email}', function ($email) {
    $user = \App\Models\User::where('email', $email)->firstOrFail();
    return app()->call('App\Http\Controllers\MailController@sendResetMail', ['user' => $user]);
});

