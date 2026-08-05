import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import TrackComplaint from "./pages/TrackComplaint";
import Notifications from "./pages/Notifications"; 
import AdminComplaints from "./pages/AdminComplaints";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminNotifications from "./pages/AdminNotifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/raise-complaint" element={<RaiseComplaint />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="/notifications" element={<Notifications />} /> {/* ✅ FIX HERE */}

        
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/admin-complaints" element={<AdminComplaints />} />
<Route path="/admin-analytics" element={<AdminAnalytics />} />
<Route path="/admin-notifications" element={<AdminNotifications />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;