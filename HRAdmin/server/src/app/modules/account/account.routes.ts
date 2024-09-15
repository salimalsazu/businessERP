import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AccountController } from './account.controller';
import { AccountValidation } from './account.validations';
import { UserRoles } from '@prisma/client';

const router = express.Router();

//! create Account ------------------------->>>

router.post(
  '/',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(AccountValidation.addAccount),
  AccountController.createAccount
);

// !  get all Users ------------------------------>>>
router.get(
  '/',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AccountController.getAllAccount
);

// !  get Account by Name ------------------------------>>>
router.get(
  '/:accountName',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  AccountController.getAccountByName
);

router.delete('/:accountId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), AccountController.deleteAccountController);



export const AccountRoutes = router;
