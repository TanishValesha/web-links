import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import LinkGrid from "../components/LinkGrid";
import AddLinkModal from "../components/AddLinkModal";

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNewLink = () => {
    setIsAddModalOpen(true);
  };

  const handleLinkAdded = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <DashboardHeader onAddNewLink={handleAddNewLink} />

      <main className="container mx-auto px-6 py-8">
        <LinkGrid />
      </main>

      <AddLinkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLinkAdded={handleLinkAdded}
      />
    </div>
  );
};

export default Dashboard;
