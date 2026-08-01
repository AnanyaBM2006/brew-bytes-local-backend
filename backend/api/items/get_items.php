<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

try {

    $stmt = $pdo->query("
        SELECT
            i.item_id,
            i.item_name,
            i.price,
            i.image_path,
            i.is_available,
            c.category_name,
            c.category_id
        FROM items i
        INNER JOIN categories c
        ON i.category_id = c.category_id
        ORDER BY i.item_name ASC
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