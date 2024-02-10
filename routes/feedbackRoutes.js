const express = require('express')
const router = express.Router()
const feedbacksController = require('../controllers/feedbacksControllers')

router.route('/')
    .get(feedbacksController.getAllFeedbacks)
    .post(feedbacksController.createFeedback)
    .patch(feedbacksController.updateFeedback)
    .delete(feedbacksController.deleteFeedback)

router.get('/:id', feedbacksController.getFeedbackById)

module.exports = router