const mongoose = require("mongoose");
const { Schema } = mongoose;

const lectureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File", 
      },
    ],
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lecture", lectureSchema);
