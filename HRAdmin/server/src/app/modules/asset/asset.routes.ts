import express from 'express';

import { AssetListController, StationaryListController } from './asset.controller';

const router = express.Router();

// ! Create New  List ------------------------------->>>
router.post(
  '/',
  // validateRequest(CourierValidation.createCourier),
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AssetListController.createAssetItemList
);
// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AssetListController.GetAssetItemList
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

export const AssetListRoutes = router;
