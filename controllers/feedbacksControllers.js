const FeedBack = require("../models/Feedback");
const asyncHandler = require("express-async-handler");

const getAllFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await FeedBack.find().populate("user").lean();

    if (!feedbacks?.length) {
      return res.status(400).json({ message: "No feedbacks found " });
    } else {
      return res.json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getFeedbackById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Feedback ID required" });
  }

  const feedbacks = await FeedBack.findById(id).lean().exec();

  if (!feedbacks) {
    return res.status(404).json({ message: "feedback not found" });
  }

  return res.json(feedbacks);
});

const createFeedback = asyncHandler(async (req, res) => {
  const { user, message, email, username } = req.body;

  //this helps confirm fields
  if (!user || !message || !email || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userObject = {
    user,
    username,
    message,
    email,
  };

  //storing new Feedback
  const feedbacks = await FeedBack.create(userObject);

  if (feedbacks) {
    return res
      .status(201)
      .json({ message: `new feedback from ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid feedback data " });
  }
});

const updateFeedback = asyncHandler(async (req, res) => {
  const { id, username, user, message, email } = req.body;

  //checks fields
  if (!id || !username || !user || !message || !email) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const feedbacks = await FeedBack.findById(id).exec();

  if (!feedbacks) {
    return res.status(400).json({ message: "feedback not found" });
  }

  //checks dups
  const duplicate = await FeedBack.findOne({ user }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate username" });
  }

  feedbacks.user = user;
  feedbacks.message = message;
  feedbacks.username = username;
  feedbacks.email = email;

  const updatedFeedback = await feedbacks.save();

  return res.json({ message: `updated ${updatedFeedback.username}` });
});

const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Feedback ID required" });
  }

  const feedbacks = await FeedBack.findById(id).exec();

  if (!feedbacks) {
    return res.status(400).json({ message: "Feedback does not exist" });
  }

  const result = await FeedBack.deleteOne();

  return res.json(`Feedback ${result.username} has been deleted.`);
});

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
