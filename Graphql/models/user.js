const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Room = require("./room");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username!"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [8, "Password must be at least 8 characters long!"],
    select: false,
  },
  rooms: [
    {
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "A room must have an ID!"],
        ref: "Room",
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
