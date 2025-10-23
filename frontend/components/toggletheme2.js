"use client"
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const currentTheme = document.documentElement.getAttribute("data-theme");

      if (currentTheme === "dark") {
        return true;
      }

      if (currentTheme === "light") {
        return false;
      }

      return true;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.setAttribute("data-theme", "light");
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="z-50">
      <button
        className="theme-button shadow-xl backdrop-blur-md bg-opacity-30 transition-all duration-300 ease-in-out"
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle theme"
      >
        {/* Sun Icon - Visible when Dark Theme is ACTIVE (isDark) */}
        <svg
          className={`icon sun-icon ${isDark ? 'active' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Moon Icon - Visible when Light Theme is ACTIVE (!isDark) */}
        <svg
          className={`icon moon-icon ${!isDark ? 'active' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
        </svg>
      </button>

      <style jsx="true">{`
        .theme-button {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .theme-button:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .theme-button:active {
          transform: scale(0.95);
        }

        .icon {
          position: absolute;
          width: 24px;
          height: 24px;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        /* Moon Icon (Light Mode Button) */
        .moon-icon {
          color: #c4b5fd;
          transform: rotate(180deg) scale(0);
          opacity: 0;
        }

        .moon-icon.active {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }

        /* Sun Icon (Dark Mode Button) */
        .sun-icon {
          color: #fcd34d;
          transform: rotate(-180deg) scale(0);
          opacity: 0;
        }

        .sun-icon.active {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }

        /* Theme application styles */
        :global(html) {
            transition: background-color 0.5s ease;
        }
        :global(html[data-theme="dark"]) {
            background-color: #1f2937;
            color: #f3f4f6;
        }
        :global(html[data-theme="light"]) {
            background-color: #f3f4f6;
            color: #1f2937;
        }
      `}</style>

    </div>
  );
}
