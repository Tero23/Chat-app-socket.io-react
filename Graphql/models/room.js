const mongoose = require("mongoose");
const User = require("./user");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A room must have a name!"],
  },
  // members: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: [true, "A member must have an ID!"],
  //       ref: "User",
  //     },
  //   },
  // ],
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
