import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { FoodRoutes } from '../modules/food/food.routes';
import { StationaryItemRoutes } from '../modules/stationaryItem/stationaryItem.routes';
import { StationaryListRoutes } from '../modules/stationarylist/stationarylist.routes';
import { AssetListRoutes } from '../modules/asset/asset.routes';
import { AssetAssignRoutes } from '../modules/assetAssign/assetAssign.routes';
import { FuelListRoutes } from '../modules/fuelList/fuelList.routes';
import { VehicleRoutes } from '../modules/vehicle/vehicle.routes';
import { TransportDocRoutes } from '../modules/transportDoc/transport.routes';
import { MobileBillRoutes } from '../modules/mobileBill/mobileBill.routes';
import { MobileBalanceRoutes } from '../modules/mobileBalanceRequest/mobileBalance.routes';
import { RequisitionRoutes } from '../modules/requisition/requisition.routes';
import { AccountRoutes } from '../modules/account/account.routes';
import { TransactionRoutes } from '../modules/transaction/transaction.routes';

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
  {
    path: '/vehicle',
    route: VehicleRoutes,
  },
  {
    path: '/transportDoc',
    route: TransportDocRoutes,
  },
  {
    path: '/mobileBill',
    route: MobileBillRoutes,
  },
  {
    path: '/mobileBalanceLimit',
    route: MobileBalanceRoutes,
  },
  {
    path: '/requisition',
    route: RequisitionRoutes,
  },
  {
    path: '/account',
    route: AccountRoutes,
  },
  {
    path: '/transaction',
    route: TransactionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
