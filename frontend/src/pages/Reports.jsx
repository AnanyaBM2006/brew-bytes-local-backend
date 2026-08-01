import { useEffect, useState } from "react";

import * as reportService from "../services/reportService";
import { sendDailyReport } from "../services/emailService";

function Reports() {

  // Sales Report
  const [sales, setSales] = useState([]);

  // Item Report
  const [items, setItems] = useState([]);

  // Message
  const [message, setMessage] = useState("");

  // Report Filters
  const [reportType, setReportType] = useState("today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {

    loadReports();

  }, [reportType]);

  async function loadReports() {

  const salesResult =
    await reportService.getSalesReport(
      reportType,
      fromDate,
      toDate
    );

  if (salesResult.success) {

    setSales(salesResult.reports);

  }

  const itemResult =
    await reportService.getItemReport(
      reportType,
      fromDate,
      toDate
    );

  if (itemResult.success) {

    setItems(itemResult.items);

  }

}

async function handleGenerateReport() {

  if (
    reportType === "custom" &&
    (!fromDate || !toDate)
  ) {

    setMessage(
      "Please select both From Date and To Date."
    );

    return;

  }

  setMessage("");

  await loadReports();

}

  async function handleEmailReport() {

  if (
    reportType === "custom" &&
    (!fromDate || !toDate)
  ) {

    setMessage(
      "Please select both From Date and To Date."
    );

    return;

  }

  const result = await sendDailyReport(

    reportType,

    fromDate,

    toDate

  );

  setMessage(result.message);

}
  return (

  <div className="container-fluid">

    <h2 className="mb-4">

      Reports

    </h2>

    {message && (

      <div className="alert alert-info">

        {message}

      </div>

    )}

    {/* REPORT FILTER */}

    <div className="card shadow mb-4">

      <div className="card-header">

        <h5>

          Generate Report

        </h5>

      </div>

      <div className="card-body">

        <div className="row">

          <div className="col-md-3">

            <label className="form-label">

              Report Type

            </label>

            <select

              className="form-select"

              value={reportType}

              onChange={(e)=>setReportType(e.target.value)}

            >

              <option value="today">

                Today

              </option>

              <option value="yesterday">

                Yesterday

              </option>

              <option value="week">

                This Week

              </option>

              <option value="month">

                This Month

              </option>

              <option value="custom">

                Custom

              </option>

            </select>

          </div>

          <div className="col-md-3">

            <label className="form-label">

              From Date

            </label>

            <input

              type="date"

              className="form-control"

              value={fromDate}

              disabled={reportType !== "custom"}

              onChange={(e)=>setFromDate(e.target.value)}

            />

          </div>

          <div className="col-md-3">

            <label className="form-label">

              To Date

            </label>

            <input

              type="date"

              className="form-control"

              value={toDate}

              disabled={reportType !== "custom"}

              onChange={(e)=>setToDate(e.target.value)}

            />

          </div>

          <div className="col-md-3 d-flex align-items-end">

            <button

              className="btn btn-success w-100"

              onClick={handleGenerateReport}

            >

              Generate Report

            </button>

          </div>

        </div>

      </div>

    </div>

    {/* SALES REPORT */}

    <div className="card shadow mb-4">

      <div className="card-header">

        <h5>

          Sales Report

        </h5>

      </div>

      <div className="card-body">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>

              <th>Order ID</th>

              <th>Date</th>

              <th>Payment</th>

              <th>Subtotal</th>

              <th>Discount</th>

              <th>Tax</th>

              <th>Grand Total</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>
            {sales.map((report) => (

  <tr key={report.order_id}>

    <td>

      {report.order_id}

    </td>

    <td>

      {report.created_at}

    </td>

    <td>

      {report.payment_method}

    </td>

    <td>

      ₹ {report.subtotal}

    </td>

    <td>

      ₹ {report.discount}

    </td>

    <td>

      ₹ {report.tax}

    </td>

    <td>

      <b>

        ₹ {report.grand_total}

      </b>

    </td>

    <td>

      <span className="badge bg-success">

        {report.order_status}

      </span>

    </td>

  </tr>

))}

{sales.length === 0 && (

  <tr>

    <td
      colSpan="8"
      className="text-center"
    >

      No Sales Found

    </td>

  </tr>

)}
          </tbody>

        </table>

      </div>

    </div>
    {/* ITEM REPORT */}

<div className="card shadow mb-4">

  <div className="card-header">

    <h5>

      Top Selling Items

    </h5>

  </div>

  <div className="card-body">

    <table className="table table-bordered table-hover">

      <thead className="table-dark">

        <tr>

          <th>Item Name</th>

          <th>Quantity Sold</th>

          <th>Revenue</th>

        </tr>

      </thead>

      <tbody>

        {items.map((item, index) => (

          <tr key={index}>

            <td>

              {item.item_name}

            </td>

            <td>

              {item.quantity_sold}

            </td>

            <td>

              ₹ {item.revenue}

            </td>

          </tr>

        ))}

        {items.length === 0 && (

          <tr>

            <td
              colSpan="3"
              className="text-center"
            >

              No Item Sales Found

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
<div className="card shadow">

  <div className="card-body">

    <div className="row">

      <div className="col-md-4">

        <button
          className="btn btn-success w-100"
          onClick={() => window.print()}
        >

          🖨 Print Report

        </button>

      </div>

      <div className="col-md-4">

        <button
          className="btn btn-primary w-100"
          onClick={handleEmailReport}
        >

          📧 Email Report

        </button>

      </div>

      <div className="col-md-4">

        <button
          className="btn btn-danger w-100"
          disabled
        >

          📄 Export PDF (Coming Soon)

        </button>

      </div>

    </div>

  </div>

</div>

</div>

);

}

export default Reports;