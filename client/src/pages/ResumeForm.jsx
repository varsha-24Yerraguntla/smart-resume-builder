import { useState } from "react";

function ResumeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    summary: "",
  });

  // AI GENERATE (mock logic for now)
  const generateAI = () => {
    const aiText = `Highly motivated candidate with skills in ${form.skills}. 
Strong background in ${form.education}. 
Experience level: ${form.experience}. 
Eager to contribute and grow in a professional environment.`;

    setForm({ ...form, summary: aiText });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-5 text-blue-400">
        Create Resume
      </h2>

      <div className="grid gap-3">

        <input name="name" onChange={handleChange} className="p-2 rounded bg-gray-700" placeholder="Name" />
        <input name="email" onChange={handleChange} className="p-2 rounded bg-gray-700" placeholder="Email" />
        <input name="phone" onChange={handleChange} className="p-2 rounded bg-gray-700" placeholder="Phone" />

        <textarea name="education" onChange={handleChange} className="p-2 rounded bg-gray-700" placeholder="Education"></textarea>
        <textarea name="skills" onChange={handleChange} className="p-2 rounded bg-gray-700" placeholder="Skills"></textarea>
        <textarea name="experience" onChange={handleChange} className="p-2 rounded bg-gray-700" placeholder="Experience"></textarea>

        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
          placeholder="Summary"
        ></textarea>

        {/* AI BUTTON */}
        <button
          onClick={generateAI}
          className="bg-purple-500 py-2 rounded hover:bg-purple-600"
        >
          🤖 Generate AI Summary
        </button>

        <button className="bg-blue-500 py-2 rounded hover:bg-blue-600">
          Save Resume
        </button>

      </div>
    </div>
  );
}

export default ResumeForm;