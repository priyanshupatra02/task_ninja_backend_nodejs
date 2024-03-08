const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const CreateError = require("../utils/app_err_util");

//signup user
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

//login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //1.check if existing user
    const user = await User.findOne({ email });
    //if no user found
    if (!user) {
      return next(new CreateError("User not found!", 404));
    }

    //2.check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //if password is not valid
    if (!isPasswordValid) {
      return next(new CreateError("Invalid password!", 401));
    }

    //if user and password is valid, assign a new JWT to user
    const token = jwt.sign({ _id: user._id }, "secretKey123", {
      expiresIn: "90d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  //   getAllUser,
  signup,
  login,
};
