require("dotenv").config();
const User = require("../models/user");
const Room = require("../models/room");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../utils/checkAuth");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const resolvers = {
  Query: {
    async getUsers(_, __) {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error(error.message, 400);
      }
    },
    async getUser(_, __, context) {
      try {
        const user = checkAuth(context);
        console.log(user);
        return user;
      } catch (error) {
        throw new Error(error.message, 400);
      }
    },
    async getRoom(_, { id }) {
      try {
        const room = await Room.findById(id);
        return room;
      } catch (error) {
        throw new Error(error.message, 400);
      }
    },
    async getRooms(_, __) {
      try {
        const rooms = await Room.find({});
        return rooms;
      } catch (error) {
        throw new Error(error.message, 400);
      }
    },
    logout(_, __, { req, res }) {
      res
        .cookie("token", "choulouloupppouppaaa", { maxAge: 1 })
        .cookie("id", "choulouloupppoupppaaaa", { maxAge: 1 });
      return "Logged Out Successfully!";
    },
    async deleteUser(parent, args, context) {
      const user = await checkAuth(context);
      if (!user) throw new Error("Not Allowed!");
      // await Room.deleteMany({ owner: user.id });
      await User.findByIdAndRemove(user.id);
      return `${user.username} deleted successfully!`;
    },
  },
  Mutation: {
    async loginUser(parent, { username, password }, { req, res }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "Wrong Credentials!";
        throw new UserInputError("Wrong Credentials!");
      }
      const match = await user.correctPassword(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials!";
        throw new UserInputError("Wrong Credentials!");
      }
      const token = generateToken(user);
      res
        .cookie("token", token, {
          maxAge: 5 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("id", user.id, {
          maxAge: 5 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
      return {
        ...user._doc,
        id: user._id,
      };
    },
    async addUser(
      parent,
      { username, password, confirmPassword },
      { req, res },
      info
    ) {
      // Validate user data
      // Make sure user doesn't already exist
      // hash password and create auth token
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken!", {
          errors: {
            usrname: "This username is taken!",
          },
        });
      }
      const newUser = new User({
        username,
        password,
        confirmPassword,
      });

      user = await newUser.save();
      const token = generateToken(user);
      res
        .cookie("token", token, {
          maxAge: 5 * 60 * 60 * 1000,
          // httpOnly: true,
          sameSite: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("id", user.id, {
          maxAge: 5 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });

      return {
        ...user._doc,
        id: user._id,
      };
    },
    async addRoom(parent, { name, password }, context) {
      // const user = await checkAuth(context);
      // if (!user) throw new Error("Not Allowed!");
      const room = new Room({
        name,
        password,
        // owner: user.id,
      });
      const result = await room.save();
      // const owner = await User.findById(user.id);
      // owner.rooms = owner.rooms.concat({ roomId: room._id });
      // await owner.save();
      return {
        ...result._doc,
        id: result._id,
      };
    },
    async deleteRoom(parent, { id, password }, context) {
      const user = await checkAuth(context);
      if (!user) throw new Error("Not Allowed!");
      // const owner = await User.findById(user.id);
      // owner.rooms = owner.rooms.filter(
      //   (roomObj) => roomObj.roomId.toString() !== id
      // );
      // await owner.save();
      const room = await Room.findByIdAndRemove(id);
      return `Room ${room.name} deleted successfull!`;
    },
  },
};

module.exports = resolvers;
