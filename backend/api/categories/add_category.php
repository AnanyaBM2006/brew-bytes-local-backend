<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$category_name = trim($data["category_name"] ?? "");
$description = trim($data["description"] ?? "");

if ($category_name == "") {
    echo json_encode([
        "success" => false,
        "message" => "Category name is required."
    ]);
    exit;
}

try {

    $check = $pdo->prepare("SELECT category_id FROM categories WHERE category_name=?");
    $check->execute([$category_name]);

    if($check->rowCount()>0){

        echo json_encode([
            "success"=>false,
            "message"=>"Category already exists."
        ]);
        exit;

    }

    $stmt=$pdo->prepare("INSERT INTO categories(category_name,description) VALUES(?,?)");

    $stmt->execute([
        $category_name,
        $description
    ]);

    echo json_encode([
        "success"=>true,
        "message"=>"Category Added Successfully."
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success"=>false,
        "message"=>$e->getMessage()
    ]);

}

?>