import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {

    if(window.confirm("Are you sure you want to logout?")){

      localStorage.removeItem("user");

      navigate("/");

    }

  }

  return (

    <div className="topbar">

      <div>

        <h4>

          Owner Dashboard

        </h4>

        <p>

          Welcome back,

          <b> {user?.name || "Owner"} </b>

        </p>

      </div>

      <div
        className="profile-section"
        style={{
          display:"flex",
          alignItems:"center",
          gap:"20px"
        }}
      >

        <div
          style={{
            display:"flex",
            alignItems:"center",
            gap:"8px"
          }}
        >

          <FaUserCircle size={35} />

          <span>

            {user?.role}

          </span>

        </div>

        <button

          className="btn btn-danger btn-sm"

          onClick={handleLogout}

        >

          <FaSignOutAlt />

          {" "}Logout

        </button>

      </div>

    </div>

  );

}

export default Topbar;