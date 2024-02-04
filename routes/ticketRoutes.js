const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketsControllers')

router.route('/')
    .get(ticketController.getAllTickets)
    .post(ticketController.createTicket)
    .patch(ticketController.updateTicket)
    .delete(ticketController.deleteTicket)
    
router.get('/:id', ticketController.getTicketById)

module.exports = router