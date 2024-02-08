const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
    },
    username: {
        type: String
    },
    email: {
        type: String,
    }
})

module.exports = mongoose.model('FeedBack', feedbackSchema)