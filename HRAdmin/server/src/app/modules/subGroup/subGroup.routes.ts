import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubGroupValidation } from './subGroup.validations';
import { SubGroupController } from './subGroup.controller';

const router = express.Router();

//! create Account ------------------------->>>

router.post(
  '/',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(SubGroupValidation.addSubGroup),
  SubGroupController.createSubGroup
);

// !  get all Users ------------------------------>>>
router.get(
  '/',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  SubGroupController.getAllSubGroups
);

export const SubGroupRoutes = router;
