const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    c_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('categories', categoriesSchema)