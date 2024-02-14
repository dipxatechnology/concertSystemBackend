const Ticket = require("../models/Ticket");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({
        path: "user",
        model: "User",
        select: "-password"
      })
      .populate({
        path: "concert",
        model: "Concert",
      })
      .lean();

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

  const ticket = await Ticket.findById(id).populate("concert").lean().exec();

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  return res.json(ticket);
});

const createTicket = asyncHandler(async (req, res) => {
  const { status, concert, quantity, user, date } = req.body;

  if (!concert || !status || !quantity || !user || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Ticket.findOne({ user }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated ticket user" });
  }

  const ticketObject = {
    status,
    concert,
    quantity,
    user,
    date,
  };

  const ticket = await Ticket.create(ticketObject);

  if (ticket) {
    return res.status(201).json({ message: "New ticket created" });
  } else {
    res.status(400).json({ message: "Invalid ticket data" });
  }
});

const updateTicket = asyncHandler(async (req, res) => {
  const { id, status, concert, quantity } = req.body;

  //checks fields
  if (!id || !status || !concert || !quantity) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const ticket = await Ticket.findById(id).exec();

  if (!ticket) {
    return res.status(400).json({ message: "ticket not found" });
  }

  ticket.concert = concert;
  ticket.status = status;
  ticket.quantity = quantity;

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
