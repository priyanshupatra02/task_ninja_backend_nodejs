const express = require("express");
const todoController = require("../controllers/todo_controller");

const router = express.Router(); //create a router instance

//get todo
// router.get("/todo", todoController.getTodos);
//create todo
router.post("/", todoController.createTodo);
// update todo
router.put("/:id", todoController.updateTodo);
//delete todo
router.delete("/:id", todoController.deleteTodo);
// router.delete("/todo/{id}", todoController.deleteTodo);

module.exports = router; //export the router instance
