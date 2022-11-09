const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods, repository
const mongoDataMethods = require('./repository/repository')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nghiemtuan:Aa%40123456@graphql.zqtqqie.mongodb.net/graphql?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected!!!')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

async function startServer() {
  await connectDB()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Truyen method db to resolver - param 3
    context: () => ({ mongoDataMethods })
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
