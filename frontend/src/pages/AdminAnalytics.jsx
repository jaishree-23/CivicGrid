import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import "../styles/admin.css";

function AdminAnalytics() {
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

  const statusData = [
    {
      name: "Pending",
      value: complaints.filter(
        (c) => c.status === "Pending"
      ).length
    },
    {
      name: "In Progress",
      value: complaints.filter(
        (c) => c.status === "In Progress"
      ).length
    },
    {
      name: "Resolved",
      value: complaints.filter(
        (c) => c.status === "Resolved"
      ).length
    }
  ];

  const priorityData = [
    {
      name: "Low",
      value: complaints.filter(
        (c) => c.priority === "Low"
      ).length
    },
    {
      name: "Medium",
      value: complaints.filter(
        (c) => c.priority === "Medium"
      ).length
    },
    {
      name: "High",
      value: complaints.filter(
        (c) => c.priority === "High"
      ).length
    },
    {
      name: "Critical",
      value: complaints.filter(
        (c) => c.priority === "Critical"
      ).length
    }
  ];

  const departmentData = [
    {
      department: "Roads",
      count: complaints.filter(
        (c) =>
          c.department ===
          "Roads Department"
      ).length
    },
    {
      department: "Water",
      count: complaints.filter(
        (c) =>
          c.department ===
          "Water Supply Department"
      ).length
    },
    {
      department: "Sanitation",
      count: complaints.filter(
        (c) =>
          c.department ===
          "Sanitation Department"
      ).length
    },
    {
      department: "Lights",
      count: complaints.filter(
        (c) =>
          c.department ===
          "Street Light Department"
      ).length
    },
    {
      department: "Drainage",
      count: complaints.filter(
        (c) =>
          c.department ===
          "Drainage Department"
      ).length
    }
  ];

  const COLORS = [
    "#059669",
    "#14b8a6",
    "#f59e0b",
    "#dc2626"
  ];

  return (
    <>
      <AdminSidebar />

      <div className="admin-container">

        <div className="dashboard-header">
          <div className="brand">
            CivicGrid Analytics
          </div>

          <div className="header-right">
            Analytics Dashboard
          </div>
        </div>

        <div className="welcome-banner">
          <div>
            <h2>Complaint Analytics</h2>

            <p>
              Monitor complaint trends and
              department performance.
            </p>
          </div>

          <div className="banner-icon">
            📊
          </div>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{complaints.length}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card">
            <h3>
              {
                complaints.filter(
                  (c) => c.status === "Pending"
                ).length
              }
            </h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>
              {
                complaints.filter(
                  (c) =>
                    c.status === "Resolved"
                ).length
              }
            </h3>
            <p>Resolved</p>
          </div>

          <div className="stat-card">
            <h3>
              {
                complaints.filter(
                  (c) =>
                    c.priority === "Critical"
                ).length
              }
            </h3>
            <p>Critical Priority</p>
          </div>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "25px",
            marginTop: "25px"
          }}
        >

          <div className="table-container">
            <h3 className="section-title">
              Complaint Status
            </h3>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="table-container">
            <h3 className="section-title">
              Priority Distribution
            </h3>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {priorityData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div
          className="table-container"
          style={{ marginTop: "25px" }}
        >
          <h3 className="section-title">
            Department Performance
          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={departmentData}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="department"
              />

              <YAxis
                allowDecimals={false}
                domain={[0, "auto"]}
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="count"
                name="Complaints"
                fill="#059669"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </>
  );
}

export default AdminAnalytics;