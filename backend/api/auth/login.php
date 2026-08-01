<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"] ?? "");
$password = trim($data["password"] ?? "");

if(empty($username) || empty($password)){

    echo json_encode([
        "success"=>false,
        "message"=>"Username and Password are required."
    ]);

    exit;

}

$stmt = $pdo->prepare("

SELECT *

FROM staff

WHERE username=?

AND status='ACTIVE'

");

$stmt->execute([$username]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$user){

    echo json_encode([

        "success"=>false,

        "message"=>"Invalid Username."

    ]);

    exit;

}

/*
For development.

Later we will use password_hash()
*/

if($password != $user["password"]){

    echo json_encode([

        "success"=>false,

        "message"=>"Invalid Password."

    ]);

    exit;

}

echo json_encode([

    "success"=>true,

    "message"=>"Login Successful",

    "user"=>[

        "id"=>$user["staff_id"],

        "name"=>$user["full_name"],

        "role"=>$user["role"]

    ]

]);

?>