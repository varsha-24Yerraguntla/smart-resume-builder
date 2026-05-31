const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate-summary", async (req, res) => {
  try {
    const { skills, education, experience } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Create a professional ATS resume summary:

Skills: ${skills}
Education: ${education}
Experience: ${experience}

Make it strong, professional and job-ready.
          `,
        },
      ],
    });

    res.json({
      summary: response.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;