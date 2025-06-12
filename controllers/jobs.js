const createJob = async (req, res) => {
  res.send("Create jobs");
};
const updateJob = async (req, res) => {
  res.send("edit ");
};
const deleteJob = async (req, res) => {
  res.send("delete");
};
const getJob = async (req, res) => {
  res.send("get a job");
};
const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getAllJobs,
};
