<!doctype html>
<html>
<head>
    <title>Someone share a secret with you</title>
</head>
<body>
<h1>Hello {{$data['recipient']}}</h1>
<p>Someone share a secret with you. you can see it by clicking <a href="{{ $data['link'] }}">here</a></p>
<strong>The secret will be definitely lost once it's open.</strong>
</body>
</html>
