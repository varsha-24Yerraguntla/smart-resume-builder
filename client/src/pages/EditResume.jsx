import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditResume() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    summary: "",
  });

  // GET SINGLE RESUME
  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/resume`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const single = data.find((r) => r._id === id);
      if (single) setForm(single);
    };

    fetchResume();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE RESUME
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/resume/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    alert("Resume Updated Successfully");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl">

      <h2 className="text-2xl text-blue-400 mb-4">Edit Resume</h2>

      <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />
      <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />
      <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />

      <textarea name="education" value={form.education} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />
      <textarea name="skills" value={form.skills} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />
      <textarea name="experience" value={form.experience} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />
      <textarea name="summary" value={form.summary} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-700" />

      <button
        onClick={handleUpdate}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Update Resume
      </button>

    </div>
  );
}

export default EditResume;