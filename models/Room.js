const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Room title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  type: {
    type: String,
    enum: ['Single Room', 'Shared Room', 'PG', 'Flat/Apartment', '1BHK', '2BHK'],
    required: [true, 'Room type is required']
  },
  rent: {
    type: Number,
    required: [true, 'Rent amount is required'],
    min: [0, 'Rent cannot be negative']
  },
  location: {
    address: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    city: { type: String, required: true, default: 'Amravati' }
  },
  amenities: {
    wifi: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    meals: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    hotWater: { type: Boolean, default: false }
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  ownerContact: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  availableFor: {
    type: String,
    enum: ['Boys', 'Girls', 'Any'],
    default: 'Any'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
