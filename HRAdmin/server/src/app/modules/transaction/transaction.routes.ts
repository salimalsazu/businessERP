import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TransactionValidation } from './transaction.validations';

const router = express.Router();

// ! Create New  Requisition ------------------------------->>>
router.post(
  '/',
  validateRequest(TransactionValidation.createTransaction),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  TransactionController.createNewTransaction
);

// ! Get all Requisition ----------------------------------->>>
router.get('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), TransactionController.getTransaction);

// ! Update Requisition ----------------------------------->>>

router.patch('/:transactionId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), TransactionController.updateTransaction);

export const TransactionRoutes = router;
