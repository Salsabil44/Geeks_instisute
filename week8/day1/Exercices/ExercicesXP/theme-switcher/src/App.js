import React from "react";
import { ThemeProvider } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import "./index.css";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>React Theme Switcher</h1>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
