/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetItemList, Prisma, StationaryItemList } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { StationaryItemListSearchableFields, stationaryItemListRelationalFields, stationaryItemListRelationalFieldsMapper } from './asset.constants';
import { IAssetCreateRequest, IStationaryItemListFilterRequest } from './asset.interface';
import { IUploadFile } from '../../../interfaces/file';
import { generateAssetId } from './asset.utils';

// modules

// !----------------------------------Create New Stationary---------------------------------------->>>
const createAssetItemList = async (req: Request): Promise<AssetItemList> => {
  //@ts-ignore
  const file = req.file as IUploadFile;

  console.log(file, 'file');

  const filePath = file?.path?.substring(8);

  console.log(filePath, 'filePath');

  //@ts-ignore
  const data = req.body as IAssetCreateRequest;

  // asset Id auto generated
  const assetId: string = await generateAssetId();

  const result = await prisma.$transaction(async transactionClient => {
    const isExistAsset = await prisma.assetItemList.findUnique({
      where: {
        assetId: assetId,
      },
    });
    if (isExistAsset) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Asset is already added');
    }

    const newAssetData = {
      purchaseDate: data.purchaseDate,
      assetId: assetId,
      assetName: data.assetName,
      assetLocation: data.assetLocation,
      assetCategory: data.assetCategory,
      assetQuantity: data.assetQuantity,
      assetModel: data.assetModel,
      assetImage: filePath,
    };

    const createdAssetItemList = await transactionClient.assetItemList.create({
      data: newAssetData,
    });
    return createdAssetItemList;
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Asset creation failed');
  }
  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const GetAssetItemList = async (
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

export const AssetListService = {
  createAssetItemList,
  GetAssetItemList,
};
