"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Phone, Video } from "lucide-react";

const DMSection = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch("/api/friends"); // replace with your backend endpoint
        const data = await res.json();

        setFriends(data);
        if (data.length > 0) setSelectedFriend(data[0]); // select first friend by default
      } catch (err) {
        console.error("Failed to fetch friends:", err);
      }
    };

    fetchFriends();
  }, []);

  const startVoiceCall = () => {
    if (!selectedFriend) return;
    alert(`Start voice call with ${selectedFriend.name}`);
  };

  const startVideoCall = () => {
    if (!selectedFriend) return;
    alert(`Start video call with ${selectedFriend.name}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
          <div className="flex h-full">
            {/* Left: Friends list */}
            <div className="w-72 bg-[var(--color-surface)] border-r border-[var(--color-border)] overflow-auto">
              {friends.length === 0 ? (
                <p className="text-gray-400 text-center mt-4">No friends found</p>
              ) : (
                friends.map((friend) => (
                  <div
                    key={friend.id}
                    onClick={() => setSelectedFriend(friend)}
                    className={`flex items-center p-3 cursor-pointer hover:bg-[var(--color-accent)]/20 transition ${
                      selectedFriend?.id === friend.id ? "bg-[var(--color-accent)]/20" : ""
                    }`}
                  >
                    <img
                      src={friend.avatar || "/avatars/default.png"}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{friend.name}</h3>
                      <p className="text-gray-400 text-sm truncate">{friend.lastMessage || "No messages yet"}</p>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {friend.timestamp
                        ? new Date(friend.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Right: Chat window */}
            <div className="flex-1 flex flex-col">
              {selectedFriend ? (
                <div className="flex-1 flex flex-col">
                  {/* Chat Header with Call Buttons */}
                  <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedFriend.avatar || "/avatars/default.png"}
                        alt={selectedFriend.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <h2 className="text-xl font-bold">{selectedFriend.name}</h2>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={startVoiceCall}
                        className="p-2 rounded-full bg-[var(--color-accent)] hover:brightness-110"
                      >
                        <Phone size={20} className="text-[var(--color-bg)]" />
                      </button>
                      <button
                        onClick={startVideoCall}
                        className="p-2 rounded-full bg-[var(--color-accent)] hover:brightness-110"
                      >
                        <Video size={20} className="text-[var(--color-bg)]" />
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-auto flex flex-col gap-3">
                    {/* Replace this with backend fetched messages */}
                    <div className="self-start bg-[var(--color-surface)] p-3 rounded-xl max-w-xs">
                      Hello! This is a demo message.
                    </div>
                    <div className="self-end bg-[var(--color-accent)] text-[var(--color-bg)] p-3 rounded-xl max-w-xs">
                      Hi! Reply demo message.
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 p-3 rounded-l-xl bg-[var(--color-bg)] text-[var(--color-text)] outline-none"
                    />
                    <button className="bg-[var(--color-accent)] text-[var(--color-bg)] px-4 rounded-r-xl hover:brightness-110">
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Select a friend to start chatting
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DMSection;
