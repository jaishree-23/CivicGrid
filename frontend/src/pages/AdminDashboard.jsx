import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [progress, setProgress] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/all");

      const data = res.data;

      setComplaints(data);

      setTotal(data.length);

      setPending(
        data.filter((c) => c.status === "Pending").length
      );

      setProgress(
        data.filter((c) => c.status === "In Progress").length
      );

      setResolved(
        data.filter((c) => c.status === "Resolved").length
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminSidebar />

      <div className="admin-container">
        <div className="dashboard-header">
          <div className="brand">CivicGrid</div>

          <div className="header-right">
            Welcome Admin
          </div>
        </div>

        <div className="welcome-banner">
          <div>
            <h2>Admin Control Panel</h2>

            <p>
              Manage and monitor all civic complaints.
            </p>
          </div>

          <div className="banner-icon">
            🛠️
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{total}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>{progress}</h3>
            <p>In Progress</p>
          </div>

          <div className="stat-card">
            <h3>{resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

        <h3 className="section-title">
          All Complaints
        </h3>

        <div className="table-container">
          <table className="complaint-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>User</th>
                <th>Location</th>
                <th>Department</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint.category}</td>

                    <td>
                      {complaint.userId?.name || "N/A"}
                    </td>

                    <td>{complaint.location}</td>

                    <td>
                      {complaint.department ||
                        "Not Assigned"}
                    </td>

                    <td>{complaint.status}</td>

                    <td>
                      {complaint.priority || "Medium"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;