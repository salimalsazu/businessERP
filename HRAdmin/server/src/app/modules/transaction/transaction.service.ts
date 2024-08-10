/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Requisition, Transaction } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ITransactionCreateRequest, ITransactionFilterRequest } from './transaction.interface';
import { TransactionRelationalFields, TransactionRelationalFieldsMapper, TransactionSearchableFields } from './transaction.constants';
import { generateTransactionId } from './trIdAutoIncrement';

// modules
// !----------------------------------Create New Courier---------------------------------------->>>
// const createTransaction = async (data: ITransactionCreateRequest): Promise<Transaction> => {
//   // Check if account exist
//   const isAccountExist = await prisma.account.findUnique({
//     where: {
//       accountId: data.accountId,
//     },
//   });

//   if (!isAccountExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
//   }

//   // const trAutoIncrement = isAccountExist.accountName + Math.floor(Math.random() * 1000) + 1;

//   const trAutoIncrement = generateTransactionId(isAccountExist.accountName);

//   //create transaction record
//   const dataObj = {
//     transactionDate: data.transactionDate,
//     transactionType: data.transactionType,
//     transactionAmount: data.transactionAmount,
//     transactionDescription: data.transactionDescription,
//     trId: trAutoIncrement,
//     accountId: data.accountId,
//   };

//   // Create food expenses record
//   const result = await prisma.transaction.create({
//     data: dataObj,
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Transaction');
//   }

//   return result;
// };

const createTransaction = async (data: ITransactionCreateRequest): Promise<any> => {
  // Check if account exists
  const isAccountExist = await prisma.account.findUnique({
    where: {
      accountId: data.accountId,
    },
  });

  if (!isAccountExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
  }

  // Generate transaction ID
  const trAutoIncrement = generateTransactionId(isAccountExist.accountName);

  // Create transaction record
  const dataObj = {
    transactionDate: data.transactionDate,
    transactionType: data.transactionType,
    transactionAmount: data.transactionAmount,
    transactionDescription: data.transactionDescription,
    trId: trAutoIncrement,
    accountId: data.accountId,
  };

  // Create transaction record in database
  const result = await prisma.transaction.create({
    data: dataObj,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Transaction');
  }

  // Fetch current balance
  const account = await prisma.account.findUnique({
    where: {
      accountId: data.accountId,
    },
  });

  if (!account) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
  }

  // Calculate new closing balance
  const closingBalance = (account.closingBalance || 0) + data.transactionAmount; // Assuming deduction for the transaction

  // Update account with new balance
  const accountBalanceUpdate = await prisma.account.update({
    where: {
      accountId: data.accountId,
    },
    data: {
      closingBalance: closingBalance,
    },
  });

  if (!accountBalanceUpdate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update account balance');
  }

  // Return the result with closing balance
  return {
    statusCode: 200,
    success: true,
    message: 'Transaction successfully',
    data: {
      ...result,
      closingBalance: closingBalance,
    },
  };
};

// !----------------------------------get all Food Exp Daily---------------------------------------->>>
const getTransaction = async (filters: ITransactionFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Requisition[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.RequisitionWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: TransactionSearchableFields.map((field: any) => ({
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
      requisitionDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (TransactionRelationalFields.includes(key)) {
          return {
            [TransactionRelationalFieldsMapper[key]]: {
              requisitionDate: (filterData as any)[key],
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
  const whereConditions: Prisma.RequisitionWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.requisition.findMany({
    where: whereConditions,
    include: {
      account: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.requisition.count({
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

const updateTransaction = async (requisitionId: string, payload: any): Promise<any> => {
  const findRequisition = await prisma.requisition.findUnique({
    where: {
      requisitionId,
    },
  });

  if (!findRequisition) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requisition Not Found');
  }

  const result = await prisma.requisition.update({
    where: {
      requisitionId: findRequisition.requisitionId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Update Failed');
  }

  return result;
};

export const TransactionService = {
  createTransaction,
  getTransaction,
  updateTransaction,
};
