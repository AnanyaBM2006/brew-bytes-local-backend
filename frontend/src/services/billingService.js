import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/orders`;
export async function getBillingItems() {

  const response = await fetch(
    `${API_URL}/get_items_for_billing.php`
  );

  return await response.json();

}

export async function createOrder(orderData) {

  const response = await fetch(
    `${API_URL}/create_order.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    }
  );

  return await response.json();

}

export function printReceipt(data) {

  const win = window.open(
    "",
    "_blank",
    "width=420,height=750"
  );

  const html = `

<!DOCTYPE html>

<html>

<head>

<title>Receipt</title>

<style>

*{

margin:0;
padding:0;
box-sizing:border-box;

}

body{

font-family:Courier New, monospace;

padding:20px;

color:#000;

}

.receipt{

width:300px;

margin:auto;

}

.center{

text-align:center;

}

table{

width:100%;

border-collapse:collapse;

margin-top:10px;

}

th{

border-bottom:1px dashed black;

padding:6px;

font-size:14px;

}

td{

padding:5px;

font-size:14px;

}

hr{

border:none;

border-top:1px dashed black;

margin:8px 0;

}

.total{

font-weight:bold;

font-size:17px;

}

.footer{

text-align:center;

margin-top:15px;

font-size:14px;

}

</style>

</head>

<body>

<div class="receipt">

<div class="center">

<h2>V2 CAFE</h2>

Vijayanagar, Mysuru

<br>

Phone : +91 9876543210

<br>
Bill No : ${data.bill_no}

<br>

Date : ${new Date().toLocaleDateString()}

<br>

Time : ${new Date().toLocaleTimeString()}

</div>

<hr>

<table>

<thead>

<tr>

<th align="left">

Item

</th>

<th>

Qty

</th>

<th align="right">

Amount

</th>

</tr>

</thead>

<tbody>

${data.items.map(item=>`

<tr>

<td>

${item.item_name}

</td>

<td align="center">

${item.quantity}

</td>

<td align="right">

₹${(item.price*item.quantity).toFixed(2)}

</td>

</tr>

`).join("")}

</tbody>

</table>

<hr>

<table>

<tr>

<td>

Subtotal

</td>

<td align="right">

₹${Number(data.subtotal).toFixed(2)}

</td>

</tr>

<tr>

<td>

Discount

</td>

<td align="right">

₹${Number(data.discount).toFixed(2)}

</td>

</tr>

<tr>

<td>

Tax

</td>

<td align="right">

₹${Number(data.tax).toFixed(2)}

</td>

</tr>

<tr class="total">

<td>

Grand Total

</td>

<td align="right">

₹${Number(data.total_amount).toFixed(2)}

</td>

</tr>

</table>

<hr>

Payment :

${data.payment_method}

<hr>

<div class="footer">

Thank You!

<br>

Visit Again ☕

</div>
</div>

<script>

window.onload = function(){

    window.print();

    setTimeout(function(){

        window.close();

    },500);

}

</script>

</body>

</html>

`;

  win.document.open();

  win.document.write(html);

  win.document.close();

}