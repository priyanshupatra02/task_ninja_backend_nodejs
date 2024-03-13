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
const getTodosByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const todosDetails = await Todo.findOne({
      userId: userId,
    });

    if (!todosDetails) {
      return next(new CreateError("No such user found!", 404));
    }

    if (!todosDetails.tasks || !Array.isArray(todosDetails.tasks)) {
      return res.status(404).json({
        message: "Todos not found for the user.",
      });
    }

    //map the array structure
    const mappedTodos = todosDetails.tasks.map((todos) => ({
      id: todos._id,
      task: todos.task,
      status: todos.status,
    }));

    return res.status(200).json({
      message: "Todos",
      todos: mappedTodos,
    });
  } catch (error) {
    next(error);
  }
};

//update todo
const updateTodo = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const todoIdToUpdate = req.params.todoId; // assuming the 'id' is passed as a parameter in the URL

    const { task, status } = req.body;
    const existingTodo = await Todo.findOne({ userId: userId });

    if (!existingTodo) {
      return next(new CreateError("Todo not found for the user!", 404));
    }

    //find the specific task to update
    const taskToUpdateIndex = existingTodo.tasks.findIndex(
      (task) => task._id.toString() === todoIdToUpdate
    );

    if (taskToUpdateIndex === -1) {
      return next(new CreateError("No such todo found for the user!", 404));
    }

    if (task && status) {
      existingTodo.tasks[taskToUpdateIndex].task = task;
      existingTodo.tasks[taskToUpdateIndex].status = status;
    } else if (task !== undefined && task !== null) {
      existingTodo.tasks[taskToUpdateIndex].task = task;
    } else if (status !== undefined && status !== null) {
      existingTodo.tasks[taskToUpdateIndex].status = status;
    }

    const updatedTodo = await existingTodo.save();

    res.status(200).json({
      message: "Todo updated successfully",
      todos: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

//delete todo
const deleteTodo = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const todoIdToDelete = req.params.todoId; // assuming the 'id' is passed as a parameter in the URL

    const existingTodo = await Todo.findOne({ userId: userId });

    if (!existingTodo) {
      return next(new CreateError("No such Todo found!", 404));
    }

    //find the specific task to delete
    const taskToDeleteIndex = existingTodo.tasks.findIndex(
      (task) => task._id.toString() === todoIdToDelete
    );

    if (taskToDeleteIndex === -1) {
      return next(new CreateError("No such todo found for the user!", 404));
    }
    // Remove the specific semester from the array
    existingTodo.tasks.splice(taskToDeleteIndex, 1);
    const updatedTodo = await existingTodo.save();

    res.status(200).json({
      message: "Todo deleted successfully",
      todos: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
};
