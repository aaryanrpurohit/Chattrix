"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

const GroupChatList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/groups"); // Replace with your backend endpoint
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">
            Your Groups
          </h2>

          <div className="flex flex-col gap-3">
            {groups.length === 0 ? (
              <p className="text-gray-400 text-center mt-10">No groups found</p>
            ) : (
              groups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={group.avatar || "/group-avatars/default.png"}
                      alt={group.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-gray-400 text-sm truncate w-60">
                        {group.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {group.timestamp
                      ? new Date(group.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : ""}
                  </span>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupChatList;
