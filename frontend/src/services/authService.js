import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/auth`;

export async function login(username, password) {
  try {
    alert(`${API_URL}/login.php`);
    const response = await fetch(`${API_URL}/login.php`, {
    mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return await response.json();

  } catch (error) {
  console.error("Fetch Error:", error);

  alert(error.name);
  alert(error.message);
  alert(error.toString());

  return {
    success: false,
    message: error.toString(),
  };
}
}