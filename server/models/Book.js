const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    name: {
        type: String
    },
    genre: {
        type: String
    },
    author_id: {
        type: String
    }
})

// model -> is name of table
module.exports = mongoose.model('books', BookSchema)
