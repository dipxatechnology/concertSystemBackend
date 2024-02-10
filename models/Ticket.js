const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Refunded"],
    default: "Pending",
  },
  quantity: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  concert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concert",
  },
  date: {
    type: Date,
    default: Date.now,
    get: function (val) {
      if (!val) return val;
      return val.toISOString().split("T")[0];
    },
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
