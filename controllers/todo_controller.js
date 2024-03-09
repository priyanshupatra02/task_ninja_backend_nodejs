const Todo = require("../models/todo_model");
const CreateError = require("../utils/app_err_util");

//create todo
const createTodo = async (req, res, next) => {
  try {
    const { task, status } = req.body;
    const newTodo = await Todo.create({
      task: task,
      status: status,
    });
    res.status(201).json({
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};
//get all todos
//update todo
const updateTodo = async (req, res, next) => {
  try {
    // const { id } = req.params.id; // assuming the 'id' is passed as a parameter in the URL
    const { task, status } = req.body;
    const existingTodo = await Todo.findOne({ _id: req.params.id });
    if (!existingTodo) {
      return next(new CreateError("Todo not found!", 404));
    }
    existingTodo.task = task;
    existingTodo.status = status;
    const updatedTodo = await existingTodo.save();
    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

//delete todo

module.exports = {
  createTodo,
  updateTodo,
};
