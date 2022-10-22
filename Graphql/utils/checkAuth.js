const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (context) => {
  const token = context.req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    } catch (error) {
      throw new AuthenticationError("Invalid/Expired token!");
    }
  }
  throw new Error("A Token is Required!");
};
