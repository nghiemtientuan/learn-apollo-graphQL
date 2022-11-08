const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nghiemtuan:Aa@123456@graphql.zqtqqie.mongodb.net/?retryWrites=true&w=majority', {
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
