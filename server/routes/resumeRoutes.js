const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");


// ✅ CREATE RESUME (POST)
router.post("/", async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    const saved = await newResume.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET ALL RESUMES (THIS IS STEP 1 FIX)
router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE RESUME
router.delete("/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;