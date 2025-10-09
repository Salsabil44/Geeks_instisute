import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./components/ErrorBoundary";

function HomeScreen() {
  return <h2 className="text-center mt-5">Welcome to the Home Page</h2>;
}

function ProfileScreen() {
  return <h2 className="text-center mt-5"> This is your Profile Page</h2>;
}

function ShopScreen() {
  throw new Error("Shop crashed!");
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            My React App
          </NavLink>
          <div className="navbar-nav">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
            <NavLink to="/shop" className="nav-link">
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/shop"
          element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}




import Example1 from "./components/Example1";
import Example2 from "./components/Example2";
import Example3 from "./components/Example3";
export default function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
<Example1 />
<Example2 />
<Example3 />
     
    </div>
  );
}



ex4


import React from "react";

export default function App() {
  const sendData = async () => {
    const url = "👉 COLLE ICI TON LIEN WEBHOOK 👈";

    const data = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("✅ Response:", result);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>POST JSON Data Example</h2>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}