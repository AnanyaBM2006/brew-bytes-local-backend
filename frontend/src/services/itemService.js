import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/items`;
export async function getItems() {
  const response = await fetch(`${API_URL}/get_items.php`);
  return await response.json();
}

export async function addItem(formData) {
  const response = await fetch(`${API_URL}/add_item.php`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export async function updateItem(formData) {
  const response = await fetch(`${API_URL}/update_item.php`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export async function deleteItem(item_id) {
  const response = await fetch(`${API_URL}/delete_item.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_id,
    }),
  });

  return await response.json();
}