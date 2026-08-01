import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import Dashboard from "./Dashboard";
import Reports from "./Reports";
import Categories from "./Categories";
import MenuItems from "./MenuItems";
import Billing from "./Billing";
import Staff from "./Staff";

import "../styles/dashboard.css";

function OwnerDashboard() {

  const [activePage, setActivePage] = useState("dashboard");

  return (

    <div className="dashboard-container">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        
      />

      <div className="main-content">

        <Topbar />
        {activePage === "reports" && <Reports />}

        {activePage === "dashboard" && <Dashboard />}

        {activePage === "categories" && <Categories />}

        {activePage === "items" && <MenuItems />}

        {activePage === "billing" && <Billing />}
        {activePage === "staff" && <Staff />}

      </div>
      

    </div>

  );

}

export default OwnerDashboard;