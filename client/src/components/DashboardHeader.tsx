import React from "react";
import { Button } from "../components/ui/button";
import { PlusIcon, LogOutIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onAddNewLink: () => void;
}

const DashboardHeader = ({ onAddNewLink }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Logout successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Logout failed.");
    }
    setIsLoading(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* App Name & Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-gray-900">LinkSaver</h2>
              <p className="text-sm text-gray-500">Organize your web links</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={onAddNewLink}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-sm transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New Link
            </Button>

            <Button
              variant="outline"
              disabled={isLoading}
              onClick={handleLogout}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging out...</span>
                </div>
              ) : (
                <>
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Logout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
