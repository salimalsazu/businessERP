import { UserRoles } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { OrdersController } from './orders.controller';
import { OrdersValidation } from './orders.validations';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';

const router = express.Router();

// ! Create New  Order ------------------------------->>>

router.post(
  '/create-order',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadOrderPdf.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = OrdersValidation.createOrder.parse(JSON.parse(req.body.data));
    return OrdersController.createNewOrder(req, res, next);
  }
);
// ! Get all Orders----------------------------------->>>
router.get('/', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), OrdersController.getAllOrders);
router.get('/style-wise-orders', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), OrdersController.styleWiseOrderLists);
// ! Get Single Order----------------------------------->>>
router.get('/order-info/:orderNo', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), OrdersController.getSingleOrder);

// ! Update Order----------------------------------->>>
router.patch(
  '/update/:orderNo',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadOrderPdf.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = OrdersValidation.updateOrder.parse(JSON.parse(req.body.data));

    // JSON.parse(req.body.data);
    return OrdersController.updateOrder(req, res, next);
  }
);

// ! Get all Orders Length----------------------------------->>>
router.get('/count', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), OrdersController.getAllOrdersLength);

// ! Get all Orders Length----------------------------------->>>
router.get('/month', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), OrdersController.getBuyerEtdStatistics);

// ! Get all Orders Length----------------------------------->>>
router.get('/pc', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), OrdersController.getAllOrdersPC);

export const OrderRoutes = router;
