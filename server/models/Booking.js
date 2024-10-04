const mongoose = require('mongoose');

// Booking.js

const bookingSchema = new mongoose.Schema({
    intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
    date: { type: Date, required: true },
    seatNumber: { type: Number, required: true },
    specialRequest: { type: String },
    isConfirmed: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'present', 'absent'], default: 'pending' } // New field for attendance status
});

module.exports = mongoose.model('Booking', bookingSchema);

