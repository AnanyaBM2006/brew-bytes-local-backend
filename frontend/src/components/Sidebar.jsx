import {
  FaCoffee,
  FaHome,
  FaList,
  FaHamburger,
  FaCashRegister,
  FaChartBar,
  FaUsers,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar({ activePage, setActivePage }) {

  return (

    <div className="sidebar">

      <div className="logo-section">

        <FaCoffee size={35} />

        <h3>V2 CAFE</h3>

      </div>

      <ul>

        <li
          className={activePage==="dashboard"?"active":""}
          onClick={()=>setActivePage("dashboard")}
        >
          <FaHome/> Dashboard
        </li>

        <li
          className={activePage==="categories"?"active":""}
          onClick={()=>setActivePage("categories")}
        >
          <FaList/> Categories
        </li>

        <li
          className={activePage==="items"?"active":""}
          onClick={()=>setActivePage("items")}
        >
          <FaHamburger/> Menu Items
        </li>

       <li
  className={activePage === "billing" ? "active" : ""}
  onClick={() => setActivePage("billing")}
>
  <FaCashRegister /> Billing
</li>

        <li
  className={activePage === "reports" ? "active" : ""}
  onClick={() => setActivePage("reports")}
>
  <FaChartBar /> Reports
</li>

        <li
  className={activePage === "staff" ? "active" : ""}
  onClick={() => setActivePage("staff")}
>
  <FaUsers /> Staff
</li>
        <li>
          <FaSignOutAlt/> Logout
        </li>

      </ul>

    </div>

  );

}

export default Sidebar;