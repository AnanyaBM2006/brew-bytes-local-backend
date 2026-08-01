<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$items = $data["items"] ?? [];
$payment_method = $data["payment_method"] ?? "CASH";
$subtotal = $data["subtotal"] ?? 0;
$discount = $data["discount"] ?? 0;
$tax = $data["tax"] ?? 0;
$grand_total = $data["total_amount"] ?? 0;

if(count($items)==0){
    echo json_encode([
        "success"=>false,
        "message"=>"No items selected."
    ]);
    exit;
}

try{

    $pdo->beginTransaction();

    $stmt=$pdo->prepare("
    INSERT INTO orders
    (
        staff_id,
        payment_method,
        subtotal,
        discount,
        tax,
        grand_total,
        order_status
    )
    VALUES
    (
        ?,?,?,?,?,?,?
    )
    ");

    $stmt->execute([
        1,
        strtoupper($payment_method),
        $subtotal,
        $discount,
        $tax,
        $grand_total,
        "COMPLETED"
    ]);

    $order_id=$pdo->lastInsertId();

    $bill_no="V2-".str_pad($order_id,5,"0",STR_PAD_LEFT);

    $detail=$pdo->prepare("
    INSERT INTO order_items
    (
        order_id,
        item_id,
        quantity,
        price,
        total
    )
    VALUES
    (
        ?,?,?,?,?
    )
    ");

    foreach($items as $item){

        $lineTotal=$item["quantity"]*$item["price"];

        $detail->execute([
            $order_id,
            $item["item_id"],
            $item["quantity"],
            $item["price"],
            $lineTotal
        ]);

    }

    $pdo->commit();

    echo json_encode([
        "success"=>true,
        "message"=>"Bill Generated Successfully.",
        "order_id"=>$order_id,
        "bill_no"=>$bill_no
    ]);

}
catch(PDOException $e){

    $pdo->rollBack();

    echo json_encode([
        "success"=>false,
        "message"=>$e->getMessage()
    ]);

}