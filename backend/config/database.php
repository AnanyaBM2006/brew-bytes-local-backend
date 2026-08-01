<?php

$host = getenv("mysql.railway.internal");
$dbname = getenv("railway");
$username = getenv("root");
$password = getenv("gIpURrUhQpxFkELeeuyHNwiYaHzxveYZ");
$port = getenv("3306");

try {

    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}
catch (PDOException $e) {

    die("Database Connection Failed: " . $e->getMessage());

}

?>