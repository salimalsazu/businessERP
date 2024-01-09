/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetAssign, Prisma, assignStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { AssetAssignRelationalFields, AssetAssignRelationalFieldsMapper, AssetAssignSearchableFields } from './assetAssign.constants';
import { IAssetAssignFilterRequest, IAssetAssignRequest } from './assetAssign.interface';

// modules

// !----------------------------------Create New Asset Assign---------------------------------------->>>
const createAssetAssign = async (data: IAssetAssignRequest): Promise<AssetAssign> => {
  if (!data.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      userId: data.userId,
    },
  });

  console.log(isUserExist?.userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!!');
  }

  if (!data.assetListId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Asset ID is required');
  }

  const isAssetExist = await prisma.assetItemList.findUnique({
    where: {
      assetListId: data.assetListId,
    },
  });

  if (!isAssetExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Asset Not Found!!');
  }

  const assetAssign = {
    assignDate: data.assignDate,
    assetListId: isAssetExist.assetListId,
    userId: isUserExist.userId,
    requestFor: data.requestFor,
    note: data.note,
    assignStatus: assignStatus.Pending,
  };

  const result = await prisma.assetAssign.create({
    data: assetAssign,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Asset Assign');
  }

  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const GetAssetAssign = async (filters: IAssetAssignFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AssetAssign[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.AssetAssignWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: AssetAssignSearchableFields.map((field: any) => {
        if (field === 'assetName') {
          return {
            assetItemList: {
              assetName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.AssetAssignWhereInput;
        } else if (field === 'assetId') {
          return {
            assetItemList: {
              assetId: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.AssetAssignWhereInput;
        } else if (field === 'firstName') {
          return {
            user: {
              profile: {
                firstName: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          } as Prisma.AssetAssignWhereInput;
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
          } as Prisma.AssetAssignWhereInput;
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.AssetAssignWhereInput;
        }
      }),
    } as Prisma.AssetAssignWhereInput);
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (AssetAssignRelationalFields.includes(key)) {
          return {
            [AssetAssignRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.AssetAssignWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.assetAssign.findMany({
    include: {
      assetItemList: {
        select: {
          assetName: true,
          assetId: true,
        },
      },
      user: {
        select: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
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
  const total = await prisma.assetAssign.count({
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

export const AssetAssignService = {
  createAssetAssign,
  GetAssetAssign,
};
