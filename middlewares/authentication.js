const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   throw new UnauthenticatedError("unauthorized");
  // }
  // const token = authHeader.split(" ")[1];

  const token = req.cookies.token;
  if (!token || token === "logout") {
    throw new UnauthenticatedError("unauthorized");
  }
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;
    // req.user = { userId: payload.userId, name: payload.name };
  } catch (error) {
    throw new UnauthenticatedError("unauthorized");
  }

  next();
};

module.exports = auth;
