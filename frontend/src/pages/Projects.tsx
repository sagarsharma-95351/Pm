import { useState, useEffect } from "react";
import API from "../api";
import ProjectCard from "../components/ProjectCard";
export default function Projects({ token }: { token: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    API.get("/projects", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProjects(res.data))
      .catch(() => {});
  }, [token]);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/projects", { name, description }, { headers: { Authorization: `Bearer ${token}` } });
      setProjects([res.data, ...projects]);
      setName("");
      setDescription("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Your Projects</h1>
      <form onSubmit={handleCreate} className="mb-8 flex gap-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" className="border p-2 rounded" required />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded" />
        <button className="bg-primary text-white px-4 py-2 rounded">Create</button>
      </form>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}