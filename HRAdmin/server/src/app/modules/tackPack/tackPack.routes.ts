import { UserRoles } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { TackPackController } from './tackPack.controller';
import { TackPackValidation } from './tackPack.validations';

const router = express.Router();

// ! Create New  PPSubmission ------------------------------->>>

router.post(
  '/create-tack-pack',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadTackPackPdf.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TackPackValidation.createTackPack.parse(JSON.parse(req.body.data));
    return TackPackController.createTackPack(req, res, next);
  }
);
// ! get details
router.get('/get-tack-pack/:styleNo', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), TackPackController.getSingleTackPack);

// ! update tack pack
router.patch(
  '/update/:tackPackId',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.updateUploadTackPackPdf.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TackPackValidation.updateTackPack.parse(JSON.parse(req.body.data));
    return TackPackController.updateTackPack(req, res, next);
  }
);
export const TackPackRoutes = router;
