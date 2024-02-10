const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("ticket")
      .lean();

    if (!users?.length) {
      return res.status(400).json({ message: "No users found " });
    } else {
      return res.json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).select("-password").lean().exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, password, email, phone_number, roles, profile } = req.body;

  //this helps confirm fields
  if (
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    !profile ||
    !email ||
    !phone_number
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated username" });
  }

  //hash pwds using salt rounds
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    username,
    password: hashedPwd,
    roles,
    profile,
    email,
    phone_number,
  };

  //storing new user
  const user = await User.create(userObject);

  if (user) {
    return res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data " });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, email, phone_number, roles, profile, ticket } =
    req.body;

  //checks fields
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    !email ||
    !phone_number ||
    !profile
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  //checks dups
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.profile = profile;
  user.email = email;
  user.phone_number = phone_number;
  user.profile = profile;
  user.ticket = ticket;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  return res.json({ message: `updated ${updatedUser.username}` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const result = await User.deleteOne();

  return res.json(`User ${result.username} has been deleted.`);
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
