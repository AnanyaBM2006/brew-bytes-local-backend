import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/staff`;
export async function getStaff() {

  const response = await fetch(
    `${API_URL}/get_staff.php`
  );

  return await response.json();

}

export async function addStaff(data) {

  const response = await fetch(
    `${API_URL}/add_staff.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return await response.json();

}

export async function updateStaff(data) {

  const response = await fetch(
    `${API_URL}/update_staff.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return await response.json();

}

export async function deleteStaff(id) {

  const response = await fetch(
    `${API_URL}/delete_staff.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        staff_id: id
      })
    }
  );

  return await response.json();

}