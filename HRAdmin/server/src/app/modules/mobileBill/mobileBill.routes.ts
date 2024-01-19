import express from 'express';

import { MobileBillController } from './mobileBill.controller';

const router = express.Router();

// ! Create New  List ------------------------------->>>
router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  MobileBillController.addMobileBill
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  MobileBillController.getMobileBill
);

export const MobileBillRoutes = router;
