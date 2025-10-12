
import React from "react";
import AgeDisplay from "./components/AgeDisplay";
import AgeControls from "./components/AgeControls";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fdfdfdff, #ecececff)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333" }}>Age Tracker</h1>
        <AgeDisplay />
        <AgeControls />
      </div>
    </div>
  );
}
