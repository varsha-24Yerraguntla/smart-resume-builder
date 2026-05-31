import { useEffect, useState } from "react";
import jsPDF from "jspdf";

function Dashboard() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setResumes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteResume = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/resume/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchResumes();
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPDF = (resume) => {
    const doc = new jsPDF();

    doc.text("RESUME", 10, 10);
    doc.text(`Name: ${resume.name}`, 10, 30);
    doc.text(`Email: ${resume.email}`, 10, 40);
    doc.text(`Phone: ${resume.phone}`, 10, 50);
    doc.text(`Education: ${resume.education}`, 10, 60);
    doc.text(`Skills: ${resume.skills}`, 10, 70);
    doc.text(`Experience: ${resume.experience}`, 10, 80);
    doc.text(`Summary: ${resume.summary}`, 10, 90);

    doc.save(`${resume.name}_resume.pdf`);
  };

  // 🚀 ATS SCORE FUNCTION (ADDED)
  const calculateATS = (resume) => {
    let score = 0;

    if (resume.name) score += 10;
    if (resume.email) score += 10;
    if (resume.phone) score += 10;
    if (resume.education) score += 10;
    if (resume.skills) score += 20;
    if (resume.experience) score += 20;
    if (resume.summary) score += 10;

    const keywords = ["react", "node", "express", "mongodb", "javascript"];

    keywords.forEach((k) => {
      if (resume.skills?.toLowerCase().includes(k)) {
        score += 5;
      }
    });

    return Math.min(score, 100);
  };

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        My Resume Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {resumes.map((r) => (
          <div
            key={r._id}
            className="bg-gray-800 p-5 rounded-xl shadow-lg"
          >

            {/* NAME */}
            <h2 className="text-xl font-bold text-blue-400">
              {r.name}
            </h2>

            {/* ATS SCORE */}
            <p className="text-green-400 font-bold mt-1">
              ATS Score: {calculateATS(r)} / 100
            </p>

            <p>{r.email}</p>
            <p>{r.phone}</p>

            <p className="text-sm mt-2">
              <b>Education:</b> {r.education}
            </p>

            <p className="text-sm">
              <b>Skills:</b> {r.skills}
            </p>

            <p className="text-sm">
              <b>Experience:</b> {r.experience}
            </p>

            <p className="text-gray-300 text-sm mt-2">
              {r.summary}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-3 flex-wrap">

              <button
                onClick={() => window.location.href = `/edit/${r._id}`}
                className="bg-yellow-500 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => downloadPDF(r)}
                className="bg-green-500 px-3 py-1 rounded text-sm"
              >
                PDF
              </button>

              <button
                onClick={() => deleteResume(r._id)}
                className="bg-red-500 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;