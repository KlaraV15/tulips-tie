<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>User Notification</title>
</head>
<body>
    <h2>Hello {{ $data['name'] }}</h2>
    <p>{{ $data['message'] }}</p>

    <p>Regards,<br>{{ config('app.name') }}</p>
</body>
</html>
