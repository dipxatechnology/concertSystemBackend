const Ticket = require("../models/Ticket");
const User = require("../models/User")
const asyncHandler = require("express-async-handler");

const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("concert").lean();

    if (!tickets?.length) {
      return res.status(400).json({ message: "No tickets found " });
    } else {
      return res.json(tickets);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Ticket ID required" });
  }

  const ticket = await Ticket.findById(id).populate('concert').lean().exec();

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  return res.json(ticket);
});

const createTicket = asyncHandler(async (req, res) => {
  const { status, concert: {_id: concertId}, quantity, user: {_id : userId}, date } = req.body;

  //this helps confirm fields
  if (!concertId || !status || !quantity || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await Ticket.findOne({ user: userId }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated ticket title" });
  }

  const ticketObject = {concertId, status, user: {_id: userId}, date };

  //storing new ticket
  const ticket = await Ticket.create(ticketObject);

  if (ticket) {
    return res
      .status(201)
      .json({ message: `new ticket created` });
  } else {
    res.status(400).json({ message: "Invalid ticket data " });
  }
});

// const createTicket = asyncHandler(async (req, res) => {
//   const { title, status, concert, quantity, date } = req.body;

//   // Get user ID from the request (assuming it's stored in the request during authentication)
//   const userId = req.user.id;

//   // Validate other fields
//   if (!title || !concert || !status || !quantity) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Create a new ticket and associate it with the user
//   const ticketObject = { title, concert, status, user: userId, quantity, date };
//   const ticket = await Ticket.create(ticketObject);

//   if (ticket) {
//     // Update the user's ticket history
//     await User.findByIdAndUpdate(userId, { $push: { ticket: ticket._id } });

//     return res.status(201).json({ message: `new ticket ${ticket.title} created` });
//   } else {
//     res.status(400).json({ message: "Invalid ticket data " });
//   }
// });

const updateTicket = asyncHandler(async (req, res) => {
  const { id, status, concert: {_id: concertId}, quantity, user: {_id : userId} } = req.body;

  //checks fields
  if (!id || !status || !concertId || !quantity || !userId) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const ticket = await Ticket.findById(id).exec();

  if (!ticket) {
    return res.status(400).json({ message: "ticket not found" });
  }

  ticket.concert = concertId;
  ticket.status = status;

  const updatedTicket = await ticket.save();

  return res.json({ message: `updated ${updatedTicket.title}` });
});

const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Ticket ID required" });
  }

  const ticket = await Ticket.findById(id).exec();

  if (!ticket) {
    return res.status(400).json({ message: "Ticket does not exist" });
  }

  const result = await Ticket.deleteOne();

  return res.json(`User ${result.title} has been deleted.`);
});

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
