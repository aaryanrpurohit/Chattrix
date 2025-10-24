"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Sidebar from "../../components/sidebar";

const Friends = () => {
  const { getToken } = useAuth();
  const [friendsChats, setFriendsChats] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getToken();

        console.log("Token:", token); // Debug log

        if (!token) {
          throw new Error("No authentication token available");
        }

        const res = await fetch("http://localhost:5000/api/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch friends: ${res.status}`);
        }

        const data = await res.json();
        setFriendsChats(data.friends || []);
        setFriendRequests(data.requests || []);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [getToken]);

  // Loading State
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center bg-[var(--color-bg)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
            <p className="text-[var(--color-text)]">Loading friends...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex h-screen overflow-hidden flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center bg-[var(--color-bg)]">
          <div className="text-center p-6 bg-[var(--color-surface)] rounded-xl shadow-lg max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Error Loading Friends
            </h2>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Navbar /> */}

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-auto p-4 flex flex-col md:flex-row gap-4">
          {/* Left: Friends Chats */}
          <div className="flex-1 bg-[var(--color-surface)] p-4 rounded-xl shadow overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">
              Friends Chats
            </h2>
            <ul className="space-y-3">
              {friendsChats.length === 0 ? (
                <div className="text-center mt-10">
                  <p className="text-gray-400 mb-2">No friends found</p>
                  <p className="text-sm text-gray-500">
                    Start connecting with people!
                  </p>
                </div>
              ) : (
                friendsChats.map((chat) => (
                  <li
                    key={chat._id || chat.id}
                    className="flex items-center p-3 bg-[var(--color-bg)] rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <img
                      src={chat.profileImageUrl || "/default-avatar.png"}
                      alt={`${chat.firstName} ${chat.lastName}`}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {chat.firstName} {chat.lastName}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {chat.lastMessage || "Say hi to your friend!"}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Right: Friend Requests */}
          <div className="md:w-80 flex-shrink-0 bg-[var(--color-surface)] p-4 rounded-xl shadow overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">
              Friend Requests
            </h2>
            <ul className="space-y-3">
              {friendRequests.length === 0 ? (
                <div className="text-center mt-10">
                  <p className="text-gray-400 mb-2">No requests</p>
                  <p className="text-sm text-gray-500">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                friendRequests.map((request) => (
                  <li
                    key={request._id || request.id}
                    className="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={request.profileImageUrl || "/default-avatar.png"}
                        alt={`${request.firstName} ${request.lastName}`}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                      <span className="truncate">
                        {request.firstName} {request.lastName}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        className="px-3 py-1 rounded bg-[var(--color-accent)] text-white text-sm hover:opacity-90 transition"
                        onClick={() => {
                          // Add accept logic here
                          console.log("Accept request:", request.id);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:opacity-90 transition"
                        onClick={() => {
                          // Add decline logic here
                          console.log("Decline request:", request.id);
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Friends;
