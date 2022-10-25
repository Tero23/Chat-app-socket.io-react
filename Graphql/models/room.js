const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A room must have a name!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A room must have a password!"],
    minlength: [8, "Password must be at least 8 characters long!"],
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: [true, "A room must have an owner!"],
  //   ref: "User",
  //   index: true,
  //   sparse: true,
  // },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
