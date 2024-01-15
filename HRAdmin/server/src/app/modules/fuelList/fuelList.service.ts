/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FuelList, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { FuelListRelationalFields, FuelListRelationalFieldsMapper, FuelListSearchableFields } from './fuelList.constants';
import { IFuelListFilterRequest, IFuelListRequest } from './fuelList.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

// modules

// !----------------------------------Create New Asset Assign---------------------------------------->>>
const createFuelList = async (data: IFuelListRequest): Promise<FuelList> => {
  if (!data.vehicleId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Vehicle Name is required');
  }

  const isVehicleNoExist = await prisma.vehicleAdd.findFirst({
    where: {
      vehicleId: data.vehicleId,
    },
  });

  if (!isVehicleNoExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Vehicle Name Not Found');
  }

  const lastFuelEntry = await prisma.fuelList.findFirst({
    where: {
      vehicleId: isVehicleNoExist?.vehicleId,
    },
    orderBy: [
      { createdAt: 'desc' }, // Add createdAt as a secondary sorting condition
    ],
  });

  console.log('lastFuelEntry', lastFuelEntry);

  let kmPrevious = 0;
  let usage = 0;

  if (lastFuelEntry) {
    kmPrevious = lastFuelEntry.kmCurrent || 0;
    const kmConsumed = data.kmCurrent - kmPrevious;
    usage = lastFuelEntry.kmConsumed ? Number(((kmConsumed / lastFuelEntry.kmConsumed) * 100).toFixed(2)) : 0;
  }

  const perLitreCost = data.fuelCost / data.fuelQuantity;
  const kmConsumed = data.kmCurrent - kmPrevious;

  const fuelListData: any = {
    purchaseDate: data.purchaseDate,
    vehicleId: isVehicleNoExist?.vehicleId,
    kmCurrent: data.kmCurrent,
    fuelQuantity: data.fuelQuantity,
    fuelCost: data.fuelCost,
    perLitreCost: perLitreCost,
    kmConsumed: kmConsumed,
    kmPrevious: kmPrevious,
    usage: usage,
  };

  const result = await prisma.fuelList.create({
    data: fuelListData,
  });

  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const GetFuelList = async (filters: IFuelListFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<FuelList[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, vehicleName, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.FuelListWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: FuelListSearchableFields.map((field: any) => ({
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
        if (FuelListRelationalFields.includes(key)) {
          return {
            [FuelListRelationalFieldsMapper[key]]: {
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

  //Filter By Date

  if (startDate && endDate) {
    andConditions.push({
      purchaseDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  //filter by Status
  if (vehicleName) {
    andConditions.push({
      vehicleAdd: {
        vehicleName: {
          equals: filters.vehicleName,
        },
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.FuelListWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.fuelList.findMany({
    include: {
      vehicleAdd: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.fuelList.count({
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

export const FuelListService = {
  createFuelList,
  GetFuelList,
};
