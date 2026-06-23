import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaBell,
  FaSignOutAlt
} from "react-icons/fa";

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-sidebar">

      <h2 className="sidebar-title">
        CivicGrid Admin
      </h2>

      <Link to="/admin-dashboard">
        <FaHome /> Dashboard
      </Link>

      <Link to="/admin-complaints">
        <FaClipboardList /> Complaints
      </Link>

      <Link to="/admin-analytics">
        <FaChartBar /> Analytics
      </Link>

      <Link to="/admin-notifications">
        <FaBell /> Notifications
      </Link>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}

export default AdminSidebar;