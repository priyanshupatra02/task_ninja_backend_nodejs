const Todo = require("../models/todo_model");
const CreateError = require("../utils/app_err_util");

//create todo
const createTodo = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { task, status } = req.body;
    
    // if no body is passed, then ->
    if (!task || status === undefined) {
      return next(new CreateError("Please provide task and status", 400));
    }

    // Find the existing todo or create a new one if it doesn't exist
    const existingTodo = await Todo.findOne({ userId: userId });
    if (existingTodo) {
      existingTodo.tasks.push({
        task: task,
        status: status,
      });

      const savedTodo = await existingTodo.save();

      res.status(201).json({
        message: "New Todo created successfully",
        data: savedTodo,
      });
    } else {
      // If the 'todo' doesn't exist, create a new one
      const newTodo = await Todo.create({
        userId: userId,
        tasks: [{ task: task, status: status }],
      });
      res.status(201).json({
        message: "Todo created successfully",
        data: newTodo,
      });
    }
  } catch (error) {
    next(error);
  }
};
//get all todos
const getAllTodo = async (req, res, next) => {
  try {
    const allTodos = await Todo.find({});
    if (!allTodos) {
      return next(new CreateError("No Todos added yet!", 404));
    }

    res.status(200).json({
      message: "All Todos",
      data: allTodos,
    });
  } catch (error) {
    next(error);
  }
};
//update todo
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params.id; // assuming the 'id' is passed as a parameter in the URL
    const { task, status } = req.body;
    const existingTodo = await Todo.findOne(id);
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
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params.id; // assuming the 'id' is passed as a parameter in the URL
    const existingTodo = await Todo.findOne(id);
    if (!existingTodo) {
      return next(new CreateError("Todo not found!", 404));
    }
    const deletedTodo = await existingTodo.deleteOne(id);
    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
};
