import express from 'express';

import { GroupController } from './group.controller';

const router = express.Router();

router.post('/', GroupController.addGroup);

router.get('/', GroupController.getGroup);

export const GroupRoutes = router;
