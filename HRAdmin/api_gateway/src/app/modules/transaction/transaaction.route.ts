import express from 'express';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router.post('/', TransactionController.addTransaction);

router.get('/:transactionId', TransactionController.getSingleTransaction);

export const TransactionRoutes = router;
