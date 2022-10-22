const mongoose = require("mongoose");
const User = require("./user");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A room must have a name!"],
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "A room must have an owner!"],
    ref: "User",
    index: true,
    sparse: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
