const express = require("express");
const todoController = require("../controllers/todo_controller");

const router = express.Router(); //create a router instance

//create todo
router.post("/:userId", todoController.createTodo);
//get todo
router.get("/", todoController.getAllTodo);
// update todo
router.put("/:id", todoController.updateTodo);
//delete todo
router.delete("/:id", todoController.deleteTodo);
// router.delete("/todo/{id}", todoController.deleteTodo);

module.exports = router; //export the router instance
