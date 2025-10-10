import React, { useRef, useState, useEffect } from "react";

export default function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleInput = () => {
      setCount(inputRef.current.value.length);
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("input", handleInput);
    
    return () => inputElement.removeEventListener("input", handleInput);
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "1rem",
          marginBottom: "10px",
        }}
      />
      <p>Character Count: {count}</p>
    </div>
  );
}
