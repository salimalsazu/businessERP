/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetAssign, MobileBalanceLimit, MobileBill, Prisma, assignStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { IMobileBalanceLimitRequest, IMobileBillFilterRequest } from './mobileBalance.interface';
import { MobileBillRelationalFields, MobileBillRelationalFieldsMapper, MobileBillSearchableFields } from './mobileBalance.constants';

// modules

// !----------------------------------Create New Bill Assign---------------------------------------->>>

const addMobileBalanceLimit = async (userId: string, data: IMobileBalanceLimitRequest): Promise<MobileBalanceLimit> => {
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is Required');
  }

  if (!data.billLimit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bill Limit is Required');
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found');
  }

  const dataObj = {
    userId: isUserExist.userId,
    billLimit: data.billLimit,
    limitStatus: assignStatus.Pending,
  };

  console.log('dataObj', dataObj);

  const result = await prisma.mobileBalanceLimit.create({
    data: dataObj,
  });

  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const getMobileBalanceLimit = async (filters: IMobileBillFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<MobileBill[]>> => {
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

export const MobileBalanceLimitService = {
  getMobileBalanceLimit,
  addMobileBalanceLimit,
};
