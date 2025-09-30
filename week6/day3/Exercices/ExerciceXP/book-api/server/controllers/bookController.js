import BookModel from '../models/bookModel.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.getAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const id = parseInt(req.params.bookId);
    const book = await BookModel.getById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newBook = await BookModel.create({ title, author, publishedYear });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = parseInt(req.params.bookId);
    const { title, author, publishedYear } = req.body;
    const updatedBook = await BookModel.update(id, { title, author, publishedYear });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = parseInt(req.params.bookId);
    const deletedBook = await BookModel.delete(id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
