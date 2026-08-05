const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");

/* CREATE COMPLAINT */
const createComplaint = async (req, res) => {
  try {
    const { userId, category, description, location } = req.body;

    // Normalize current complaint
    const normalizedCategory = category
      .trim()
      .toLowerCase();

    const normalizedLocation = location
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    // Find all complaints with same category
    const existingComplaints = await Complaint.find({
      status: { $in: ["Pending", "In Progress"] },
      category: {
        $regex: new RegExp(`^${category.trim()}$`, "i")
      }
    });

    // Check for duplicate location
    const duplicateComplaint = existingComplaints.find((complaint) => {
      const existingLocation = complaint.location
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      return existingLocation === normalizedLocation;
    });

    // Duplicate found
    if (duplicateComplaint) {
      return res.status(409).json({
  duplicate: true,
  category: duplicateComplaint.category,
  location: duplicateComplaint.location,
  status: duplicateComplaint.status,
  department: duplicateComplaint.department || "Not Assigned",
  message: "A similar complaint has already been raised."
});
    }

    // Create new complaint
    const complaint = await Complaint.create({
userId,
category,
description,
location,
image: req.file ? req.file.filename : "",
status: "Pending",
priority: "Medium",

timeline: [
{
status: "Pending",
message: "Complaint Submitted"
}
]
});


    await Notification.create({
  userId: complaint.userId,
  message: `📝 Your "${complaint.category}" complaint has been submitted successfully.`
});

    return res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint
    });

  } catch (error) {
    console.log(error);

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

    const complaint = await Complaint.findById(complaintId);

if (!complaint) {
return res.status(404).json({
message: "Complaint not found"
});
}

complaint.status = status;

complaint.timeline.push({
status,
message: `Status changed to ${status}`
});

await complaint.save();

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    await Notification.create({
  userId: complaint.userId,
  message: `🔄 Your "${complaint.category}" complaint status has been updated to "${status}".`
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

    const complaint = await Complaint.findById(complaintId);

if (!complaint) {
return res.status(404).json({
message: "Complaint not found"
});
}

complaint.department = department;

complaint.timeline.push({
status: complaint.status,
message: `Assigned to ${department}`
});

await complaint.save();


    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    await Notification.create({
  userId: complaint.userId,
  message: `🏢 Your "${complaint.category}" complaint has been assigned to the ${department}.`
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
  message: `⚡ Priority for your "${complaint.category}" complaint has been changed to "${priority}".`
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