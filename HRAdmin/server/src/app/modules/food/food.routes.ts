import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FoodExpController } from './food.controller';
import { CourierValidation } from './food.validations';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  // validateRequest(CourierValidation.createCourier),
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FoodExpController.createNewFoodExp
);

// ! Get all Food Exp Month Wise----------------------------------->>>
router.get('/daily', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), FoodExpController.getFoodExpDaily);

// ! Get all Food Exp Day Wise-s---------------------------------->>>
router.get('/monthly', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), FoodExpController.getAllFoodExpMonthly);

// ! Get all getStyleWiseNoOfCourier----------------------------------->>>
// router.get('/daywise', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), CourierController.getStyleWiseNoOfCourier);

// ! Get Single Order----------------------------------->>>
// router.get('/:courierId', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), CourierController.getSingleCourier);

// ! Update Order----------------------------------->>>
// router.patch(
//   '/update/:courierId',
//   validateRequest(CourierValidation.updateCourier),
//   auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
//   CourierController.updateCourierInformation
// );

export const FoodRoutes = router;
