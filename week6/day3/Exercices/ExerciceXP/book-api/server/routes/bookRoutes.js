import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';

const router = Router();

router.get('/', getAllBooks);           // GET /api/books
router.get('/:bookId', getBookById);   // GET /api/books/:bookId
router.post('/', createBook);          // POST /api/books
router.put('/:bookId', updateBook);    // PUT /api/books/:bookId
router.delete('/:bookId', deleteBook); // DELETE /api/books/:bookId

export default router;
