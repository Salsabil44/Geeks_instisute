import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ageUpAsync, ageDownAsync } from "../age/ageSlice";

export default function AgeControls() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.age.loading);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 15 }}>
      <button
        onClick={() => dispatch(ageUpAsync())}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "1.1rem",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Age Up
      </button>

      <button
        onClick={() => dispatch(ageDownAsync())}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "1.1rem",
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Age Down
      </button>
    </div>
  );
}
