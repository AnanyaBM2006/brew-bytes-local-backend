<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$item_name = $_POST["item_name"] ?? "";
$category_id = $_POST["category_id"] ?? "";
$price = $_POST["price"] ?? "";
$image_path = "";

$item_name = trim($item_name);

if ($item_name == "" || $category_id == "" || $price == "") {
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
    ");

    $check->execute([$item_name]);

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

        $fileName =
            time() . "_" .
            basename($_FILES["image"]["name"]);

        $targetFile = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {

            $image_path = "backend/uploads/items/" . $fileName;

        }

    }

    $stmt = $pdo->prepare("
        INSERT INTO items
        (
            item_name,
            category_id,
            price,
            image_path,
            is_available
        )
        VALUES
        (
            ?, ?, ?, ?, 1
        )
    ");

    $stmt->execute([
        $item_name,
        $category_id,
        $price,
        $image_path
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Item added successfully."
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}

?>