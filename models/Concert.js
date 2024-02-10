const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: function (val) {
      if (!val) return val;
      return val.toISOString().split("T")[0];
    },
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  genre: [{
    type: String,
  }],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  price: {
    type: Number
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
});

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;
