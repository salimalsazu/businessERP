import express, { NextFunction, Request, Response } from 'express';

import { TransportDocController } from './trasnport.controller';
import { TransportValidation } from './transport.validations';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const router = express.Router();

// ! Create New List ------------------------------->>>

router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadFile.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TransportValidation.TransportDoc.parse(JSON.parse(req.body.data));
    console.log(req.body.data, 'requesting');
    return TransportDocController.createTransportDoc(req, res, next);
  }
);

// router.post(
//   '/',
//   // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
//   FileUploadHelper.uploadFile.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const requestData = JSON.parse(req.body.data);

//       req.body = TransportValidation.TransportDoc.parse(requestData);
//       console.log(requestData, 'requesting');
//       return TransportDocController.createTransportDoc(req, res, next);
//     } catch (error) {
//       return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid JSON format in the request body'));
//     }
//   }
// );

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  TransportDocController.getTransportDoc
);

export const TransportDocRoutes = router;
