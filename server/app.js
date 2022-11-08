const express = require('express')
const {ApolloServer} = require('apollo-server-express')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  await server.start();

  const app = express()
  server.applyMiddleware({ app })

  const PORT = 4000
  app.listen({port: PORT}, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}
startServer();
