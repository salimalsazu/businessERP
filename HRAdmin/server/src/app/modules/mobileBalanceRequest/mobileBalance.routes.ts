import express from 'express';

import { MobileBalanceLimitController } from './mobileBalance.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';

const router = express.Router();

// ! Create New  List ------------------------------->>>
router.post('/', auth(UserRoles.SUPERADMIN), MobileBalanceLimitController.addMobileBalanceLimit);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  MobileBalanceLimitController.getMobileBalanceLimit
);

export const MobileBalanceRoutes = router;
