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
      transactionCredit: true,
      transactionDebit: true,
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

// ! update user info -------------------------------------------------------->>>
// const updateUserInfo = async (
//   userId: string,
//   payload: IUserUpdateReqAndResponse
// ): Promise<{
//   message: string;
//   updatedInfo: IUserUpdateReqAndResponse;
// }> => {
//   if ('userId' in payload) {
//     throw new ApiError(httpStatus.BAD_REQUEST, `User ID cannot be changed`);
//   }

//   // Check if the user exists
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       userId,
//     },
//   });

//   if (!existingUser) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!');
//   }

//   const { password, email, userStatus, firstName, lastName, role, profileId, isMeal } = payload;

//   const updatedData: Partial<User> = {};

//   // If a new password is provided, hash and include it in the update
//   if (password) {
//     const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
//     updatedData['password'] = hashPassword;
//   }

//   if (userStatus) updatedData['userStatus'] = userStatus;

//   if (email) updatedData['email'] = email;

//   //  update the user Information

//   const result = await prisma.user.update({
//     where: {
//       userId,
//     },
//     data: updatedData,
//   });

//   const updatedProfileData: Partial<Profile> = {};

//   if (firstName) updatedProfileData['firstName'] = firstName;
//   if (lastName) updatedProfileData['lastName'] = lastName;
//   if (role) updatedProfileData['role'] = role;
//   if (isMeal) updatedProfileData['isMeal'] = isMeal;

//   if (updatedProfileData) {
//     const updateProfile = await prisma.profile.update({
//       where: {
//         profileId,
//       },
//       data: updatedProfileData,
//     });
//     if (!updateProfile) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'User Update Failed');
//     }
//   }

//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User Update Failed');
//   }

//   return {
//     message: 'User Information Updated Successful',
//     updatedInfo: {
//       email: email,
//       password: password,
//       userStatus: userStatus,
//       firstName,
//       lastName,
//       role,
//     },
//   };
// };

// ! --------------- exports all user service
export const AccountService = {
  createAccount,
  getAccounts,
  // updateUserInfo,
};
