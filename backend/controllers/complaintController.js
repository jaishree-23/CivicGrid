const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");

/* CREATE COMPLAINT */
const createComplaint = async (req, res) => {
  try {
    const { userId, category, description, location } = req.body;

    const complaint = await Complaint.create({
      userId,
      category,
      description,
      location,
      image: req.file ? req.file.filename : "",
      status: "Pending",
      priority: "Medium"
    });

    await Notification.create({
      userId: complaint.userId,
      message: "Complaint submitted successfully"
    });

    return res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* GET MY COMPLAINTS */
const getMyComplaints = async (req, res) => {
  try {
    const { userId } = req.params;

    const complaints = await Complaint.find({ userId }).sort({
      createdAt: -1
    });

    return res.status(200).json(complaints);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* GET ALL COMPLAINTS */
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(complaints);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* UPDATE STATUS */
const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    await Notification.create({
      userId: complaint.userId,
      message: `Complaint status updated to ${status}`
    });

    return res.status(200).json({
      message: "Complaint status updated",
      complaint
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* ASSIGN DEPARTMENT */
const assignDepartment = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { department } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { department },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    await Notification.create({
      userId: complaint.userId,
      message: `Complaint assigned to ${department} department`
    });

    return res.status(200).json({
      message: "Department assigned successfully",
      complaint
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* UPDATE PRIORITY */
const updatePriority = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { priority } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { priority },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    await Notification.create({
      userId: complaint.userId,
      message: `Complaint priority updated to ${priority}`
    });

    return res.status(200).json({
      message: "Priority updated successfully",
      complaint
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  assignDepartment,
  updatePriority
};