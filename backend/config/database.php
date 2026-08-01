<?php

echo "<pre>";

var_dump(getenv("MYSQLHOST"));
var_dump(getenv("MYSQLDATABASE"));
var_dump(getenv("MYSQLUSER"));
var_dump(getenv("MYSQLPASSWORD"));
var_dump(getenv("MYSQLPORT"));

exit;

try {

    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {

    die("Database Connection Failed: " . $e->getMessage());

}

?>