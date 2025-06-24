import { LoaderIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
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

  if (auth === null)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <LoaderIcon className="w-7 h-7 text-indigo-600 animate-spin mr-2 inline-block" />
          </h2>
        </div>
      </div>
    );
  if (auth === false) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
