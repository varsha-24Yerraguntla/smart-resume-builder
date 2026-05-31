const Resume = require("../models/Resume");

// CREATE resume
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user resumes
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createResume, getResumes };