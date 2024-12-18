const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter task name"],
    },

    content: {
      type: String,
      required: [true, "Please enter task content"],
    },
    deadline: {
      type: Date,
    },
    important: {
      type: String,
      default: "Không quan trọng",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task_list", TaskSchema);
module.exports = Task;
