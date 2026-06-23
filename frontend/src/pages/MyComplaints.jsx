import { useEffect, useState } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";

import {
  FaClipboardList,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt
} from "react-icons/fa";

import "../styles/dashboard.css";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {

      const response = await API.get(
        "/complaints/mycomplaints/" + userId
      );

      setComplaints(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {

    if (status === "Resolved") {
      return "status-resolved";
    }

    if (status === "In Progress") {
      return "status-progress";
    }

    return "status-pending";
  };

  return (
  <>
    <UserSidebar />

    <div className="dashboard-container">

      {/* Header */}
      <div className="page-header">

        <div>
          <h1>
            <FaClipboardList /> My Complaints
          </h1>

          <p>
            View and monitor all complaints submitted by you.
          </p>
        </div>

      </div>

      {/* Banner */}
      <div className="welcome-banner">

        <div>
          <h2>
            Total Complaints: {complaints.length}
          </h2>

          <p>
            Track the progress of every civic issue you have reported.
          </p>
        </div>

        <FaClipboardList className="banner-icon" />

      </div>

      {/* Empty State */}
      {complaints.length === 0 ? (

        <div className="empty-state">

          <h2>No Complaints Found</h2>

          <p>
            You have not submitted any complaints yet.
          </p>

        </div>

      ) : (

        <div className="complaints-grid">

          {complaints.map((complaint) => (

            <div
              className="complaint-card"
              key={complaint._id}
            >

              <div className="complaint-top">

                <h3>
                  {complaint.category}
                </h3>

                <span
                  className={
                    "status-badge " +
                    getStatusClass(complaint.status)
                  }
                >
                  {complaint.status}
                </span>

              </div>

              <div className="complaint-info">

                <p>
                  <FaMapMarkerAlt /> {complaint.location}
                </p>

                <p>
                  <FaBuilding /> {complaint.department || "Not Assigned"}
                </p>

                <p>
                  <FaCalendarAlt />
                  {" "}
                  {complaint.createdAt
                    ? new Date(complaint.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>

              <div className="description">

                <strong>Description:</strong>

                <p>{complaint.description}</p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  </>
);
}

export default MyComplaints;