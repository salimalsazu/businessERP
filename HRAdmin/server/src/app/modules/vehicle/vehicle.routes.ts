import express from 'express';

import { VehicleController } from './vehicle.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  VehicleController.addVehicle
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  VehicleController.GetVehicle
);

export const VehicleRoutes = router;
