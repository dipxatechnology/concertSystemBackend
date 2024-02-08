const express = require('express')
const router = express.Router()
const concertController = require('../controllers/feedbacksControllers')

router.route('/')
    .get()
    .post()
    .patch()
    .delete()

router.get('/:id', )

module.exports = router