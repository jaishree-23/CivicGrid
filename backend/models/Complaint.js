const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },

    department: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Medium"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Complaint", complaintSchema);