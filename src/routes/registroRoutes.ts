import { Router } from 'express';
import {
  register,
  login,
  getRegistros,
  updateUser,
  deleteUser,
} from '../controllers/registroController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/', authMiddleware, getRegistros);
router.post('/', register);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
