<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$item_id = $_POST["item_id"] ?? "";
$item_name = trim($_POST["item_name"] ?? "");
$category_id = $_POST["category_id"] ?? "";
$price = $_POST["price"] ?? "";
$current_image = $_POST["current_image"] ?? "";

$image_path = $current_image;

if ($item_id == "" || $item_name == "" || $category_id == "" || $price == "") {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

try {

    $check = $pdo->prepare("
        SELECT item_id
        FROM items
        WHERE item_name = ?
        AND item_id <> ?
    ");

    $check->execute([$item_name, $item_id]);

    if ($check->rowCount() > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Item already exists."
        ]);
        exit;
    }

    if (
        isset($_FILES["image"]) &&
        $_FILES["image"]["error"] == 0
    ) {

        $uploadDir = "../../uploads/items/";

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = time() . "_" . basename($_FILES["image"]["name"]);
        $targetFile = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {

            $image_path = "backend/uploads/items/" . $fileName;

        }
    }

    $stmt = $pdo->prepare("
        UPDATE items
        SET
            item_name = ?,
            category_id = ?,
            price = ?,
            image_path = ?
        WHERE item_id = ?
    ");

    $stmt->execute([
        $item_name,
        $category_id,
        $price,
        $image_path,
        $item_id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Item updated successfully."
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}

?>