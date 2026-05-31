import { Routes, Route, Link } from "react-router-dom";
import ResumeForm from "./pages/ResumeForm";
import Dashboard from "./pages/Dashboard";
import EditResume from "./pages/EditResume";

function App() {
  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
        <h1 className="text-xl font-bold text-blue-400">
          Resume Builder
        </h1>

        <div className="space-x-4">
          <Link className="hover:text-blue-400" to="/">Form</Link>
          <Link className="hover:text-blue-400" to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      {/* ROUTES */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<ResumeForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditResume />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;