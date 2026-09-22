import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/context/authContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
