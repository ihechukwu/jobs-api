const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middlewares/error-handler");
require("dotenv").config();
const authRouter = require("./routers/auth");
const jobsRouter = require("./routers/jobs");
const PORT = process.env.PORT || 5000;
const connectDB = require("./connect/db");
const authenticateUser = require("./middlewares/authentication");

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("Server listening at port ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
