const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
createComplaint,
getMyComplaints,
getAllComplaints,
updateComplaintStatus,
assignDepartment,
updatePriority
} = require("../controllers/complaintController");

/* CREATE COMPLAINT */
router.post(
"/create",
upload.single("image"),
createComplaint
);

/* USER COMPLAINTS */
router.get(
"/mycomplaints/:userId",
getMyComplaints
);

/* ADMIN - ALL COMPLAINTS */
router.get(
"/all",
getAllComplaints
);

/* ADMIN - UPDATE STATUS */
router.put(
"/status/:complaintId",
updateComplaintStatus
);

/* ADMIN - ASSIGN DEPARTMENT */
router.put(
"/department/:complaintId",
assignDepartment
);

/* ADMIN - UPDATE PRIORITY */
router.put(
"/priority/:complaintId",
updatePriority
);

module.exports = router;
