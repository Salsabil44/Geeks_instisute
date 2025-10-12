import React from "react";
import UserData from "./components/UserData";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 60 }}>
      <div style={{ width: 520 }}>
        <UserData />
      </div>
    </div>
  );
}

export default App;
