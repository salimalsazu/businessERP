import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StationaryItemController } from './stationaryItem.controller';
import { CourierValidation } from './stationaryItem.validations';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  // validateRequest(CourierValidation.createCourier),
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StationaryItemController.createStationaryItem
);
// ! Get all Orders----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StationaryItemController.getAllStationaryItem
);
// // ! Get all getStyleWiseNoOfCourier----------------------------------->>>
// router.get(
//   '/style-wise-courier',
//   auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
//   CourierController.getStyleWiseNoOfCourier
// );

// // ! Get Single Order----------------------------------->>>
// router.get(
//   '/:courierId',
//   auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
//   CourierController.getSingleCourier
// );
// // ! Update Order----------------------------------->>>
// router.patch(
//   '/update/:courierId',
//   validateRequest(CourierValidation.updateCourier),
//   auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
//   CourierController.updateCourierInformation
// );

export const StationaryItemRoutes = router;
