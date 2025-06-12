const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("unauthorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.body = { userId: payload.userId, name: payload.name };
  } catch (error) {
    throw new UnauthenticatedError("unauthorized");
  }

  next();
};

module.exports = auth;
