const Book = require('../models/Book')
const Author = require('../models/Author')

const mongoDataMethods = {
    // book
    getAllBooks: async () => await Book.find(),
    getBookById: async (id) => await Book.findById(id),
    getBooksByAuthorId: async (author_id) => await Book.find({
        author_id
    }),
    createBook: async args => {
        const newBook = new Book(args)

        return await newBook.save();
    },

    // author
    getAllAuthors: async () => await Author.find(),
    getAuthorById: async (id) => await Author.findById(id),
    createAuthor: async args => {
        const newAuthor = new Author(args)

        return await newAuthor.save();
    },
}

module.exports = mongoDataMethods
