const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const CreateError = require("../utils/app_err_util");

const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    //check if user already exists
    if (user) {
      return next(new CreateError("User already exists!", 400));
    }
    //encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    //create new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //assign JWT to user
    const token = jwt.sign({ _id: newUser._id }, "secretKey123", {
      expiresIn: "90d",
    });

    //send the created user in the response
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  //   getAllUser,
  signup,
  // login,
};
