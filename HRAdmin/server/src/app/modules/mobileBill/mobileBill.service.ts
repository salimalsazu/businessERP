/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetAssign, MobileBill, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { IMobileBillFilterRequest, IMobileBillRequest } from './mobileBill.interface';
import { MobileBillRelationalFields, MobileBillRelationalFieldsMapper, MobileBillSearchableFields } from './mobileBill.constants';

// modules

// !----------------------------------Create New Asset Assign---------------------------------------->>>
// const addMobileBill = async (data: IMobileBillRequest): Promise<MobileBill> => {
//   console.log('data', data);

//   if (!data.userId) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
//   }

//   const isUserExist = await prisma.user.findUnique({
//     where: {
//       userId: data.userId,
//     },
//     include: {
//       profile: {
//         select: {
//           mobileNo: true,
//           mobileBillingLimit: true,
//         },
//       },
//     },
//   });

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found');
//   }

//   const isMobileNoExist: any = isUserExist.profile?.mobileNo;

//   const isMobileLimitExist: any = isUserExist?.profile?.mobileBillingLimit;

//   const billingMonth = new Date(data.billDate).toLocaleString('en-US', { month: 'long', year: 'numeric' });

//   const userDeduction = Math.min(0, isMobileLimitExist - data.billAmount);

//   const userUsage = (data.billAmount / isMobileLimitExist) * 100;

//   const dataObj = {
//     billDate: data.billDate,
//     billingMonth: billingMonth.toString(),
//     mobileNo: isMobileNoExist,
//     billAmount: data.billAmount,
//     billLimit: isMobileLimitExist,
//     deduction: userDeduction,
//     usage: userUsage,
//     userId: isUserExist.userId,
//   };

//   console.log('dataObj', dataObj);

//   const result = await prisma.mobileBill.create({
//     data: dataObj,
//   });

//   return result;
// };

const addMobileBill = async (data: IMobileBillRequest[]): Promise<Prisma.BatchPayload> => {
  console.log('data', data);

  data.map(item => {
    if (!item.userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
    }
  });

  const userIds = data.map(item => item.userId);

  const isUserExist = await prisma.user.findMany({
    where: {
      userId: { in: userIds },
    },
    include: {
      profile: {
        select: {
          mobileNo: true,
          mobileBillingLimit: true,
          jobId: true,
        },
      },
    },
  });

  // Check if all users have a corresponding profile
  if (isUserExist.length !== userIds.length) {
    throw new Error('User Not Found');
  }

  const mobileBillData: Prisma.MobileBillCreateManyInput[] = data.map(item => {
    const user = isUserExist.find(u => u.userId === item.userId);

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found');
    }

    const billingMonth = new Date(item.billDate).toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const billingLimit = user.profile?.mobileBillingLimit ?? 0;

    return {
      billDate: item.billDate,
      billingMonth: billingMonth.toString(),
      mobileNo: user.profile?.mobileNo || '',
      billAmount: item.billAmount,
      billLimit: user.profile?.mobileBillingLimit ?? 0,
      deduction: Math.min(0, billingLimit - item.billAmount),
      usage: (item.billAmount / (user.profile?.mobileBillingLimit || 1)) * 100, // Avoid division by zero
      userId: user.userId,
    };
  });

  console.log('mobileBillData', mobileBillData);

  const result = await prisma.mobileBill.createMany({
    data: mobileBillData,
  });

  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const getMobileBill = async (filters: IMobileBillFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<MobileBill[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, billingMonth, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.MobileBillWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: MobileBillSearchableFields.map((field: any) => {
        if (field === 'firstName') {
          return {
            user: {
              profile: {
                firstName: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          } as Prisma.MobileBillWhereInput;
        } else if (field === 'lastName') {
          return {
            user: {
              profile: {
                lastName: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          } as Prisma.MobileBillWhereInput;
        } else if (field === 'mobileNo') {
          return {
            user: {
              profile: {
                mobileNo: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          } as Prisma.MobileBillWhereInput;
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.MobileBillWhereInput;
        }
      }),
    } as Prisma.MobileBillWhereInput);
  }

  //filter by Month
  if (billingMonth) {
    andConditions.push({
      billingMonth: {
        equals: filters.billingMonth,
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (MobileBillRelationalFields.includes(key)) {
          return {
            [MobileBillRelationalFieldsMapper[key]]: {
              assetName: (filterData as any)[key],
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
  const whereConditions: Prisma.MobileBillWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.mobileBill.findMany({
    include: {
      user: {
        select: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              mobileNo: true,
              mobileBillingLimit: true,
              jobId: true,
            },
          },
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.mobileBill.count({
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

// // !----------------------------------get Single Courier---------------------------------------->>>
// const getSingleCourier = async (courierId: string): Promise<Courier | null> => {
//   const result = await prisma.courier.findUnique({
//     where: {
//       courierId,
//     },
//     include: {
//       style: true,
//     },
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Courier Not Found!!');
//   }

//   return result;
// };
// // !----------------------------------Update Courier---------------------------------------->>>
// const updateCourierInformation = async (courierId: string, payload: ICourierUpdateRequest): Promise<Courier> => {
//   const result = await prisma.$transaction(async transactionClient => {
//     const existingCourier = await transactionClient.courier.findUnique({
//       where: {
//         courierId,
//       },
//     });

//     if (!existingCourier) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Courier Not Found!!');
//     }

//     const updatedCourierDetails = {
//       courierName: payload?.courierName,
//       awbNo: payload?.awbNo,
//       courierDate: payload?.courierDate,
//       courierDetails: payload?.courierDetails,
//       styleNo: payload?.styleNo,
//     };

//     const updatedCourier = await transactionClient.courier.update({
//       where: {
//         courierId,
//       },
//       data: updatedCourierDetails,
//     });

//     return updatedCourier;
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Courier');
//   }

//   return result;
// };

// const getStyleWiseNoOfCourier = async (
//   filters: IStylesFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<IStyleWiseCourier[]>> => {
//   // Calculate pagination options
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);

//   // Destructure filter properties
//   const { searchTerm, ...filterData } = filters;

//   // Define an array to hold filter conditions
//   const andConditions: Prisma.StylesWhereInput[] = [];

//   // Add search term condition if provided
//   if (searchTerm) {
//     andConditions.push({
//       OR: StyleWiseCourierSearchableFields.map((field: any) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   // Add filterData conditions if filterData is provided
//   if (Object.keys(filterData).length > 0) {
//     const filterConditions = Object.keys(filterData).map(key => {
//       return {
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       };
//     });
//     andConditions.push({ AND: filterConditions });
//   }

//   // Create a whereConditions object with AND conditions
//   const whereConditions: Prisma.StylesWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

//   // Retrieve Courier with filtering and pagination
//   const result = await prisma.styles.findMany({
//     select: {
//       styleNo: true,
//       _count: {
//         select: {
//           couriers: true,
//         },
//       },
//     },
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
//   });

//   // Count total matching orders for pagination
//   const total = await prisma.styles.count({
//     where: whereConditions,
//   });

//   // Calculate total pages
//   const totalPage = Math.ceil(total / limit);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage,
//     },
//     data: result,
//   };
// };

export const MobileBillService = {
  addMobileBill,
  getMobileBill,
};
