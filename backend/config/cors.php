<?php

$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://10.122.41.31:5173",
    "http://10.122.41.31:5174",

    // Capacitor Android
    "https://localhost",
    "capacitor://localhost"
];

if (isset($_SERVER['HTTP_ORIGIN'])) {

    if (in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {

        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);

    }

}

header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    http_response_code(200);
    exit();
}