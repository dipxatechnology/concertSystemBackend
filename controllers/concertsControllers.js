const Concert = require("../models/Concert");
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

  const concert = await Concert.findById(id).lean().exec();

  if (!concert) {
    return res.status(404).json({ message: "Concert not found" });
  }

  return res.json(concert);
});

const createConcert = asyncHandler(async (req, res) => {
  const {
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
  } = req.body;

  //this helps confirm fields
  if (
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
    !profile
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await Concert.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated concert title" });
  }

  const concertObject = {
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
    profile
  };

  //storing new user
  const concert = await Concert.create(concertObject);

  if (concert) {
    return res
      .status(201)
      .json({ message: `new concert ${concert.title} created` });
  } else {
    res.status(400).json({ message: "Invalid concert data " });
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
    profile
  } = req.body;

  //checks fields
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
    !profile
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const concert = await Concert.findById(id).exec();

  if (!concert) {
    return res.status(400).json({ message: "concert not found" });
  }

  //checks dups
  const duplicate = await Concert.findOne({ title }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate title" });
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

  const updatedConcert = await concert.save();

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

  const result = await Concert.deleteOne();

  return res.json(`User ${result.title} has been deleted.`);
});

module.exports = {
  getAllConcerts,
  getConcertById,
  createConcert,
  updateConcert,
  deleteConcert,
};
