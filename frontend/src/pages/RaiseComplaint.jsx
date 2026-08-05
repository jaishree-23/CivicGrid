import { useState } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";

import {
  FaBullhorn,
  FaMapMarkerAlt,
  FaImage,
  FaClipboardList
} from "react-icons/fa";

import "../styles/dashboard.css";

function RaiseComplaint() {

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: ""
  });

  const [image, setImage] = useState(null);

  const useCurrentLocation = () => {
if (!navigator.geolocation) {
alert("Geolocation not supported");
return;
}

navigator.geolocation.getCurrentPosition(
async (position) => {
try {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;


    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Accuracy:", position.coords.accuracy);

    const response = await fetch(
   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );

    const data = await response.json();

    const address =
      data.display_name ||
      `${latitude}, ${longitude}`;

    setFormData((prev) => ({
      ...prev,
      location: address
    }));

    console.log("Full Address:", address);

  } catch (error) {
    console.log(error);
    alert("Failed to fetch address");
  }
},

(error) => {
  console.error(error);
  alert("Please allow location access");
},

{
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
}


);
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
e.preventDefault();

try {
const data = new FormData();


data.append("userId", localStorage.getItem("userId"));
data.append("category", formData.category);
data.append("description", formData.description);
data.append("location", formData.location);

if (image) {
  data.append("image", image);
}

const res = await API.post("/complaints/create", data);

alert(res.data.message);

setFormData({
  category: "",
  description: "",
  location: ""
});

setImage(null);
} catch (error) {
console.log(error);

if (error.response && error.response.status === 409) {

  const data = error.response.data;

  alert(
`⚠ DUPLICATE COMPLAINT FOUND

📂 Category:
${data.category}

📍 Location:
${data.location}

🚧 Current Status:
${data.status}

🏢 Department:
${data.department}

ℹ️ A similar complaint has already been raised.

Please track the existing complaint instead of creating a new one.`
  );

  return;
} else {
  alert("Failed to submit complaint");
}


}
};

  return (
    <>
      <UserSidebar />

      <div className="dashboard-container">

        {/* HEADER */}
        <div className="page-header">

          <div>
            <h1>
              <FaBullhorn /> Raise Complaint
            </h1>

            <p>
              Help improve your community by reporting civic issues.
            </p>
          </div>

        </div>

        {/* BANNER */}
        <div className="welcome-banner">

          <div>
            <h2>Make Your Voice Count 📢</h2>

            <p>
              Report issues like garbage, potholes, street lights, water leakage and more.
            </p>
          </div>

          <FaClipboardList className="banner-icon" />

        </div>

        {/* FORM */}
        <div className="complaint-form-card">

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* CATEGORY */}
              <div className="input-group">
                <label>Complaint Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option>Garbage</option>
                  <option>Road Damage</option>
                  <option>Water Leakage</option>
                  <option>Street Light</option>
                </select>
              </div>

              {/* LOCATION */}
              <div className="input-group">
                <label>
                  <FaMapMarkerAlt /> Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Enter or use current location"
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={useCurrentLocation}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#059669",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  📍 Use My Current Location
                </button>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="input-group">
              <label>Description</label>

              <textarea
                name="description"
                rows="6"
                value={formData.description}
                placeholder="Describe the issue in detail..."
                onChange={handleChange}
                required
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="upload-box">

              <FaImage className="upload-icon" />

              <p>Upload Supporting Image</p>

              <label className="custom-upload-btn">
                Choose Image

                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setImage(e.target.files[0])
                  }
                />
              </label>

              <span className="file-name">
                {image ? image.name : "No file selected"}
              </span>

            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="submit-btn">
              Submit Complaint
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default RaiseComplaint;