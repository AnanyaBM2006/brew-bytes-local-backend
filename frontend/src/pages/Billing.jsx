import { useEffect, useState } from "react";
import {
  getBillingItems,
  createOrder,
  printReceipt,
} from "../services/billingService";

function Billing() {

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const tax = 0;

  const [message, setMessage] = useState("");

  useEffect(() => {

    loadItems();

  }, []);

  async function loadItems() {

    const result = await getBillingItems();

    if (result.success) {

      setItems(result.items);

    } else {

      setMessage(result.message);

    }

  }

  const filteredItems = items.filter(item =>
    item.item_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addToCart(item) {

    const existing = cart.find(
      c => c.item_id === item.item_id
    );

    if (existing) {

      setCart(

        cart.map(c =>

          c.item_id === item.item_id

            ? {
                ...c,
                quantity: c.quantity + 1,
              }

            : c

        )

      );

    } else {

      setCart([

        ...cart,

        {
          item_id: item.item_id,
          item_name: item.item_name,
          price: Number(item.price),
          quantity: 1,
        }

      ]);

    }

  }

  function increaseQty(id) {

    setCart(

      cart.map(item =>

        item.item_id === id

          ? {
              ...item,
              quantity: item.quantity + 1,
            }

          : item

      )

    );

  }

  function decreaseQty(id) {

    setCart(

      cart

        .map(item =>

          item.item_id === id

            ? {
                ...item,
                quantity: item.quantity - 1,
              }

            : item

        )

        .filter(item => item.quantity > 0)

    );

  }

  function removeItem(id) {

    setCart(

      cart.filter(

        item => item.item_id !== id

      )

    );

  }

  function calculateSubtotal() {

    return cart.reduce(

      (sum, item) =>

        sum + item.price * item.quantity,

      0

    );

  }

  function calculateDiscount() {

    return calculateSubtotal() * (Number(discount) / 100);

  }

  function calculateGrandTotal() {

    return calculateSubtotal()

      - calculateDiscount()

      + tax;

  }
    async function handleGenerateBill() {

    if (cart.length === 0) {

      setMessage("Please add items to the bill.");

      return;

    }

    const orderData = {

      payment_method: paymentMethod,

      subtotal: calculateSubtotal(),

      discount: calculateDiscount(),

      tax: tax,

      total_amount: calculateGrandTotal(),

      items: cart

    };

    const result = await createOrder(orderData);

    setMessage(result.message);

    if (result.success) {

      printReceipt({

        bill_no: result.bill_no,

        items: cart,

        subtotal: calculateSubtotal(),

        discount: calculateDiscount(),

        tax: tax,

        total_amount: calculateGrandTotal(),

        payment_method: paymentMethod

      });

      setCart([]);

      setDiscount(0);

      setPaymentMethod("Cash");

    }

  }

  return (

    <div className="container-fluid">

      <div className="row">

        {/* LEFT PANEL */}

        <div className="col-lg-7">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h2>Billing</h2>

            <input

              type="text"

              className="form-control"

              placeholder="Search Item..."

              style={{ width: "250px" }}

              value={search}

              onChange={(e) => setSearch(e.target.value)}

            />

          </div>

          {message && (

            <div className="alert alert-success">

              {message}

            </div>

          )}

          <div className="row">

            {filteredItems.map((item) => (

              <div
                className="col-md-4 mb-4"
                key={item.item_id}
              >

                <div
                  className="card shadow h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => addToCart(item)}
                >

                  {item.image_path ? (

                    <img
                      src={`https://v2cafe-mysore.infinityfreeapp.com/${item.image_path}`}
                      className="card-img-top"
                      style={{
                        height: "180px",
                        objectFit: "cover"
                      }}
                    />

                  ) : (

                    <div
                      style={{
                        height: "180px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#eee"
                      }}
                    >

                      No Image

                    </div>

                  )}

                  <div className="card-body text-center">

                    <h5>{item.item_name}</h5>

                    <h6>₹ {item.price}</h6>

                    <button
                      className="btn btn-success btn-sm mt-2"
                    >

                      Add to Bill

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT PANEL */}
                <div className="col-lg-5">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="mb-3">

                Current Bill

              </h3>

              <table className="table table-bordered">

                <thead className="table-dark">

                  <tr>

                    <th>Item</th>

                    <th>Qty</th>

                    <th>Total</th>

                    <th></th>

                  </tr>

                </thead>

                <tbody>

                  {cart.map((item) => (

                    <tr key={item.item_id}>

                      <td>

                        {item.item_name}

                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm me-1"
                          onClick={() => decreaseQty(item.item_id)}
                        >
                          -
                        </button>

                        <strong>

                          {item.quantity}

                        </strong>

                        <button
                          className="btn btn-success btn-sm ms-1"
                          onClick={() => increaseQty(item.item_id)}
                        >
                          +
                        </button>

                      </td>

                      <td>

                        ₹ {item.price * item.quantity}

                      </td>

                      <td>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeItem(item.item_id)}
                        >
                          ✕
                        </button>

                      </td>

                    </tr>

                  ))}

                  {cart.length === 0 && (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center"
                      >

                        No Items Added

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

              <hr />

              <div className="d-flex justify-content-between">

                <strong>

                  Subtotal

                </strong>

                <strong>

                  ₹ {calculateSubtotal().toFixed(2)}

                </strong>

              </div>

              <div className="mt-3">

                <label className="form-label">

                  Discount (%)

                </label>

                <input
                  type="number"
                  className="form-control"
                  value={discount}
                  min="0"
                  max="100"
                  onChange={(e) => setDiscount(e.target.value)}
                />

              </div>

              <div className="d-flex justify-content-between mt-3">

                <strong>

                  Discount

                </strong>

                <strong>

                  ₹ {calculateDiscount().toFixed(2)}

                </strong>

              </div>

              <div className="d-flex justify-content-between mt-3">

                <strong>

                  Tax

                </strong>

                <strong>

                  ₹ {tax.toFixed(2)}

                </strong>

              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <h4>

                  Grand Total

                </h4>

                <h4>

                  ₹ {calculateGrandTotal().toFixed(2)}

                </h4>

              </div>

              <div className="mt-4">

                <label className="form-label">

                  Payment Method

                </label>

                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Card">
                    Card
                  </option>

                </select>

              </div>
                            <button
                className="btn btn-success w-100 mt-4"
                onClick={handleGenerateBill}
              >
                Generate & Print Bill
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Billing;