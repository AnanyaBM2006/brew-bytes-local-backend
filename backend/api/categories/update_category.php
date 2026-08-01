<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$category_id = $data["category_id"] ?? 0;
$category_name = trim($data["category_name"] ?? "");
$description = trim($data["description"] ?? "");

if ($category_id == 0 || $category_name == "") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid data."
    ]);
    exit;
}

try {

    $check = $pdo->prepare("
        SELECT category_id
        FROM categories
        WHERE category_name = ?
        AND category_id <> ?
    ");

    $check->execute([$category_name, $category_id]);

    if ($check->rowCount() > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Category already exists."
        ]);
        exit;
    }

    $stmt = $pdo->prepare("
        UPDATE categories
        SET category_name = ?, description = ?
        WHERE category_id = ?
    ");

    $stmt->execute([
        $category_name,
        $description,
        $category_id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Category updated successfully."
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}
?>