import { accountRoutes } from '../modules/account/account.route';
import { authRoutes } from '../modules/auth/auth.route';
import { dashboardRoutes } from '../modules/dashboard/dashboard.route';
import { TransactionRoutes } from '../modules/transaction/transaaction.route';
import { userRoutes } from '../modules/user/user.route';

import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    routes: userRoutes
  },
  {
    path: '/auth',
    routes: authRoutes
  },
  {
    path: '/dashboard',
    routes: dashboardRoutes
  },
  {
    path: '/account',
    routes: accountRoutes
  },
  {
    path: '/transaction',
    routes: TransactionRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
