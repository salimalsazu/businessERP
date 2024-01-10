import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { FoodRoutes } from '../modules/food/food.routes';
import { StationaryItemRoutes } from '../modules/stationaryItem/stationaryItem.routes';
import { StationaryListRoutes } from '../modules/stationarylist/stationarylist.routes';
import { AssetListRoutes } from '../modules/asset/asset.routes';
import { AssetAssignRoutes } from '../modules/assetAssign/assetAssign.routes';
import { FuelListRoutes } from '../modules/fuelList/fuelList.routes';

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
  {
    path: '/stationaryList',
    route: StationaryListRoutes,
  },
  {
    path: '/assetList',
    route: AssetListRoutes,
  },
  {
    path: '/assetAssign',
    route: AssetAssignRoutes,
  },
  {
    path: '/fuelList',
    route: FuelListRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
