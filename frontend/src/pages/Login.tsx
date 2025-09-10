import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
export default function Login({ saveAuth }: { saveAuth: (token: string, user: any) => void }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      saveAuth(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" value={form.password} onChange={handleChange} />
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-primary text-white px-4 py-2 rounded w-full">Login</button>
      </form>
      <div className="mt-4 text-sm">
        Don’t have an account? <a href="/register" className="text-primary">Sign up</a>
      </div>
    </div>
  );
}