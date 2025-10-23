"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Video, Phone } from "lucide-react";

const CallsSection = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const res = await fetch("/api/calls"); // Replace with your backend endpoint
        const data = await res.json();

        // Sort by timestamp descending (most recent first)
        const sortedCalls = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setCalls(sortedCalls);
      } catch (err) {
        console.error("Failed to fetch calls:", err);
      }
    };

    fetchCalls();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">
            Recent Calls
          </h2>

          {calls.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No recent calls</p>
          ) : (
            <div className="flex flex-col gap-3">
              {calls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={call.avatar || "/avatars/default.png"}
                      alt={call.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{call.user}</h3>
                      <p className="text-gray-400 text-sm truncate w-60">
                        {call.type === "video" ? "Video Call" : "Voice Call"}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {call.timestamp
                      ? new Date(call.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                  <div className="ml-2">
                    {call.type === "video" ? (
                      <Video size={20} className="text-[var(--color-accent)]" />
                    ) : (
                      <Phone size={20} className="text-[var(--color-accent)]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CallsSection;
