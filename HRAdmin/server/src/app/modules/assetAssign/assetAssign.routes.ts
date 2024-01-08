import express from 'express';

import { AssetAssignController } from './assetAssign.controller';

const router = express.Router();

// ! Create New  List ------------------------------->>>
router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AssetAssignController.createAssetAssign
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AssetAssignController.GetAssetAssign
);

export const AssetAssignRoutes = router;
