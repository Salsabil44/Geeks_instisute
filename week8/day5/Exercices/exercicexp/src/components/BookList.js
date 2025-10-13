import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
} from '../bookslice';

const BookList = () => {
  const [genre, setGenre] = useState('All');

  const allBooks = useSelector(selectBooks);
  const horrorBooks = useSelector(selectHorrorBooks);
  const fantasyBooks = useSelector(selectFantasyBooks);
  const sciFiBooks = useSelector(selectScienceFictionBooks);

  let displayedBooks;
  switch (genre) {
    case 'Horror':
      displayedBooks = horrorBooks;
      break;
    case 'Fantasy':
      displayedBooks = fantasyBooks;
      break;
    case 'Science Fiction':
      displayedBooks = sciFiBooks;
      break;
    default:
      displayedBooks = allBooks;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>📚 Book Inventory</h1>

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="All">All</option>
        <option value="Horror">Horror</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {displayedBooks.map((book) => (
          <li
            key={book.id}
            style={{
              background: '#f8f9fa',
              margin: '8px auto',
              padding: '10px',
              width: '300px',
              borderRadius: '8px',
              boxShadow: '0 0 5px rgba(0,0,0,0.1)',
            }}
          >
            <strong>{book.title}</strong> <br />
            <em>{book.author}</em> <br />
            <span style={{ color: '#555' }}>{book.genre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
