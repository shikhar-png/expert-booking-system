const Expert = require('../models/Expert');

// Get all experts with search, filter, pagination
exports.getExperts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 6 } = req.query;
    let query = {};

    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const experts = await Expert.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Expert.countDocuments(query);

    res.json({
      experts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single expert
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ message: 'Expert not found' });
    res.json(expert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};