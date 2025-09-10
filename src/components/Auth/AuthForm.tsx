import React, { useState } from "react";

type AuthMode = "login" | "signup" | "reset";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setMessage("");
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API calls
    if (mode === "signup" && form.password !== form.confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setMessage(mode === "login" ? "Logged in!" : mode === "signup" ? "Account created!" : "Password reset link sent!");
  };

  return (
    <div className="auth-form-container">
      <div className="auth-tabs">
        <button className={mode === "login" ? "active" : ""} onClick={() => switchMode("login")}>Login</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => switchMode("signup")}>Sign Up</button>
        <button className={mode === "reset" ? "active" : ""} onClick={() => switchMode("reset")}>Forgot Password</button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        )}
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        {mode !== "reset" && (
          <>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="button" className="show-hide" onClick={() => setShowPassword((s) => !s)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </>
        )}
        {mode === "signup" && (
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        )}
        <button type="submit">
          {mode === "login" ? "Login" : mode === "signup" ? "Sign Up" : "Send Reset Link"}
        </button>
        {message && <div className="auth-message">{message}</div>}
      </form>
      <style>{`
        .auth-form-container { max-width: 350px; margin: 2rem auto; padding: 2rem; box-shadow: 0 2px 12px #0001; border-radius: 10px; background: #fff;}
        .auth-tabs { display: flex; gap: 1rem; margin-bottom: 1rem;}
        .auth-tabs button { flex: 1; padding: 0.5rem; background: #eee; border: none; border-radius: 4px 4px 0 0; cursor: pointer;}
        .auth-tabs .active { background: #007bff; color: #fff;}
        .auth-form { display: flex; flex-direction: column; gap: 0.8rem;}
        .auth-form input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;}
        .show-hide { margin-left: auto; margin-bottom: -0.5rem; background: none; border: none; color: #007bff; cursor: pointer;}
        .auth-message { margin-top: 1rem; color: #007bff;}
      `}</style>
    </div>
  );
};

export default AuthForm;