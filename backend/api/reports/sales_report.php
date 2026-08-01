<?php

require_once "../../config/cors.php";
require_once "../../config/database.php";

$type = $_GET["type"] ?? "today";

$where = "";

switch($type){

    case "today":

        $where = "DATE(created_at)=CURDATE()";

        break;

    case "yesterday":

        $where = "DATE(created_at)=DATE_SUB(CURDATE(),INTERVAL 1 DAY)";

        break;

    case "week":

        $where = "YEARWEEK(created_at,1)=YEARWEEK(CURDATE(),1)";

        break;

    case "month":

        $where = "MONTH(created_at)=MONTH(CURDATE())
                  AND YEAR(created_at)=YEAR(CURDATE())";

        break;

    case "custom":

        $from = $_GET["from"] ?? "";

        $to = $_GET["to"] ?? "";

        $where = "DATE(created_at)
                  BETWEEN '$from'
                  AND '$to'";

        break;

    default:

        $where = "1";

}

$sql = "

SELECT

order_id,

created_at,

payment_method,

subtotal,

discount,

tax,

grand_total,

order_status

FROM orders

WHERE $where

ORDER BY order_id DESC

";

$stmt = $pdo->query($sql);

echo json_encode([

"success"=>true,

"reports"=>$stmt->fetchAll(PDO::FETCH_ASSOC)

]);

?>