/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Foods, Prisma, User, UserFood } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { FoodExpRelationalFields, FoodExpRelationalFieldsMapper, FoodExpSearchableFields, StyleWiseCourierSearchableFields } from './food.constants';
import { ICourierUpdateRequest, IFoodExpCreateRequest, IFoodExpFilterRequest, IMonthlyFoodExpData, IStyleWiseCourier } from './food.interface';

// modules

// !----------------------------------Create New Courier---------------------------------------->>>
const createNewFoodExp = async (data: IFoodExpCreateRequest): Promise<Foods> => {
  // Check if the user exists
  const isUsersExist = await prisma.user.findMany({
    where: {
      userId: {
        in: data?.userFood,
      },
    },
  });

  if (!isUsersExist || isUsersExist.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  // Create userFood records
  const userFoodRecords = data?.userFood.map(userId => ({
    userId,
  }));

  console.log('userFoodRecords', userFoodRecords);

  // Calculate the count of meals
  const countMeal: number = data?.userFood?.length || 0;

  // Calculate daily employee cost and per meal rate
  const dailyEmployeeCost = data?.totalCost / 2;
  const perMealRate = dailyEmployeeCost / countMeal;

  // Prepare data for creating food expenses
  const foodExpenses = {
    totalCost: data?.totalCost,
    userFood: {
      create: userFoodRecords,
    },
    foodExpDate: data?.foodExpDate,
    totalMeal: countMeal,
    employeeCost: dailyEmployeeCost,
    mealRate: perMealRate,
  };

  // Create food expenses record
  const result = await prisma.foods.create({
    data: foodExpenses,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Food Exp');
  }

  return result;
};

// !----------------------------------get all Food Exp Daily---------------------------------------->>>
const getFoodExpDaily = async (filters: IFoodExpFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Foods[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.FoodsWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: FoodExpSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add date range condition if both startDate and endDate are provided

  if (startDate && endDate) {
    andConditions.push({
      foodExpDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (FoodExpRelationalFields.includes(key)) {
          return {
            [FoodExpRelationalFieldsMapper[key]]: {
              foodExpDate: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.FoodsWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.foods.findMany({
    include: {
      userFood: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.foods.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// !----------------------------------get all Food Exp Daily---------------------------------------->>>
const getFoodExpMonthly = async (filters: IFoodExpFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Foods[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.FoodsWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: FoodExpSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add date range condition if both startDate and endDate are provided

  if (startDate && endDate) {
    andConditions.push({
      foodExpDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (FoodExpRelationalFields.includes(key)) {
          return {
            [FoodExpRelationalFieldsMapper[key]]: {
              foodExpDate: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.FoodsWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.foods.findMany({
    include: {
      userFood: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.foods.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};



export const FoodExpService = {
  createNewFoodExp,
  getFoodExpDaily,
  getFoodExpMonthly
};

//  //logic

//  const dailyTotalMeal = await prisma.foods.findMany({});
//  const monthlyMeal = dailyTotalMeal.map((meal: any) => meal.totalMeal);
//  const monthlyEmployeeCost = dailyTotalMeal.map((meal: any) => meal.employeeCost);
//  // Count total matching orders for pagination
//  const monthlyTotalMeal = monthlyMeal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//  const monthlyEmployeeTotalCost = monthlyEmployeeCost.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//  const monthlyMealRate = monthlyEmployeeTotalCost / monthlyTotalMeal;

//  console.log('total', monthlyTotalMeal, monthlyEmployeeTotalCost, monthlyMealRate);
