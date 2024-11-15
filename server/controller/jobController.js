import Job from "../model/jobModel.js";

export const create = async (req, res) => {
  try {
    const jobData = new Job(req.body);

    if (!jobData) {
      return res.status(404).json({ msg: "Job data not found!" });
    }

    const savedData = await jobData.save();
    res.status(200).json({msg:"Job added successfully"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const jobData = await Job.find();
    if (!jobData) {
      return res.status(404).json({ msg: "Job data not found" });
    }
    res.status(200).json(jobData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const jobExists = await Job.findById(id);
    if (!jobExists) {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(200).json(jobExists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const jobExists = await Job.findById(id);
    if (!jobExists) {
      return res.status(401).json({ msg: "Job not found" });
    }
    const updatedData = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({msg:"Job updated successfully"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const jobExists = await Job.findById(id);
    if (!jobExists) {
      return res.status(404).json({ msg: "Job doesnt exist" });
    }
    await Job.findByIdAndDelete(id);
    res.status(200).json({ msg: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
