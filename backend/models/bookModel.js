const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    pages: {
      type: Number,
      required: true,
    },
    read: {
      type: Number,
      required: true,
    },
    done: Boolean,
    notes: String,
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
