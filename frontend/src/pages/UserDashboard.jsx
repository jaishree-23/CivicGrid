import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";

import {
  FaCity,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaBullhorn,
  FaListAlt,
  FaSearchLocation,
  FaBell
} from "react-icons/fa";

import "../styles/dashboard.css";

function UserDashboard() {

  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "User";

  const [totalComplaints, setTotalComplaints] = useState(0);
  const [resolvedComplaints, setResolvedComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [inProgressComplaints, setInProgressComplaints] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

 useEffect(() => {
  fetchComplaintStats();
  fetchUnreadCount();
}, []);

  const fetchComplaintStats = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(
        `/complaints/mycomplaints/${userId}`
      );

      const complaints = res.data;

      setTotalComplaints(complaints.length);
const resolved = complaints.filter(
  (c) => c.status === "Resolved"
).length;

const pending = complaints.filter(
  (c) => c.status === "Pending"
).length;

const inProgress = complaints.filter(
  (c) => c.status === "In Progress"
).length;

setResolvedComplaints(resolved);
setPendingComplaints(pending);
setInProgressComplaints(inProgress);
      
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUnreadCount = async () => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await API.get(
      `/notifications/unread/${userId}`
    );

    setUnreadCount(res.data.count);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <UserSidebar />

      <div className="dashboard-container">

        
        <div className="dashboard-header">

          <div className="brand">
            CivicGrid
          </div>

          <div className="header-right">

            <span>
              Hello, {userName}
            </span>

        <div
  style={{
    position: "relative",
    cursor: "pointer"
  }}
  onClick={() => navigate("/notifications")}
>
  <FaBell className="notification-icon" />

  {unreadCount > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-8px",
        right: "-8px",
        background: "red",
        color: "white",
        borderRadius: "50%",
        minWidth: "18px",
        height: "18px",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
      }}
    >
      {unreadCount}
    </span>
  )}
</div>

          </div>

        </div>

      
        <div className="welcome-banner">

          <div>

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Thank you for helping keep our city clean and safe.
            </p>

          </div>

          <div className="banner-icon">
            🏙
          </div>

        </div>

        <div className="stats-grid">

  <div className="stat-card">
    <div className="stat-icon">📊</div>
    <h3>{totalComplaints}</h3>
    <p>Total Complaints</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon success">✅</div>
    <h3>{resolvedComplaints}</h3>
    <p>Resolved</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon warning">⏳</div>
    <h3>{pendingComplaints}</h3>
    <p>Pending</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">🚧</div>
    <h3>{inProgressComplaints}</h3>
    <p>In Progress</p>
  </div>

</div>

       
        <h3 className="section-title">
          Quick Actions
        </h3>

        <div className="actions-container">

          <div
            className="action-card"
            onClick={() => navigate("/raise-complaint")}
          >
            <div className="action-icon">📢</div>
            <div>
              <h4>Raise Complaint</h4>
              <p>Report civic issues instantly</p>
            </div>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/my-complaints")}
          >
            <div className="action-icon">📋</div>
            <div>
              <h4>My Complaints</h4>
              <p>View your submissions</p>
            </div>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/track-complaint")}
          >
            <div className="action-icon">📡</div>
            <div>
              <h4>Track Complaints</h4>
              <p>Monitor complaint status</p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default UserDashboard;