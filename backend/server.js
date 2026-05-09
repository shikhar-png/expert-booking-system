const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// Routes
const expertRoutes = require("./routes/experts");
const bookingRoutes = require("./routes/bookings");

app.use("/experts", expertRoutes);
app.use("/bookings", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});