import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaList,
  FaSearch,
  FaSignOutAlt
} from "react-icons/fa";

function UserSidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">

      {/* LOGO */}
      <h2 className="sidebar-title">
        CivicGrid
      </h2>

      {/* MENU */}
      <Link to="/user-dashboard">
        <FaHome /> Home
      </Link>

      <Link to="/raise-complaint">
        <FaPlusCircle /> Raise Complaint
      </Link>

      <Link to="/my-complaints">
        <FaList /> My Complaints
      </Link>

      <Link to="/track-complaint">
        <FaSearch /> Track Complaints
      </Link>

      {/* LOGOUT */}
      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}

export default UserSidebar;