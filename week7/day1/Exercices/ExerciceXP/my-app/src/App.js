// App.js
import React from 'react';
import UserFavoriteAnimals from './UserFavoriteAnimals';
import Exercise from './Exercise3';

function App() {
  // --- Exercise 1 ---
  const helloMessage = <p>Hello World!</p>;
  const myElement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;

  // --- Exercise 2 ---
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      {/* === Exercise 1: JSX Basics === */}
      <section>
        {helloMessage}
        {myElement}
        <p>React is {sum} times better with JSX</p>
      </section>

      {/* === Exercise 2: Props & Class Component === */}
      <section style={{ marginTop: '30px' }}>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>

      {/* === Exercise 3: HTML Tags & CSS === */}
      <section style={{ marginTop: '40px' }}>
        <Exercise />
      </section>
    </div>
  );
}

export default App;
