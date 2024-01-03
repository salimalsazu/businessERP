import express from 'express';

import { StationaryListController } from './stationarylist.controller';

const router = express.Router();

// ! Create New  List ------------------------------->>>
router.post(
  '/',
  // validateRequest(CourierValidation.createCourier),
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StationaryListController.createStationaryList
);
// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StationaryListController.getAllStationaryList
);

// ! Create Stationary Assign----------------------------------->>>
router.post(
  '/assign',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StationaryListController.createStationaryAssignList
);

// ! Create Stationary Assign----------------------------------->>>
router.get(
  '/assign',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StationaryListController.getAllStationaryAssign
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

export const StationaryListRoutes = router;
