import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/categories`;
export async function getCategories() {
  const response = await fetch(`${API_URL}/get_categories.php`);
  return await response.json();
}

export async function addCategory(category_name, description) {
  const response = await fetch(`${API_URL}/add_category.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_name,
      description,
    }),
  });

  return await response.json();
}

export async function updateCategory(category_id, category_name, description) {
  const response = await fetch(`${API_URL}/update_category.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_id,
      category_name,
      description,
    }),
  });

  return await response.json();
}

export async function deleteCategory(category_id) {
  const response = await fetch(`${API_URL}/delete_category.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_id,
    }),
  });

  return await response.json();
}