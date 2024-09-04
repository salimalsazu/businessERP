import express from 'express';
import { DashboardController } from './dashboard.controller';

const router = express.Router();

router.get(
  '/count',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  DashboardController.getSummeryController
);

export const DashboardRoutes = router;
