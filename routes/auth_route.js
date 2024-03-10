const express = require("express");
const authController = require("../controllers/auth_controller");

const router = express.Router(); //create a router instance

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router; //export the router instance
