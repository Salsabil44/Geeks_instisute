import express from 'express';
import booksRouter from './routes/books.js';

const app = express();
app.use(express.json());

// Mount the books router at /books
app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost${PORT}`);
});