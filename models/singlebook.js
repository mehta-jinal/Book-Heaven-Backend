const mongoose = require('mongoose')

const singlebookSchema = mongoose.Schema({

    b_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books', //fb to book table
        required: true
    },
    l_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages', //fb to book table
        required: true
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', //fb to book table
        required: true
    }
})
module.exports = mongoose.model('singlebook', singlebookSchema)