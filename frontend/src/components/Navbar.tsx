import { Link } from "react-router-dom";
export default function Navbar({ user, onLogout }: { user: any, onLogout: () => void }) {
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-primary">PM App</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button onClick={onLogout} className="bg-primary text-white px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-primary">Login</Link>
        )}
      </div>
    </nav>
  );
}