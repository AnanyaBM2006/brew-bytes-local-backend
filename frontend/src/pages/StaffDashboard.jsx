import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Billing from "./Billing";

function StaffDashboard() {

  const [activePage, setActivePage] = useState("billing");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  function logout() {

    localStorage.removeItem("user");

    navigate("/");

  }

  return (

    <div className="container-fluid">

      <div className="row">

        {/* Sidebar */}

        <div
          className="col-md-2 bg-dark text-white"
          style={{
            minHeight: "100vh",
            padding: "20px"
          }}
        >

          <h3>

            ☕ V2 CAFE

          </h3>

          <hr />

          <p>

            Welcome,

            <br />

            <b>

              {user?.name}

            </b>

          </p>

          <p>

            Role :

            <b>

              {user?.role}

            </b>

          </p>

          <hr />

          <button

            className="btn btn-success w-100 mb-3"

            onClick={() => setActivePage("billing")}

          >

            Billing

          </button>

          <button

            className="btn btn-danger w-100"

            onClick={logout}

          >

            Logout

          </button>

        </div>

        {/* Main Content */}

        <div className="col-md-10">

          {activePage === "billing" && (

            <Billing />

          )}

        </div>

      </div>

    </div>

  );

}

export default StaffDashboard;