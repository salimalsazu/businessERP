import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { NotificationRoutes } from '../modules/notification/notification.routes';

import { UserRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
