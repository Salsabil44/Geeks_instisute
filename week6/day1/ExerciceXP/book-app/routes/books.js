import express from 'express';

const router = express.Router();
let books = [];
let nextId = 1;

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Get a book by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(b => b.id === Number(id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Add a new book
router.post('/', (req, res) => {
  const book = { id: nextId++, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

// Update a book by ID
router.put("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  Object.assign(book, req.body);
  res.json(book);
});

// Delete a book by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === Number(id));
  if (index !== -1) {
    const deleted = books.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

export default router;