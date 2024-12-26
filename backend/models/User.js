const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Instructor", "Student"],
      required: true,
      default: "Student",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
