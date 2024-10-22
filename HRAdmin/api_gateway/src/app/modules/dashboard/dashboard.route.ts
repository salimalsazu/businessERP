import express from 'express';
import { dashboardController } from './dashboard.controller';
import exp from 'constants';

const router = express.Router();

router.get('/count', dashboardController.getAllSummery);

router.get('/daily-transaction', dashboardController.getDailyTransactionCount);

export const dashboardRoutes = router;
