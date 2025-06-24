import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import LinkGrid from "../components/LinkGrid";
import AddLinkModal from "../components/AddLinkModal";

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(0);

  const handleAddNewLink = () => {
    setIsAddModalOpen(true);
  };

  const handleLinkAdded = () => {
    setIsAddModalOpen(false);
    setTriggerReload((prev) => prev + 1);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 overflow-x-hidden">
      <DashboardHeader onAddNewLink={handleAddNewLink} />

      <main className="container mx-auto px-6 py-8 overflow-x-hidden">
        <LinkGrid triggerReload={triggerReload} />
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
