import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { FoodRoutes } from '../modules/food/food.routes';
import { StationaryItemRoutes } from '../modules/stationaryItem/stationaryItem.routes';

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
    path: '/foods',
    route: FoodRoutes,
  },
  {
    path: '/item',
    route: StationaryItemRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
