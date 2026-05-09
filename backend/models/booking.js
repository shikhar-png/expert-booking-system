const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  notes: { type: String },
  expertId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Expert', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Completed'],
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);