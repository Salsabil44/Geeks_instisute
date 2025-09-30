import { Router } from 'express';
import { getAllUsers, getUserById, registerUser, loginUser, updateUser } from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);

export default router;
