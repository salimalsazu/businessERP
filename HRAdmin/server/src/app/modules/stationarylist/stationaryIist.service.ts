/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, StationaryItemAssign, StationaryItemList, assignStatus, itemStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import {
  StationaryItemAssignSearchableFields,
  StationaryItemListSearchableFields,
  stationaryItemAssignRelationalFields,
  stationaryItemAssignRelationalFieldsMapper,
  stationaryItemListRelationalFields,
  stationaryItemListRelationalFieldsMapper,
} from './stationarylist.constants';
import {
  IStationaryAssignListFilterRequest,
  IStationaryItemListFilterRequest,
  IStationaryListAssignRequest,
  IStationaryListCreateRequest,
} from './stationarylist.interface';

// modules

// !----------------------------------Create New Stationary---------------------------------------->>>
const createStationaryItemList = async (data: IStationaryListCreateRequest): Promise<StationaryItemList> => {
  const findStationaryItem = await prisma.stationaryItem.findUnique({
    where: {
      stationaryItemId: data.stationaryItemId,
    },
  });

  if (!findStationaryItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stationary Item Not Found!!');
  }

  const newStockQuantity = findStationaryItem?.stockQuantity + data.purchaseQuantity;

  let newStockItemStatus: itemStatus;

  if (newStockQuantity >= 20) {
    newStockItemStatus = 'Excellent';
  } else if (newStockQuantity >= 10) {
    newStockItemStatus = 'Good';
  } else {
    newStockItemStatus = 'Poor';
  }

  // Update stock quantity and stock item status
  const updatedStationaryItem = await prisma.stationaryItem.update({
    where: {
      stationaryItemId: data.stationaryItemId,
    },
    data: {
      stockQuantity: newStockQuantity,
      stockItemStatus: newStockItemStatus,
    },
  });

  if (!updatedStationaryItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update stock quantity');
  }

  const stationaryItemList = {
    purchaseDate: data.purchaseDate,
    purchaseQuantity: data.purchaseQuantity,
    stationaryItemId: findStationaryItem.stationaryItemId,
  };

  const result = await prisma.stationaryItemList.create({
    data: stationaryItemList,
  });

  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const getAllStationaryItemList = async (
  filters: IStationaryItemListFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<StationaryItemList[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.StationaryItemListWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: StationaryItemListSearchableFields.map((field: any) => ({
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
        if (stationaryItemListRelationalFields.includes(key)) {
          return {
            [stationaryItemListRelationalFieldsMapper[key]]: {
              itemName: (filterData as any)[key],
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
  const whereConditions: Prisma.StationaryItemListWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.stationaryItemList.findMany({
    include: {
      stationaryItem: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.stationaryItemList.count({
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

const createStationaryAssignList = async (data: IStationaryListAssignRequest): Promise<StationaryItemAssign> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!!');
  }

  const findStationaryItem = await prisma.stationaryItem.findUnique({
    where: {
      stationaryItemId: data.stationaryItemId,
    },
  });

  if (!findStationaryItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stationary Item Not Found!!');
  }

  const newStockQuantity = findStationaryItem?.stockQuantity - data.assignQuantity;

  let newStockItemStatus: itemStatus;

  if (newStockQuantity >= 20) {
    newStockItemStatus = 'Excellent';
  } else if (newStockQuantity >= 10) {
    newStockItemStatus = 'Good';
  } else {
    newStockItemStatus = 'Poor';
  }

  // Update stock quantity and stock item status
  const updatedStationaryItem = await prisma.stationaryItem.update({
    where: {
      stationaryItemId: data.stationaryItemId,
    },
    data: {
      stockQuantity: newStockQuantity,
      stockItemStatus: newStockItemStatus,
    },
  });

  if (!updatedStationaryItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update stock quantity');
  }

  const stationaryItemAssign = {
    lastAssignedDate: data.lastAssignedDate,
    assignQuantity: data.assignQuantity,
    stationaryItemId: findStationaryItem.stationaryItemId,
    userId: data.userId,
    assignItemStatus: assignStatus.Pending,
  };

  const result = await prisma.stationaryItemAssign.create({
    data: stationaryItemAssign,
  });

  return result;
};

// !----------------------------------get all assign items---------------------------------------->>>

const getAllStationaryAssignList = async (
  filters: IStationaryAssignListFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<StationaryItemAssign[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, itemName, assignItemStatus, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.StationaryItemAssignWhereInput[] = [];

  // Add search term condition if provided....
  // if (searchTerm) {
  //   andConditions.push({
  //     OR: StationaryItemAssignSearchableFields.map((field: any) => {
  //       if (field === 'itemName') {
  //         // Adjust the condition for 'itemName' to reference the 'stationaryItem' relationship
  //         return {
  //           stationaryItem: {
  //             itemName: {
  //               contains: searchTerm,
  //               mode: 'insensitive',
  //             },
  //           },
  //         };
  //       } else {
  //         return {
  //           [field]: {
  //             contains: searchTerm,
  //             mode: 'insensitive',
  //           },
  //         };
  //       }
  //     }),
  //   });
  // }

  //search by jobId

  // Combine all search conditions into a single block
  if (searchTerm) {
    andConditions.push({
      OR: StationaryItemAssignSearchableFields.map((field: any) => {
        if (field === 'itemName') {
          return {
            stationaryItem: {
              itemName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          } as Prisma.StationaryItemAssignWhereInput;
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
          } as Prisma.StationaryItemAssignWhereInput;
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.StationaryItemAssignWhereInput;
        }
      }),
    } as Prisma.StationaryItemAssignWhereInput);
  }

  // Filter by Item Name.....
  if (itemName) {
    andConditions.push({
      stationaryItem: {
        itemName: {
          contains: itemName,
        },
      },
    });
  }

  //Filter By Date

  if (startDate && endDate) {
    andConditions.push({
      lastAssignedDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  //filter by Status
  if (assignItemStatus) {
    andConditions.push({
      assignItemStatus: {
        equals: filters.assignItemStatus,
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (stationaryItemAssignRelationalFields.includes(key)) {
          return {
            [stationaryItemAssignRelationalFieldsMapper[key]]: {
              itemName: (filterData as any)[key],
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
  const whereConditions: Prisma.StationaryItemAssignWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.stationaryItemAssign.findMany({
    include: {
      stationaryItem: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.stationaryItemAssign.count({
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

export const StationaryItemListService = {
  createStationaryItemList,
  getAllStationaryItemList,
  createStationaryAssignList,
  getAllStationaryAssignList,
};
