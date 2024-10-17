import express from 'express';
import { authController } from './user.controller';

const router = express.Router();

router.get('/get-users', authController.getUserController);
router.post('/create-user', authController.createUserController);
router.patch('/:id', authController.updateUserController);
router.delete('/:id', authController.deleteUserController);

export const authRoutes = router;
