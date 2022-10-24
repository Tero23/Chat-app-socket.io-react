require("dotenv").config();
const cors = require("cors");
const express = require("express");
const colors = require("colors");
const { ApolloServer } = require("apollo-server-express");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: ["https://studio.apollographql.com", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const typeDefs = require("./schema/TypeDefs");
const resolvers = require("./schema/Resolvers");
const connectDB = require("./db/connection");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  graphiql: true,
  context: ({ req, res }) => ({ req, res }),
});

connectDB();

const port = 3002;

server.start().then(() => {
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });
  app.listen({ port }, () => console.log(`Server running at port: ${port}`));
});
