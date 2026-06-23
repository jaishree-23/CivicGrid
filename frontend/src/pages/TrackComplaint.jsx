import { useEffect, useState } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";

import {
  FaSearchLocation,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt
} from "react-icons/fa";

import "../styles/dashboard.css";

function TrackComplaint() {

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

  const getProgress = (status) => {

    if (status === "Resolved")
      return 100;

    if (status === "In Progress")
      return 60;

    return 20;
  };

  return (
  <>
    <UserSidebar />

    <div className="dashboard-container">

      {/* Page Header */}
      <div className="page-header">

        <h1>
          <FaSearchLocation /> Track Complaints
        </h1>

        <p>
          Monitor complaint progress in real time.
        </p>

      </div>

      {/* Banner */}
      <div className="welcome-banner">

        <div>
          <h2>
            Complaint Tracking Center
          </h2>

          <p>
            Stay updated on every complaint submitted through CivicGrid.
          </p>
        </div>

        <FaSearchLocation className="banner-icon" />

      </div>

      {/* Empty State */}
      {complaints.length === 0 ? (

        <div className="empty-state">

          <h2>No Complaints Found</h2>

          <p>
            No complaints available for tracking.
          </p>

        </div>

      ) : (

        <div className="complaints-grid">

          {complaints.map((c) => (

            <div className="complaint-card" key={c._id}>

              {/* TOP SECTION */}
              <div className="complaint-top">

                <h3>{c.category}</h3>

                <span
                  className={
                    "status-badge " +
                    (c.status === "Resolved"
                      ? "status-resolved"
                      : c.status === "In Progress"
                      ? "status-progress"
                      : "status-pending")
                  }
                >
                  {c.status}
                </span>

              </div>

              {/* INFO */}
              <div className="complaint-info">

                <p>
                  <FaMapMarkerAlt /> {c.location}
                </p>

                <p>
                  <FaBuilding /> {c.department || "Not Assigned"}
                </p>

                <p>
                  <FaCalendarAlt />{" "}
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>

              {/* TRACKING SECTION */}
              <div className="tracking-section">

                <div className="progress-header">
                  Progress
                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: getProgress(c.status) + "%"
                    }}
                  ></div>

                </div>

                <div className="tracking-steps">

                  <span
                    className={
                      getProgress(c.status) >= 20
                        ? "active-step"
                        : ""
                    }
                  >
                    Submitted
                  </span>

                  <span
                    className={
                      getProgress(c.status) >= 60
                        ? "active-step"
                        : ""
                    }
                  >
                    In Progress
                  </span>

                  <span
                    className={
                      getProgress(c.status) >= 100
                        ? "active-step"
                        : ""
                    }
                  >
                    Resolved
                  </span>

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

export default TrackComplaint;