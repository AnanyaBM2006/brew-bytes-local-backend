import React from "react";

function Receipt({
  billNo,
  items,
  subtotal,
  discount,
  tax,
  grandTotal,
  paymentMethod
}) {

  const today = new Date();

  const date = today.toLocaleDateString();

  const time = today.toLocaleTimeString();

  return (

    <div
      id="receipt"
      style={{
        width: "300px",
        margin: "0 auto",
        padding: "15px",
        fontFamily: "monospace",
        color: "#000",
        background: "#fff"
      }}
    >

      <center>

        <h2
          style={{
            marginBottom: "5px"
          }}
        >
          V2 CAFE
        </h2>

        <div>

          Vijayanagar,
          Mysuru

        </div>

        <div>

          Mob : 9876543210

        </div>

      </center>

      <hr/>

      <div>

        <b>Bill No :</b> {billNo}

      </div>

      <div>

        <b>Date :</b> {date}

      </div>

      <div>

        <b>Time :</b> {time}

      </div>

      <hr/>

      <table
        width="100%"
      >

        <thead>

          <tr>

            <th align="left">

              Item

            </th>

            <th>

              Qty

            </th>

            <th align="right">

              Amt

            </th>

          </tr>

        </thead>

        <tbody>

          {items.map(item=>(

            <tr
              key={item.item_id}
            >

              <td>

                {item.item_name}

              </td>

              <td
                align="center"
              >

                {item.quantity}

              </td>

              <td
                align="right"
              >

                ₹{item.price*item.quantity}

              </td>

            </tr>

          ))}
                  </tbody>

      </table>

      <hr />

      <table width="100%">

        <tbody>

          <tr>

            <td>
              Subtotal
            </td>

            <td align="right">
              ₹ {subtotal.toFixed(2)}
            </td>

          </tr>

          <tr>

            <td>
              Discount
            </td>

            <td align="right">
              ₹ {discount.toFixed(2)}
            </td>

          </tr>

          <tr>

            <td>
              Tax
            </td>

            <td align="right">
              ₹ {tax.toFixed(2)}
            </td>

          </tr>

        </tbody>

      </table>

      <hr />

      <table width="100%">

        <tbody>

          <tr>

            <td>

              <b>Grand Total</b>

            </td>

            <td align="right">

              <b>

                ₹ {grandTotal.toFixed(2)}

              </b>

            </td>

          </tr>

        </tbody>

      </table>

      <hr />

      <div>

        <b>

          Payment :

        </b>

        {" "}

        {paymentMethod}

      </div>

      <br />

      <center>

        ********************************

        <br />

        THANK YOU

        <br />

        VISIT AGAIN

        <br />

        ********************************

      </center>

    </div>

  );

}

export default Receipt;