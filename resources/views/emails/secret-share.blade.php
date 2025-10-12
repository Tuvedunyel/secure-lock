<!doctype html>
<html>
<head>
    <title>Your secret : {{ $data['title'] }}</title>
</head>
<body>
<h1>Hello {{$data['name']}}</h1>
<div>{{$data['message']}}</div>
<p>You can see it by clicking <a href="{{ $data['link'] }}">here</a></p>
<strong>The secret will be definitely lost once it's open.</strong>
</body>
</html>
