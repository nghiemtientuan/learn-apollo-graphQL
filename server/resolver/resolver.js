const {books, authors} = require('../data/sample')

const resolvers = {
  // QUERY
  Query: {
    books: () => books,
    book: (parent, args) => books.find(book => book.id === +args.id),
    authors: () => authors,
    author: (parent, args) => authors.find(author => author.id === +args.id),
  },
  Book: {
    author: (parent, args) => {
      // parent chinh la ket qua cua query cha {id: 1, name: 'a', genre: 'aa', author_id: 2}

      return authors.find(author => author.id === +parent.author_id)
    }
  },
  Author: {
    books: (parent, args) => books.filter(book => book.author_id === +parent.id)
  },

  // MUTATION
  Mutation: {
    createAuthor: (parent, args) => args,
    createBook: (parent, args) => args
  }
}

module.exports = resolvers
