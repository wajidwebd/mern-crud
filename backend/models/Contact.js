// backend/models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, 
  category: { type: String, enum: ['Friend', 'Family', 'Work', 'Other'], required: true } 
});

module.exports = mongoose.model('Contact', ContactSchema);
