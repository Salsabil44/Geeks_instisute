import React from "react";
import { useSelector } from "react-redux";

export default function AgeDisplay() {
  const { value, loading } = useSelector((state) => state.age);

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <h2>Your Age</h2>
      <h1 style={{ fontSize: "4rem", color: "#b4e99fff" }}>
        {loading ? (
          <span
            style={{
              display: "inline-block",
              width: "30px",
              height: "30px",
              border: "4px solid #ccc",
              borderTop: "4px solid #007bff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></span>
        ) : (
          value
        )}
      </h1>
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}
