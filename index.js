const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB = "mongodb://localhost:27017";

// Apollo Server
//typeDefs: GraphQL Type Definitions
//resolvers: How do we resolve queries / mutations

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb Connection successful");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });
