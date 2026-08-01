import Receipt from "./Receipt";

function ReceiptPrint({
  billNo,
  items,
  subtotal,
  discount,
  tax,
  grandTotal,
  paymentMethod
}) {

  const printReceipt = () => {

    const printWindow = window.open("", "_blank", "width=400,height=700");

    const receiptHTML = document.getElementById("receipt").innerHTML;

    printWindow.document.write(`
      <html>
      <head>
        <title>Receipt</title>

        <style>

          body{

            font-family:monospace;

            padding:15px;

            color:#000;

          }

          table{

            width:100%;

            border-collapse:collapse;

          }

          td,th{

            padding:4px;

          }

          hr{

            border:1px dashed black;

          }

        </style>

      </head>

      <body>

      ${receiptHTML}

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();

  };

  return(

    <>

      <Receipt

        billNo={billNo}

        items={items}

        subtotal={subtotal}

        discount={discount}

        tax={tax}

        grandTotal={grandTotal}

        paymentMethod={paymentMethod}

      />

      <button

        className="btn btn-primary mt-3"

        onClick={printReceipt}

      >

        Print Receipt

      </button>

    </>

  );

}

export default ReceiptPrint;