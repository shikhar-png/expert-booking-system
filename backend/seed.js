const mongoose = require("mongoose");
require("dotenv").config();
const Expert = require("./models/expert");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");
    await Expert.deleteMany({});
    await Expert.insertMany([
      { name: "Rahul Sharma", category: "Technology", experience: 5, rating: 4.5, timeSlots: [{ date: "2026-05-15", time: "10:00 AM" }, { date: "2026-05-15", time: "2:00 PM" }] },
      { name: "Priya Singh", category: "Finance", experience: 3, rating: 4.2, timeSlots: [{ date: "2026-05-15", time: "11:00 AM" }] },
      { name: "Amit Kumar", category: "Health", experience: 7, rating: 4.8, timeSlots: [{ date: "2026-05-15", time: "9:00 AM" }] },
      { name: "Neha Gupta", category: "Legal", experience: 6, rating: 4.6, timeSlots: [{ date: "2026-05-16", time: "10:00 AM" }] },
    ]);
    console.log("Data added!");
    process.exit(0);
  } catch (err) {
    console.log("Error:", err.message);
    process.exit(1);
  }
}

seed();