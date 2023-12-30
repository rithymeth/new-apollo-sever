// server.js

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function startServer() {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
    resolvers,
    context: { prisma },
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 8080 }, () =>
    console.log(`Server ready at http://localhost:8080${server.graphqlPath}`)
  );
}

startServer().catch((error) => console.error(error));
