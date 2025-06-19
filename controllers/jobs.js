const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createJob = async (req, res) => {
  // await Job.deleteMany({});
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new BadRequestError("Empty details");
  }
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true },
    { runValidators: true }
  );

  if (!job) {
    throw new NotFoundError("job does not exist");
  }
  res.status(StatusCodes.OK).json(job);
};
const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!job) {
    throw new NotFoundError("job does not exist");
  }
  res.status(StatusCodes.OK).send();
};
const getJob = async (req, res) => {
  const job = await Job.find({ _id: req.params.id, createdBy: req.user._id });
  if (job.length === 0) {
    return res.status(StatusCodes.OK).json({ msg: "no job" });
  }

  res.status(StatusCodes.OK).json(job);
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id });
  res.status(StatusCodes.OK).json({ status: "success", jobs });
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getAllJobs,
};
