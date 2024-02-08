const mongoose = require("mongoose");

// ignored collecting peoples location
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  roles: [
    {
      type: String,
      default: "Guest",
    },
  ],
  profile: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  ticket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

module.exports = mongoose.model("Admin", adminSchema);
