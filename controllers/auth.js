const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const register = async (req, res) => {
  // await User.deleteMany({});
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ msg: "success" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!emailRegex.test(email) || !password) {
    throw new BadRequestError("provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ msg: `welcome back ${user.name}`, token: token });
};

module.exports = {
  register,
  login,
};
