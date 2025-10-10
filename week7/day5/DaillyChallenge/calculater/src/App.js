import React, { useState } from "react";

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers!");
      return;
    }

    let res;
    switch (operation) {
      case "add":
        res = a + b;
        break;
      case "subtract":
        res = a - b;
        break;
      case "multiply":
        res = a * b;
        break;
      case "divide":
        res = b !== 0 ? a / b : "Cannot divide by zero!";
        break;
      default:
        res = "Unknown operation";
    }
    setResult(res);
  };

  return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>🧮 React Calculator</h1>

      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
        style={{ padding: "10px", margin: "5px" }}
      />

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
        style={{ padding: "10px", margin: "5px" }}
      />

      <br />

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        style={{ padding: "10px", margin: "5px" }}
      >
        <option value="add">Addition (+)</option>
        <option value="subtract">Subtraction (-)</option>
        <option value="multiply">Multiplication (×)</option>
        <option value="divide">Division (÷)</option>
      </select>

      <br />

      <button
        onClick={calculate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Calculate
      </button>

      {result !== null && (
        <h2 style={{ marginTop: "20px" }}>
          Result: <span style={{ color: "#007BFF" }}>{result}</span>
        </h2>
      )}
    </div>
  );
}
