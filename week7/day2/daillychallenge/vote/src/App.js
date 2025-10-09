import React, { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  const addVote = (index) => {
    const newLanguages = [...languages];
    newLanguages[index].votes += 1;
    setLanguages(newLanguages);
  };

  return (
    <div>
      <h1>Vote Your Favorite Language</h1>
      {languages.map((lang, index) => (
        <div key={index}>
          <span>{lang.name}: {lang.votes} votes </span>
          <button onClick={() => addVote(index)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default App;
