import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ token, children }: { token: string, children: JSX.Element }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}