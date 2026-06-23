const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes =
require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Civic Compliance Backend Running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});