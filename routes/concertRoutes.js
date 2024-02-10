const express = require('express')
const router = express.Router()
const concertController = require('../controllers/concertsControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(concertController.getAllConcerts)
    .post(concertController.createConcert)
    .patch(concertController.updateConcert)
    .delete(concertController.deleteConcert)

router.get('/:id', concertController.getConcertById)

module.exports = router