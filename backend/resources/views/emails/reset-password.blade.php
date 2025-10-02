@component('mail::message')
# Password Reset Request

We received a request to reset your password.  
Click the button below to set a new password:

@component('mail::button', ['url' => $resetUrl])
Reset Password
@endcomponent

If you did not request a password reset, you can safely ignore this email.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
