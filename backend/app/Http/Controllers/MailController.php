<?php

namespace App\Http\Controllers;

use App\Mail\MailFunction;
use App\Mail\UserNotificationMail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendMail()
    {
        $details = [
            'name' => 'John Doe',
            'message' => 'This is a styled email using Markdown templates in Laravel.',
            'url' => url('/dashboard')
        ];

        Mail::to('damianvandernat@gmail.com')->send(new MailFunction($details));

        return "Mail sent successfully!";
    }


    public function sendResetMail($user)
    {
        // Generate a token (normally you’d store it in DB)
        $token = Str::random(60);

        $resetUrl = url('/reset-password?token=' . $token . '&email=' . urlencode($user->email));

        // Dynamic recipient
        Mail::to($user->email)->send(new ResetPasswordMail($resetUrl));

        return "Password reset email sent to " . $user->email;
    }

}
