"use client";

export default function NotificationPanel({ notifications, markAsRead }) {
  const formatTime = (iso) => {
    const date = new Date(iso);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 text-[var(--color-accent)]">
        Notifications
      </h2>
      {notifications.length === 0 && (
        <p className="text-[var(--color-text)]">No notifications</p>
      )}
      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`flex items-center justify-between p-2 border rounded hover:bg-gray-800 ${
              n.read ? "" : "bg-gray-700 font-semibold"
            }`}
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: n.read ? "var(--color-surface)" : "#2a2a2a",
              color: "var(--color-text)",
              minHeight: "60px",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {n.type === "chat"
                  ? "💬"
                  : n.type === "game_invite"
                  ? "🎮"
                  : "👤"}
              </span>
              <div>
                <p>{n.message}</p>
                <small className="text-gray-400">{formatTime(n.timestamp)}</small>
              </div>
            </div>

            {n.type === "game_invite" && (
              <div className="flex gap-1">
                <button
                  className="px-2 py-1 rounded text-xs"
                  style={{ backgroundColor: "var(--color-accent)", color: "var(--color-text)" }}
                >
                  Accept
                </button>
                <button className="px-2 py-1 rounded text-xs bg-red-600 text-white">
                  Decline
                </button>
              </div>
            )}

            {!n.read && (
              <button
                onClick={() => markAsRead(n.id)}
                className="ml-2 text-xs text-gray-400 hover:text-white"
              >
                Mark read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
