const Ticket = require("../models/Ticket");
const asyncHandler = require("express-async-handler");

const getAllTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.find().lean();
  if (!ticket?.length) {
    return res.status(400).json({ message: "No tickets found " });
  } else {
    return res.json(ticket);
  }
});

const getTicketById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: "Ticket ID required" });
    }
  
    const ticket = await Ticket.findById(id).lean().exec();
  
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
  
    return res.json(ticket);
  });

const createTicket = asyncHandler(async (req, res) => {
  const { title, status, concert } = req.body;

  //this helps confirm fields
  if (!title || !concert || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await Ticket.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated ticket title" });
  }

  const ticketObject = { title, concert, status };

  //storing new ticket
  const ticket = await Ticket.create(ticketObject);

  if (ticket) {
    return res.status(201).json({ message: `new ticket ${ticket.title} created` });
  } else {
    res.status(400).json({ message: "Invalid ticket data " });
  }
});

const updateTicket = asyncHandler(async (req, res) => {
    const {id, title, status, concert} = req.body

    //checks fields
    if (!id || !title || !status || !concert) {
        return res.status(400).json({message : 'all fields are required'})
    }

    const ticket = await Ticket.findById(id).exec()

    if(!ticket) {
        return res.status(400).json({message : 'ticket not found'})
    }

    //checks dups
    const duplicate = await Ticket.findOne({ title }).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message : 'duplicate title'})
    }

    ticket.title = title
    ticket.concert = concert
    ticket.status = status

    const updatedTicket = await ticket.save()

    return res.json({message : `updated ${updatedTicket.title}`})
});

const deleteTicket = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message : 'Ticket ID required'})
    }

    const ticket = await Ticket.findById(id).exec()

    if(!ticket) {
        return res.status(400).json({ message : 'Ticket does not exist'})
    }

    const result = await Ticket.deleteOne()

    return res.json(`User ${result.title} has been deleted.`)
});

module.exports = { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket };
