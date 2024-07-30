import express, { NextFunction, Request, Response } from 'express';

import { TransportDocController } from './trasnport.controller';
import { TransportValidation } from './transport.validations';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';


const router = express.Router();

// ! Create New List ------------------------------->>>

router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadFile.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TransportValidation.TransportDoc.parse(JSON.parse(req.body.data));
    return TransportDocController.createTransportDoc(req, res, next);
  }
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  TransportDocController.getTransportDoc
);

router.patch(
  '/:transportDocId',
  // auth(UserRoles.SUPERADMIN),
  FileUploadHelper.uploadFile.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TransportValidation.TransportUpdateDoc.parse(JSON.parse(req.body.data));

    return TransportDocController.updateTransportDoc(req, res, next);
  }
);

export const TransportDocRoutes = router;
