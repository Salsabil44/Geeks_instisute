import React, { createContext, useState } from "react";

// Create the context
export const ThemeContext = createContext();

// Create a provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
