import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { SalaryController } from './salary.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SalaryValidation } from './salary.validations';

const router = express.Router();

// ! Create New  Requisition ------------------------------->>>
router.post(
  '/',
  validateRequest(SalaryValidation.createSalary),
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  SalaryController.createSalary
);

// ! Get all Requisition ----------------------------------->>>
router.get('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), SalaryController.getSalary);

// ! Update Requisition ----------------------------------->>>

router.patch(
  '/:salaryId',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  SalaryController.updateSalary
);

export const SalaryRoutes = router;
