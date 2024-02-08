const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Artist"
    }],
    profile: {
        type: String,
    },
    genre: [{
        type: String,
    }],
    bio: {
        type: String,
    },
    social: [{
        type: String,
    }],
    concert: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Concert',
    }]
})

module.exports = mongoose.model('Artist', artistSchema)