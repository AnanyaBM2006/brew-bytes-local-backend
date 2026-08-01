<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

try{

$stmt = $pdo->prepare("

INSERT INTO staff
(
full_name,
phone,
email,
username,
password,
role,
status
)

VALUES
(
?,
?,
?,
?,
?,
?,
?
)

");

$stmt->execute([

$data["full_name"],

$data["phone"],

$data["email"],

$data["username"],

$data["password"],

$data["role"],

"ACTIVE"

]);

echo json_encode([

"success"=>true,

"message"=>"Staff added successfully."

]);

}

catch(PDOException $e){

echo json_encode([

"success"=>false,

"message"=>$e->getMessage()

]);

}

?>