"use client";
import { useRouter } from "next/navigation";

export default function BackArrow({ to = "/" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(to)}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        backgroundColor: "white",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        zIndex: 1000,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.opacity = "0.9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.opacity = "1";
      }}
      aria-label="Go Back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="black"
        style={{ width: "22px", height: "22px" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}
