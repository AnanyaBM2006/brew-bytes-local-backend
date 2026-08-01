<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

try {

    // Today's Sales
    $salesStmt = $pdo->query("
        SELECT
            IFNULL(SUM(grand_total),0) AS today_sales
        FROM orders
        WHERE DATE(created_at)=CURDATE()
        AND order_status='COMPLETED'
    ");

    $todaySales = $salesStmt->fetch(PDO::FETCH_ASSOC);

    // Today's Orders
    $orderStmt = $pdo->query("
        SELECT
            COUNT(*) AS today_orders
        FROM orders
        WHERE DATE(created_at)=CURDATE()
        AND order_status='COMPLETED'
    ");

    $todayOrders = $orderStmt->fetch(PDO::FETCH_ASSOC);

    // Total Menu Items
    $itemStmt = $pdo->query("
        SELECT
            COUNT(*) AS total_items
        FROM items
        WHERE is_available=1
    ");

    $totalItems = $itemStmt->fetch(PDO::FETCH_ASSOC);

    // Total Categories
    $categoryStmt = $pdo->query("
        SELECT
            COUNT(*) AS total_categories
        FROM categories
    ");

    $totalCategories = $categoryStmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode([

        "success" => true,

        "today_sales" =>
            $todaySales["today_sales"],

        "today_orders" =>
            $todayOrders["today_orders"],

        "total_items" =>
            $totalItems["total_items"],

        "total_categories" =>
            $totalCategories["total_categories"]

    ]);

}
catch(PDOException $e){

    echo json_encode([

        "success" => false,

        "message" => $e->getMessage()

    ]);

}

?>
