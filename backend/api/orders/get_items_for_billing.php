<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

try {

    $stmt = $pdo->query("
        SELECT
            item_id,
            item_name,
            price,
            image_path,
            category_id
        FROM items
        WHERE is_available = 1
        ORDER BY item_name ASC
    ");

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "items" => $items
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}

?>