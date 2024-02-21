const Concert = require("../models/Concert");
const Artist = require("../models/Artist");
const asyncHandler = require("express-async-handler");

const getAllConcerts = asyncHandler(async (req, res) => {
  try {
    const concerts = await Concert.find().populate("artist").lean();

    if (!concerts?.length) {
      return res.status(400).json({ message: "No concerts found " });
    } else {
      return res.json(concerts);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getConcertById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Concert ID required" });
  }

  const concert = await Concert.findById(id).populate("artist").lean().exec();

  if (!concert) {
    return res.status(404).json({ message: "Concert not found" });
  }

  return res.json(concert);
});

const createConcert = asyncHandler(async (req, res) => {
  const {
    title,
    profile,
    date,
    city,
    state,
    country,
    genre,
    artist,
    price,
    description,
    venue,
    seats,
  } = req.body;

  if (
    !title ||
    !profile ||
    !date ||
    !city ||
    !state ||
    !country ||
    !genre ||
    !artist ||
    !price ||
    !description ||
    !venue ||
    !seats
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const concert = await Concert.create({
      title,
      profile,
      date,
      city,
      state,
      country,
      genre,
      artist,
      price,
      description,
      venue,
      seats
    });

    // Update the artist's concerts array
    await Artist.findByIdAndUpdate(
      artist,
      { $push: { concert: concert._id } },
      { new: true }
    );

    return res.status(201).json({ message: `New concert created` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateConcert = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    date,
    venue,
    city,
    country,
    genre,
    artist,
    price,
    description,
    state,
    profile,
    seats,
  } = req.body;

  // checks fields
  if (
    !id ||
    !title ||
    !date ||
    !venue ||
    !description ||
    !city ||
    !country ||
    !genre ||
    !artist ||
    !price ||
    !state ||
    !profile || 
    !seats
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const concert = await Concert.findById(id).exec();

  if (!concert) {
    return res.status(400).json({ message: "concert not found" });
  }

  concert.title = title;
  concert.date = date;
  concert.venue = venue;
  concert.description = description;
  concert.city = city;
  concert.country = country;
  concert.genre = genre;
  concert.artist = artist;
  concert.price = price;
  concert.state = state;
  concert.profile = profile;
  concert.seats = seats;

  // Save the updated concert
  const updatedConcert = await concert.save();

  // Add the concert to the artist's list of concerts
  const artistObject = await Artist.findById(artist).exec();
  if (artistObject) {
    const existingConcertIndex = artistObject.concert.findIndex(
      (concertId) => concertId.toString() === id
    );

    if (existingConcertIndex === -1) {
      artistObject.concert.push(updatedConcert._id);
      await artistObject.save();
    }
  }

  return res.json({ message: `updated ${updatedConcert.title}` });
});

const deleteConcert = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Concert ID required" });
  }

  const concert = await Concert.findById(id).exec();

  if (!concert) {
    return res.status(400).json({ message: "Concert does not exist" });
  }

  const result = await concert.deleteOne();

  return res.json(`User ${result.title} has been deleted.`);
});

module.exports = {
  getAllConcerts,
  getConcertById,
  createConcert,
  updateConcert,
  deleteConcert,
};
