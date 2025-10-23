"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

const Friends = () => {
  const { user } = useUser(); // Current user
  const [friendsChats, setFriendsChats] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch from backend
    const fetchFriends = async () => {
      try {
        const res = await fetch("/api/friends");
        const data = await res.json();
        setFriendsChats(data.friends);
        setFriendRequests(data.requests);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-auto p-4 flex flex-col md:flex-row gap-4">
          {/* Left: Friends Chats */}
          <div className="flex-1 bg-[var(--color-surface)] p-4 rounded-xl shadow overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">Friends Chats</h2>
            <ul className="space-y-3">
              {friendsChats.map((chat) => (
                <li
                  key={chat.id}
                  className="flex items-center p-3 bg-[var(--color-bg)] rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  <img
                    src={chat.profileImageUrl || "/default-avatar.png"}
                    alt={chat.firstName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{chat.firstName} {chat.lastName}</h3>
                    <p className="text-gray-400 text-sm">Say hi to your friend!</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Friend Requests */}
          <div className="md:w-80 flex-shrink-0 bg-[var(--color-surface)] p-4 rounded-xl shadow overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">Friend Requests</h2>
            <ul className="space-y-3">
              {friendRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={request.profileImageUrl || "/default-avatar.png"}
                      alt={request.firstName}
                      className="w-12 h-12 rounded-full"
                    />
                    <span>{request.firstName} {request.lastName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded bg-[var(--color-accent)] text-[var(--color-text)] text-sm">
                      Accept
                    </button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white text-sm">
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Friends;
