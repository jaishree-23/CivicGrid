import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminNotifications() {
const [complaints, setComplaints] = useState([]);

useEffect(() => {
fetchComplaints();
}, []);

const fetchComplaints = async () => {
try {
const res = await API.get("/complaints/all");
setComplaints(res.data);
} catch (error) {
console.log(error);
}
};

return (
<> <AdminSidebar />

```
  <div className="admin-container">

    <div className="dashboard-header">
      <div className="brand">
        CivicGrid Notifications
      </div>

      <div className="header-right">
        Admin Alerts
      </div>
    </div>

    <div className="welcome-banner">
      <div>
        <h2>System Notifications</h2>

        <p>
          Monitor complaint activities and updates.
        </p>
      </div>

      <div className="banner-icon">
        🔔
      </div>
    </div>

    {complaints.length === 0 ? (

      <div className="empty-state">
        <h2>No Notifications</h2>

        <p>
          No complaint activities found
        </p>
      </div>

    ) : (

      <div className="notifications-container">

        {complaints.map((complaint) => (

          <div
            key={complaint._id}
            className="admin-notification-card"
          >

            <div
              className={`notification-badge ${
                complaint.priority === "Critical"
                  ? "badge-critical"
                  : complaint.priority === "High"
                  ? "badge-high"
                  : "badge-normal"
              }`}
            >
              {complaint.priority === "Critical"
                ? "🚨"
                : complaint.priority === "High"
                ? "⚠️"
                : "🔔"}
            </div>

            <div className="notification-content">

              <h3>
                {complaint.category}
              </h3>

              <p>
                New complaint submitted by
                <strong>
                  {" "}
                  {complaint.userId?.name || "User"}
                </strong>
              </p>

              <p>
                📍 {complaint.location}
              </p>

              <p>
                🏢 {complaint.department || "Not Assigned"}
              </p>

              <p>
                Status: {complaint.status}
              </p>

              <p>
                Priority: {complaint.priority}
              </p>

              <div className="notification-time">
                {new Date(
                  complaint.createdAt
                ).toLocaleString()}
              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
</>


);
}

export default AdminNotifications;
