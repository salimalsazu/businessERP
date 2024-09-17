/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Transaction } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ITransactionCreateRequest, ITransactionFilterRequest } from './transaction.interface';
import { TransactionRelationalFields, TransactionRelationalFieldsMapper, TransactionSearchableFields } from './transaction.constants';
import { generateTransactionId } from './trIdAutoIncrement';
import { logger } from '../../../shared/logger';

const createTransaction = async (data: ITransactionCreateRequest): Promise<any> => {
  // Check if account exists
  const isDebitAccountExist = await prisma.account.findUnique({
    where: {
      accountId: data.debitAccountId,
    },
  });

  if (!isDebitAccountExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
  }

  // Check if account exists
  const isCreditAccountExist = await prisma.account.findUnique({
    where: {
      accountId: data.creditAccountId,
    },
  });

  if (!isCreditAccountExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
  }

  if (isDebitAccountExist.accountId === isCreditAccountExist.accountId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Debit and Credit account cannot be the same');
  }

  // Generate transaction ID
  const trAutoIncrement = generateTransactionId(isDebitAccountExist.accountName);

  const debitAccountClosingBalance = isDebitAccountExist.closingBalance + data.transactionAmount;
  const creditAccountClosingBalance = isCreditAccountExist.closingBalance - data.transactionAmount;

  // Create transaction record
  const dataObj = {
    transactionDate: data.transactionDate,
    transactionType: data.transactionType,
    transactionAmount: data.transactionAmount,
    transactionDescription: data.transactionDescription,
    trId: trAutoIncrement,
    debitAccountClosingBalance: debitAccountClosingBalance,
    creditAccountClosingBalance: creditAccountClosingBalance,
    debitAccountId: data.debitAccountId,
    creditAccountId: data.creditAccountId,
  };

  // Create transaction record in database
  const result = await prisma.transaction.create({
    data: dataObj,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Transaction');
  }

  logger.info(`Transaction created successfully with ID: ${result.transactionId}`);

  // Fetch current balance
  const debitAccount = await prisma.account.findUnique({
    where: {
      accountId: data.debitAccountId,
    },
  });

  if (!debitAccount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
  }

  // Calculate new closing balance
  const closingBalance = (debitAccount.closingBalance || 0) + data.transactionAmount; // Assuming deduction for the transaction

  // Update account with new balance
  const accountBalanceUpdate = await prisma.account.update({
    where: {
      accountId: debitAccount.accountId,
    },
    data: {
      closingBalance: closingBalance,
    },
  });

  if (!accountBalanceUpdate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update account balance');
  }

  const creditAccount = await prisma.account.findUnique({
    where: {
      accountId: data.creditAccountId,
    },
  });

  if (!creditAccount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account not found');
  }

  // Calculate new closing balance
  const closingBalanceCredit = (creditAccount.closingBalance || 0) - data.transactionAmount; // Assuming deduction for the transaction

  // Update account with new balance

  const accountBalanceUpdateCredit = await prisma.account.update({
    where: {
      accountId: creditAccount.accountId,
    },
    data: {
      closingBalance: closingBalanceCredit,
    },
  });

  if (!accountBalanceUpdateCredit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update account balance');
  }

  // Return the result with closing balance
  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction successfully',
    data: {
      ...result,
    },
  };
};

// !----------------------------------get all Food Exp Daily---------------------------------------->>>
const getTransaction = async (filters: ITransactionFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Transaction[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.TransactionWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: TransactionSearchableFields.map((field: any) => {
        if (field === 'accountName') {
          // Create conditions for both creditAccount and debitAccount
          return {
            OR: [
              {
                creditAccount: {
                  accountName: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              },
              {
                debitAccount: {
                  accountName: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          } as Prisma.TransactionWhereInput;
        } else {
          // Handle all other fields
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.TransactionWhereInput;
        }
      }),
    } as Prisma.TransactionWhereInput);
  }

  // Add date range condition if both startDate and endDate are provided

  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
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
  const whereConditions: Prisma.TransactionWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.transaction.findMany({
    where: whereConditions,
    include: {
      creditAccount: true,
      debitAccount: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  logger.info(`Transaction fetched successfully`);

  // Count total matching orders for pagination
  const total = await prisma.transaction.count({
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

  logger.info(`Requisition updated successfully with ID: ${result.requisitionId}`);

  return result;
};

export const TransactionService = {
  createTransaction,
  getTransaction,
  updateTransaction,
};
