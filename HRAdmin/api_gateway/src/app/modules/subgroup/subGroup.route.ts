import express from 'express';

import { SubGroupController } from './subGroup.controller';

const router = express.Router();

router.post('/', SubGroupController.addSubGroup);

router.get('/', SubGroupController.getSubGroup);

export const SubGroupRoutes = router;
