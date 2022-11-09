const resolvers = {
  // QUERY
  Query: {
    // Param3: context - get db methods - repository
    books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),
    book: async (parent, {id}, {mongoDataMethods}) => await mongoDataMethods.getBookById(id),

    authors: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllAuthors(),
    author: async (parent, {id}, {mongoDataMethods}) => await mongoDataMethods.getAuthorById(id),
  },
  Book: {
    author: async (parent, args, {mongoDataMethods}) => {
      // parent chinh la ket qua cua query cha {id: 1, name: 'a', genre: 'aa', author_id: 2}
      const {author_id} = parent

      return await mongoDataMethods.getAuthorById(author_id)
    }
  },
  Author: {
    books: async ({id}, args, {mongoDataMethods}) => await mongoDataMethods.getBooksByAuthorId(id)
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, {mongoDataMethods}) => mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, {mongoDataMethods}) => mongoDataMethods.createBook(args),
  }
}

module.exports = resolvers
