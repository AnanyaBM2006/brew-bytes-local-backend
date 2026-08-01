import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/reports`;
export async function getDashboardStats() {

  const response = await fetch(
    `${API_URL}/dashboard_stats.php`
  );

  return await response.json();

}

export async function getSalesReport(
  type = "today",
  from = "",
  to = ""
) {

  const response = await fetch(

    `${API_URL}/sales_report.php?type=${type}&from=${from}&to=${to}`

  );

  return await response.json();

}

export async function getItemReport(
  type = "today",
  from = "",
  to = ""
) {

  const response = await fetch(

    `${API_URL}/item_report.php?type=${type}&from=${from}&to=${to}`

  );

  return await response.json();

}