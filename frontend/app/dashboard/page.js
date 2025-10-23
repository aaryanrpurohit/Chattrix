import React from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { MessageSquare } from "lucide-react";

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-auto p-4 flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-400 text-center space-y-4 md:space-y-6">
            <MessageSquare className="h-40 w-40 md:h-60 md:w-60 text-[var(--color-accent)] mb-2 scale-x-[-1]" />
            <h2 className="text-2xl md:text-3xl font-bold">Welcome to Chat</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-xs md:max-w-md">
              Select a friend or a chat to get started.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
