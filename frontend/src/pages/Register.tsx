import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
export default function Register({ saveAuth }: { saveAuth: (token: string, user: any) => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      saveAuth(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" required className="w-full p-2 border rounded" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" value={form.password} onChange={handleChange} />
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-primary text-white px-4 py-2 rounded w-full">Register</button>
      </form>
      <div className="mt-4 text-sm">
        Already have an account? <a href="/login" className="text-primary">Login</a>
      </div>
    </div>
  );
}