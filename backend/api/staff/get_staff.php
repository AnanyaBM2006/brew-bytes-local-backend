<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

try {

    $stmt = $pdo->query("
        SELECT
            staff_id,
            full_name,
            phone,
            email,
            username,
            role,
            status,
            created_at
        FROM staff
        ORDER BY staff_id DESC
    ");

    echo json_encode([
        "success" => true,
        "staff" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}
?>