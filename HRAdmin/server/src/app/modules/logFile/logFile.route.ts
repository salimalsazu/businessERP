import express from 'express';
import { LogController } from './logFile.controller';

const router = express.Router();

router.get('/:type', LogController.getLogController);

export const LogRoute = router;
