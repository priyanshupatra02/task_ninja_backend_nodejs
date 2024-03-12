const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      task: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
