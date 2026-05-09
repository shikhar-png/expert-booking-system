const Booking = require('../models/Booking');
const Expert = require('../models/Expert');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, notes, expertId } = req.body;

    // Check double booking
    const existing = await Booking.findOne({ expertId, date, timeSlot });
    if (existing) {
      return res.status(400).json({ message: 'Slot already booked!' });
    }

    const booking = new Booking({ name, email, phone, date, timeSlot, notes, expertId });
    await booking.save();

    // Update slot as booked
    await Expert.updateOne(
      { _id: expertId, 'timeSlots.date': date, 'timeSlots.time': timeSlot },
      { $set: { 'timeSlots.$.isBooked': true } }
    );

    // Real-time update
    const io = req.app.get('io');
    io.emit('slotBooked', { expertId, date, timeSlot });

    res.status(201).json({ message: 'Booking successful!', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings by email
exports.getBookingsByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.query.email })
      .populate('expertId', 'name category');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking status
exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};