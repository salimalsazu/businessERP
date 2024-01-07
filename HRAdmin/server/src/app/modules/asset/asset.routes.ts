import express, { NextFunction, Request, Response } from 'express';

import { AssetListController } from './asset.controller';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { AssetValidation } from './asset.validations';

const router = express.Router();

// ! Create New  List ------------------------------->>>
router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadAssetImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AssetValidation.createAsset.parse(JSON.parse(req.body.data));

    console.log(req.body.data, 'req.body');
    return AssetListController.createAssetItemList(req, res, next);
  }
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
