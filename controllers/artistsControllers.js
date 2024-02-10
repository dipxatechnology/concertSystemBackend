const Artist = require("../models/Artist");
const asyncHandler = require("express-async-handler");

const getAllArtists = asyncHandler(async (req, res) => {
  try {
    const artists = await Artist.find().populate("concert").lean();

    if (!artists?.length) {
      return res.status(400).json({ message: "No artist found " });
    } else {
      return res.json(artists);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getArtistById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Artist ID required" });
  }

  const artist = await Artist.findById(id).lean().exec();

  if (!artist) {
    return res.status(404).json({ message: "Artist not found" });
  }

  return res.json(artist);
});

const createArtist = asyncHandler(async (req, res) => {
  const { username, roles, profile, genre, bio, social } = req.body;

  //this helps confirm fields
  if (
    !username ||
    !roles ||
    !profile ||
    !genre ||
    !bio ||
    !social 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await Artist.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated artist username" });
  }

  const artistObject = {
    username,
    roles,
    profile,
    genre,
    bio,
    social,
  };

  //storing new user
  const artist = await Artist.create(artistObject);

  if (artist) {
    return res
      .status(201)
      .json({ message: `new concert ${artist.username} created` });
  } else {
    res.status(400).json({ message: "Invalid artist data " });
  }
});

const updateArtist = asyncHandler(async (req, res) => {
  const { id, username, roles, profile, genre, bio, social, concert } =
    req.body;

  //checks fields
  if (
    !id ||
    !username ||
    !roles ||
    !profile ||
    !genre ||
    !bio ||
    !social ||
    !concert
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const artist = await Artist.findById(id).exec();

  if (!artist) {
    return res.status(400).json({ message: "artist not found" });
  }

  //checks dups
  const duplicate = await Artist.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate title" });
  }

  artist.username = username;
  artist.roles = roles;
  artist.profile = profile;
  artist.genre = genre;
  artist.bio = bio;
  artist.social = social;
  artist.concert = concert;

  const updatedArtist = await concert.save();

  return res.json({ message: `updated ${updatedArtist.username}` });
});

const deleteArtist = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Artist ID required" });
  }

  const artist = await Artist.findById(id).exec();

  if (!artist) {
    return res.status(400).json({ message: "Artist does not exist" });
  }

  const result = await Artist.deleteOne();

  return res.json(`Artist ${result.username} has been deleted.`);
});

module.exports = {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
};
