/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetItemList, Prisma, StationaryItemList } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { AssetItemListRelationalFields, AssetItemListRelationalFieldsMapper, AssetItemListSearchableFields } from './asset.constants';
import { IAssetCreateRequest, IAssetItemListFilterRequest } from './asset.interface';
import { IUploadFile } from '../../../interfaces/file';
import { generateAssetId } from './asset.utils';

// modules

// !----------------------------------Create New Stationary---------------------------------------->>>
const createAssetItemList = async (req: Request): Promise<AssetItemList> => {
  //@ts-ignore
  const file = req.file as IUploadFile;

  console.log(file, 'file');

  const filePath = file?.path?.substring(13);

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
const GetAssetItemList = async (filters: IAssetItemListFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AssetItemList[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.AssetItemListWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: AssetItemListSearchableFields.map((field: any) => ({
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
        if (AssetItemListRelationalFields.includes(key)) {
          return {
            [AssetItemListRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.AssetItemListWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.assetItemList.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.assetItemList.count({
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

export const AssetListService = {
  createAssetItemList,
  GetAssetItemList,
};
