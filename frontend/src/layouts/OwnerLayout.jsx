import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";

function OwnerLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        {children}
      </div>
    </div>
  );
}

export default OwnerLayout;