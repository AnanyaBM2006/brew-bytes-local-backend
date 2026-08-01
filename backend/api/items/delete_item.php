<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$item_id = $data["item_id"] ?? 0;

if ($item_id == 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid Item."
    ]);
    exit;
}

try {

    // Get image path before deleting
    $stmt = $pdo->prepare("
        SELECT image_path
        FROM items
        WHERE item_id = ?
    ");

    $stmt->execute([$item_id]);

    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($item) {

        if (!empty($item["image_path"])) {

            $file = "../../" . str_replace("backend/", "", $item["image_path"]);

            if (file_exists($file)) {
                unlink($file);
            }

        }

    }

    $delete = $pdo->prepare("
        DELETE FROM items
        WHERE item_id = ?
    ");

    $delete->execute([$item_id]);

    echo json_encode([
        "success" => true,
        "message" => "Item deleted successfully."
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}

?>