import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
function App() {
  const { token, user, saveAuth, logout } = useAuth();
  return (
    <Router>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/login" element={<Login saveAuth={saveAuth} />} />
        <Route path="/register" element={<Register saveAuth={saveAuth} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute token={token}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute token={token}>
            <Projects token={token} />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute token={token}>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
export default App;