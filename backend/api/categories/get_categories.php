<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

try {

    $stmt = $pdo->query("
        SELECT
            category_id,
            category_name,
            description,
            is_active
        FROM categories
        ORDER BY category_name ASC
    ");

    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "categories" => $categories
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success"=>false,
        "message"=>$e->getMessage()
    ]);

}

?>