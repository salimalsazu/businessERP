/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Account, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAccountCreate, IAccountFilterRequest } from './account.interface';
import { accountRelationalFields, accountRelationalFieldsMapper, accountSearchableFields } from './account.constants';

const createAccount = async (data: IAccountCreate): Promise<Account> => {
  if (!data.accountName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account Name is required');
  }

  const result = await prisma.account.create({
    data: {
      accountName: data.accountName,
      openingBalance: data.openingBalance,
      closingBalance: data.closingBalance,
    },
  });

  return result;
};

// ! getting all Accounts ----------------------------------------------------------------------->>>
const getAccounts = async (filters: IAccountFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Account[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.AccountWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: accountSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (accountRelationalFields.includes(key)) {
          return {
            [accountRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.AccountWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.account.findMany({
    where: whereConditions,
    include: {
      transactionCredit: {
        select: {
          debitAccount: true,
          transactionAmount: true,
          trId: true,
          transactionId: true,
        },
      },
      transactionDebit: {
        select: {
          creditAccount: true,
          transactionAmount: true,
          trId: true,
          transactionId: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.account.count({
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

// ! single Account info -------------------------------------------------------->>>

const getAccountByName = async (accountName: string): Promise<Account | null> => {
  const result = await prisma.account.findFirst({
    where: {
      accountName,
    },
    include: {
      transactionCredit: {
        select: {
          debitAccount: true,
          transactionAmount: true,
          trId: true,
          transactionId: true,
          createdAt: true,
        },
      },
      transactionDebit: {
        select: {
          creditAccount: true,
          transactionAmount: true,
          trId: true,
          transactionId: true,
          createdAt: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
  }

  return result;
};

// ! --------------- exports all user service
export const AccountService = {
  createAccount,
  getAccounts,
  getAccountByName,
};
