import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { RequisitionController } from './requisition.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RequisitionValidation } from './requisition.validations';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  validateRequest(RequisitionValidation.createRequisition),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  RequisitionController.createNewRequisition
);

// ! Get all Food Exp Month Wise----------------------------------->>>
router.get('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), RequisitionController.getRequisition);

export const RequisitionRoutes = router;
