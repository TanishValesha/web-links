import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    fetch("https://your-backend.onrender.com/api/auth/me", {
      method: "GET",
      credentials: "include", // Needed for cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data: { authenticated: boolean }) => {
        setAuth(data.authenticated);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;
  if (auth === false) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
