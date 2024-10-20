import express from 'express';
import { accountController } from './account.controller';

const router = express.Router();

router.get('/', accountController.getAccount);

router.get('/:accountName', accountController.getAccountByName);

export const accountRoutes = router;
