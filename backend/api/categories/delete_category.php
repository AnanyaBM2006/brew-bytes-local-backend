<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$category_id = $data["category_id"] ?? 0;

if (!$category_id) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid Category."
    ]);
    exit;
}

try {

    $stmt = $pdo->prepare("DELETE FROM categories WHERE category_id=?");
    $stmt->execute([$category_id]);

    echo json_encode([
        "success" => true,
        "message" => "Category Deleted Successfully."
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}

?>