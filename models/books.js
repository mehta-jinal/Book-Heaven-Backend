const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    pub_date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('books', booksSchema)