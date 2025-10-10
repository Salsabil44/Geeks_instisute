import React, { useState } from "react";
import { quotes } from "./quotes";

export default function App() {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A8"];
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [color, setColor] = useState(colors[0]);

  const generateRandomQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex);

    const newColor = colors[Math.floor(Math.random() * colors.length)];

    setCurrentQuoteIndex(newIndex);
    setColor(newColor);
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div style={{ 
      backgroundColor: color, 
      color: color, 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      transition: "all 0.5s" 
    }}>
      <div style={{ textAlign: "center", maxWidth: "600px", padding: "20px", borderRadius: "10px", backgroundColor: "#fff", color: "#000" }}>
        <h1 style={{ color: color }}>{currentQuote.text}</h1>
        <p style={{ fontStyle: "italic" }}>— {currentQuote.author}</p>
        <button 
          onClick={generateRandomQuote} 
          style={{ 
            backgroundColor: color, 
            color: "#fff", 
            padding: "10px 20px", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}
