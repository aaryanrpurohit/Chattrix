// app/loading.js
"use client";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "#3b82f6", // blue-500
        animation: "loadingLine 1s linear infinite"
      }}
    ></div>
  );
}
