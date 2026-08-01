<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

try{

    $stmt = $pdo->prepare("

        DELETE FROM staff

        WHERE staff_id = ?

    ");

    $stmt->execute([

        $data["staff_id"]

    ]);

    echo json_encode([

        "success" => true,

        "message" => "Staff deleted successfully."

    ]);

}
catch(PDOException $e){

    echo json_encode([

        "success" => false,

        "message" => $e->getMessage()

    ]);

}
?>