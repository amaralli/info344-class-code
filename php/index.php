<!--exclamation point + tab = get the base of HTML
//emmet cheat sheet. Check it out. Not built in, have to get the sublime package unless on lab
computers-->
<?php
//this is a universal variable to access the server
$url = parse_url($_SERVER['REQUEST_URI']);
//this will take whatever is in the URL and echo it. If I put localhost:9000/Gorgeous
//it will say Hello Gorgeous!
$name = substr($url['path'], 1);
if(strlen($name) == 0) {
    $name = 'World';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <!-- the question mark implies an echo statement-->
    <!-- always html encode your work, to protect from scripting attacks -->
    <h1>Hello <?= htmlentities($name) ?>!</h1>
</body>
</html>