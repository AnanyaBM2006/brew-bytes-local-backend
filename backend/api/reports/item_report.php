<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$type = $_GET["type"] ?? "today";

$where = "";

switch($type){

    case "today":

        $where = "DATE(o.created_at)=CURDATE()";

        break;

    case "yesterday":

        $where = "DATE(o.created_at)=DATE_SUB(CURDATE(),INTERVAL 1 DAY)";

        break;

    case "week":

        $where = "YEARWEEK(o.created_at,1)=YEARWEEK(CURDATE(),1)";

        break;

    case "month":

        $where = "MONTH(o.created_at)=MONTH(CURDATE())
                  AND YEAR(o.created_at)=YEAR(CURDATE())";

        break;

    case "custom":

        $from = $_GET["from"] ?? "";

        $to = $_GET["to"] ?? "";

        $where = "DATE(o.created_at)
                  BETWEEN '$from'
                  AND '$to'";

        break;

    default:

        $where = "1";

}

$sql = "

SELECT

i.item_name,

SUM(oi.quantity) AS quantity_sold,

SUM(oi.quantity * oi.price) AS revenue

FROM order_items oi

JOIN items i
ON oi.item_id=i.item_id

JOIN orders o
ON oi.order_id=o.order_id

WHERE $where

GROUP BY i.item_id

ORDER BY quantity_sold DESC

";

$stmt = $pdo->query($sql);

echo json_encode([

    "success"=>true,

    "items"=>$stmt->fetchAll(PDO::FETCH_ASSOC)

]);

?>