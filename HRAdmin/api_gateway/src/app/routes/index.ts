import { authRoutes } from '../modules/user/user.route';

import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
