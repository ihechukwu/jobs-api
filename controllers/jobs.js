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
  res.send("edit ");
};
const deleteJob = async (req, res) => {
  res.send("delete");
};
const getJob = async (req, res) => {
  const job = await Job.find({ _id: req.params.id, createdBy: req.user._id });

  res.status(StatusCodes.OK).json(job);
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id });
  res.status(StatusCodes.OK).json(jobs);
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getAllJobs,
};
