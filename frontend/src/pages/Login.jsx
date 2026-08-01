import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCoffee, FaUser, FaLock } from "react-icons/fa";
import { login } from "../services/authService";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

  setMessage("");

  const result = await login(username, password);

  if (result.success) {

    // Save logged-in user

    localStorage.setItem(

      "user",

      JSON.stringify(result.user)

    );

    if (result.user.role === "OWNER") {

  navigate("/owner");

} else {

  navigate("/staff-dashboard");

}
  }

  else {

    setMessage(result.message);

  }

};

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo">
          <FaCoffee color="#5D4037" />
        </div>

        <h2 className="title">V2 CAFE</h2>

        <p className="subtitle">
          Cafe Billing & Management System
        </p>

        <div className="mb-3">
          <label className="form-label">
            Username
          </label>

          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password
          </label>

          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {message && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}

        <button
          className="btn-login"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;