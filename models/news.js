const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('news', newsSchema)