import { useEffect, useState } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";
import "../styles/dashboard.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    markNotificationsRead();
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(
        `/notifications/${userId}`
      );

      setNotifications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const markNotificationsRead = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await API.put(
        `/notifications/read/${userId}`
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UserSidebar />

      <div className="dashboard-container">

        <div className="page-header">
          <h1>🔔 My Notifications</h1>

          <p>
            All updates related to your complaints
          </p>
        </div>

        {notifications.length === 0 ? (

          <div className="empty-state">
            <h2>No Notifications</h2>

            <p>
              You don't have any updates yet
            </p>
          </div>

        ) : (

          <div className="complaints-grid">

            {notifications.map((n) => (

              <div
                className="complaint-card"
                key={n._id}
                style={{
                  borderLeft:
                    n.isRead === false
                      ? "5px solid #059669"
                      : "none"
                }}
              >
                <p>{n.message}</p>

                <small>
                  {new Date(
                    n.createdAt
                  ).toLocaleString()}
                </small>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Notifications;