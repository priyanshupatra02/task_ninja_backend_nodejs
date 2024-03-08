const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
//import routes
const authRouter = require("./routes/auth_route");

dotenv.config();

// 1)MIDDLEWARES
//route middlewares for all other endpoints
app.use(cors()); //to allow cross origin requests
app.use(express.json());

// 2)ROUTING
app.use("/api/auth", authRouter);

// 3)MONGODB CONNECTION
const MONGO_URL =
  "mongodb+srv://priyanshu:something@task-ninja-backend.eaaeqyc.mongodb.net/?retryWrites=true&w=majority&appName=task-ninja-backend";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB 💚"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// 4)GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// 5)SERVER
const PORT = 3000;
app.listen(PORT, () =>
  console.log("Server is running at http://localhost:3000 🚀")
);
