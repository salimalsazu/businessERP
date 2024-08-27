import { SubGroup, TrailBalanceType } from '@prisma/client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Group, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ISubGroupCreate, ISubGroupFilterRequest } from './subGroup.interface';
import { subGroupRelationalFields, subGroupRelationalFieldsMapper, subGroupSearchableFields } from './subGroup.constants';

const createSubGroup = async (data: ISubGroupCreate): Promise<SubGroup> => {
  const findGroup = await prisma.group.findUnique({
    where: {
      groupId: data.groupId,
    },
  });

  if (!findGroup) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group not found');
  }

  const objData = {
    subGroupName: data.subGroupName,
    subGroupDescription: data.subGroupDescription,
    groupId: findGroup.groupId,
  };

  const result = await prisma.subGroup.create({
    data: objData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sub Group creation failed');
  }

  return result;
};

// ! getting all Accounts ----------------------------------------------------------------------->>>
const getSubGroups = async (filters: ISubGroupFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<SubGroup[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.SubGroupWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: subGroupSearchableFields.map((field: any) => ({
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
        if (subGroupRelationalFields.includes(key)) {
          return {
            [subGroupRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.SubGroupWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.subGroup.findMany({
    where: whereConditions,
    include: {
      account: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.subGroup.count({
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

export const SubGroupService = {
  createSubGroup,
  getSubGroups,
};
