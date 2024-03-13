const express = require("express");
const todoController = require("../controllers/todo_controller");
const verifyBearerToken = require("../middleware/auth_middleware");

const router = express.Router(); //create a router instance

//create todo
router.post("/:userId", verifyBearerToken, todoController.createTodo);
//get todo
router.get("/:userId", verifyBearerToken, todoController.getTodosByUserId);
// update todo
router.put("/:userId/:todoId", verifyBearerToken, todoController.updateTodo);
//delete todo
router.delete("/:userId/:todoId", verifyBearerToken, todoController.deleteTodo);
// router.delete("/todo/{id}", todoController.deleteTodo);

module.exports = router; //export the router instance
