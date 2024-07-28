import express from 'express';

import { FuelListController } from './fuelList.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FuelListController.createFuelList
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FuelListController.GetFuelList
);

router.patch('/:fuelListId', FuelListController.updateFuelList);

export const FuelListRoutes = router;
