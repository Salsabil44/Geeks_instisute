import React from "react";
import ErrorBoundary from "./Components/ErrorBoundary";
import BuggyCounter from "./Components/BuggyCounter";
import ColorLifecycle2 from "./Components/ColorLifecycle2";

function App() {
  return (
    <div>
      <div>
        <h1>Simulation 1: One ErrorBoundary for two counters</h1>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
      </div>

      <div>
        <h1>Simulation 2: Separate ErrorBoundaries for each counter</h1>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </div>

      <div>
        <h1>Simulation 3: No ErrorBoundary</h1>
        <BuggyCounter />
      </div>

      <div>
        <h1>Lifecycle Exercise #2: Unmounting</h1>
        <ColorLifecycle2 />
      </div>
    </div>
  );
}

export default App;

