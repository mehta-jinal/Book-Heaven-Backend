const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('languages', languagesSchema)