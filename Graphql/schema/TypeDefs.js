const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    password: String!
  }
  type Room {
    id: ID!
    name: String!
    password: String!
  }
  type Query {
    getUsers: [User]
    getUser: User
    getRooms: [Room]
    getRoom(id: ID!): Room
    logout: String
    deleteUser: String
  }
  type Mutation {
    addUser(
      username: String!
      password: String!
      confirmPassword: String!
    ): User!
    loginUser(username: String!, password: String!): User!
    addRoom(name: String!, password: String!): Room!
    deleteRoom(id: ID!, password: String!): String!
  }
`;

module.exports = typeDefs;
