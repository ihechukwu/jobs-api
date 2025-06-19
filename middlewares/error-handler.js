const { StatusCodes } = require("http-status-codes");
// const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = async (err, req, res, next) => {
  // console.log(err);

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong, please try again later",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.code && err.code === 11000) {
    customError.msg = "Email already taken";
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `no job with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

module.exports = errorHandlerMiddleware;
