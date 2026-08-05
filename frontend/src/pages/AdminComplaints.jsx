import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminComplaints() {
const [complaints, setComplaints] = useState([]);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [selectedImage, setSelectedImage] = useState(null);

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

const assignDepartment = async (complaintId, department) => {
try {
await API.put(`/complaints/department/${complaintId}`, {
department,
});


  fetchComplaints();
} catch (error) {
  console.log(error);
}


};

const updateStatus = async (complaintId, status) => {
try {
await API.put(`/complaints/status/${complaintId}`, {
status,
});


  fetchComplaints();
} catch (error) {
  console.log(error);
}


};

const updatePriority = async (complaintId, priority) => {
try {
await API.put(`/complaints/priority/${complaintId}`, {
priority,
});


  fetchComplaints();
} catch (error) {
  console.log(error);
}


};

const filteredComplaints = complaints.filter((complaint) => {
const searchMatch =
complaint.category?.toLowerCase().includes(search.toLowerCase()) ||
complaint.location?.toLowerCase().includes(search.toLowerCase()) ||
complaint.userId?.name?.toLowerCase().includes(search.toLowerCase());


const statusMatch =
  statusFilter === "All"
    ? true
    : complaint.status === statusFilter;

return searchMatch && statusMatch;


});

return (
<> <AdminSidebar />


  <div className="admin-container">
    <div className="dashboard-header">
      <div className="brand">Complaint Management</div>
    </div>

    <div className="table-container">
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Complaint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="complaints-grid">
        {filteredComplaints.map((complaint) => (
          <div className="complaint-card" key={complaint._id}>
            <div className="complaint-image-container">
              {complaint.image ? (
                <img
                  src={`http://localhost:5000/uploads/${complaint.image}`}
                  alt="Complaint"
                  className="complaint-image"
                  onClick={() =>
                    setSelectedImage(
                      `http://localhost:5000/uploads/${complaint.image}`
                    )
                  }
                />
              ) : (
                <div className="no-image">
                  <div className="no-image-icon">🖼️</div>
                  <p>No Image Available</p>
                </div>
              )}
            </div>

            <h3>{complaint.category}</h3>

            <p>
              <strong>User:</strong>{" "}
              {complaint.userId?.name || "N/A"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {complaint.location}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {complaint.description}
            </p>

            <div style={{ marginTop: "12px" }}>
              <label>Department</label>

              <select
                value={complaint.department || ""}
                onChange={(e) =>
                  assignDepartment(
                    complaint._id,
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Department
                </option>

                <option value="Roads Department">
                  Roads
                </option>

                <option value="Sanitation Department">
                  Sanitation
                </option>

                <option value="Water Supply Department">
                  Water
                </option>

                <option value="Street Light Department">
                  Street Light
                </option>

                <option value="Drainage Department">
                  Drainage
                </option>
              </select>
            </div>

            <div style={{ marginTop: "12px" }}>
              <label>Status</label>

              <select
                value={complaint.status}
                onChange={(e) =>
                  updateStatus(
                    complaint._id,
                    e.target.value
                  )
                }
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div style={{ marginTop: "12px" }}>
              <label>Priority</label>

              <select
                value={complaint.priority || "Medium"}
                onChange={(e) =>
                  updatePriority(
                    complaint._id,
                    e.target.value
                  )
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <p
              style={{
                marginTop: "15px",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              {new Date(
                complaint.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>

    {selectedImage && (
      <div
        className="image-modal"
        onClick={() => setSelectedImage(null)}
      >
        <div
          className="image-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-image"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Complaint Preview"
          />
        </div>
      </div>
    )}
  </div>
</>


);
}

export default AdminComplaints;
