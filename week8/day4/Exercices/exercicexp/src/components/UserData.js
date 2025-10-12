import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, clearUser } from "../user/userSlice";

export default function UserData() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>User Data (Redux Thunk)</h2>

      <div style={{ margin: 12 }}>
        <button
          onClick={() => dispatch(fetchUser())}
          style={{ padding: "8px 12px", marginRight: 8 }}
        >
          Fetch User
        </button>

        <button
          onClick={() => dispatch(clearUser())}
          style={{ padding: "8px 12px" }}
        >
          Clear
        </button>
      </div>

      {loading && <p>Loading user data...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <div style={{
          display: "inline-block",
          textAlign: "left",
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Username:</strong> {data.username}</p>
          <p><strong>City:</strong> {data.address?.city}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
        </div>
      )}
    </div>
  );
}
