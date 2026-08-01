import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/reports`;export async function sendDailyReport(
  type = "today",
  from = "",
  to = ""
) {

  const response = await fetch(

    `${API_URL}/send_report.php?type=${type}&from=${from}&to=${to}`,

    {
      method: "POST"
    }

  );

  return await response.json();

}