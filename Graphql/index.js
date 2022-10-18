const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const db = require("./db/connection");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3002, () => {
  console.log("Graphql server is up and running at port 3002...");
});
