const graphql = require("graphql");
const User = require("../models/user");
const Room = require("../models/room");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    rooms: {
      type: new GraphQLList(RoomType),
      resolve(parent, args) {
        const rooms = Room.find({
          _id: parent.rooms.filter((room) => room._id === _id),
        });
        return rooms;
      },
    },
  }),
});

const RoomType = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    // members: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     const users = User.find({ rooms: { _id: parent._id } });
    //     return users;
    //   },
    // },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        let user = User.findOne({ _id: args.id });
        return user;
      },
    },
    room: {
      type: RoomType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const room = Room.findOne({ _id: args.id });
        return room;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        const users = User.find({});
        return users;
      },
    },
    rooms: {
      type: new GraphQLList(RoomType),
      resolve(parent, args) {
        const rooms = Room.find({});
        return rooms;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          password: args.password,
          confirmPassword: args.confirmPassword,
        });
        return user.save();
      },
    },
    addRoom: {
      type: RoomType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let user = await User.findById(args.userId);
        let room = new Room({ name: args.name });
        await room.save();
        user.rooms = user.rooms.concat({ roomId: room._id });
        user.save();
        return room;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      },
    },
    deleteRoom: {
      type: RoomType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Room.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
