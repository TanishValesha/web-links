import React from "react";
import { Button } from "../components/ui/button";
import { PlusIcon, LogOutIcon, LinkIcon } from "lucide-react";

interface DashboardHeaderProps {
  onAddNewLink: () => void;
}

const DashboardHeader = ({ onAddNewLink }: DashboardHeaderProps) => {
  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    console.log("Logout clicked");
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
            <div>
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
              onClick={handleLogout}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
