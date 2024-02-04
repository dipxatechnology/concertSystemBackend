const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Admin"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)