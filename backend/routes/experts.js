const express = require("express");
const router = express.Router();
const Expert = require("../models/expert");

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    
    const experts = await Expert.find(filter);
    res.json({ experts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;