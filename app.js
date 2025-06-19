const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middlewares/error-handler");
require("dotenv").config();
const authRouter = require("./routers/auth");
const jobsRouter = require("./routers/jobs");
const PORT = process.env.PORT || 5000;
const connectDB = require("./connect/db");
const authenticateUser = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");
// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(express.json());
app.use(cors());
// app.use(xss());
app.use(helmet());
app.use(limiter);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Jobs API");
});
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
