"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Settings, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import NotificationPanel from "./NotificationPanel";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

//   Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:4000/notifications"); // Replace with your Node.js backend URL
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:4000/notifications/${id}/read`, {
        method: "POST",
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      {/* Search + Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-2 py-1 text-[var(--color-text)] flex-1 md:flex-none">
          <Search size={25} className="mx-2" />
          <input
            type="text"
            placeholder="Search..."
            className="p-2 bg-transparent outline-none text-[var(--color-text)] pr-15 placeholder:text-gray-400 w-full"
          />
        </div>

        <button
          className="md:hidden p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-accent)]/20 ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Right Icons */}
      <div
        className={`flex items-center space-x-4 mt-2 md:mt-0 ${
          mobileMenuOpen ? "flex flex-col md:flex-row md:items-center" : "hidden md:flex"
        }`}
      >
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-accent)]/20"
          >
            <Bell size={24} className="text-[var(--color-text)]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-[var(--color-text)] text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg z-50"
              >
                <NotificationPanel
                  notifications={notifications}
                  markAsRead={markAsRead}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-accent)]/20"
        >
          <Settings size={24} className="text-[var(--color-text)]" />
        </button>
      </div>
    </div>
  );
}
