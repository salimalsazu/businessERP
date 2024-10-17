import express from 'express';

import { AuthController } from './auth.controller';
import { AuthLoginLimiter } from '../../../shared/Limit';

const router = express.Router();

router.post(
  '/create-user',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AuthController.createNewUser
);

router.post('/login', AuthLoginLimiter, AuthController.userLogin);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
