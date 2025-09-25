import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const books = [
  { id: 1, title: '1984', author: 'George Orwell', publishedYear: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
];

//  Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a book by ID
app.get('/api/books/:id', (req, res) => {
  const bookID = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookID);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// Add a new book
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1, // auto-increment
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
