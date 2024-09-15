import { TrailBalanceType } from '@prisma/client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Account, Group, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IGroupCreate, IGroupFilterRequest } from './group.interface';
import { groupRelationalFields, groupRelationalFieldsMapper, groupSearchableFields } from './group.constants';

const createGroup = async (data: IGroupCreate): Promise<Group> => {
  const objData = {
    groupName: data.groupName,
    tbType: data.tbType,
  };

  const result = await prisma.group.create({
    data: objData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group creation failed');
  }

  return result;
};

// ! getting all Accounts ----------------------------------------------------------------------->>>
const getGroups = async (filters: IGroupFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Group[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.GroupWhereInput[] = [];

  // Add search term condition if provided
  // if (searchTerm) {
  //   andConditions.push({
  //     OR: groupSearchableFields.map((field: any) => ({
  //       [field]: {
  //         contains: searchTerm,
  //         mode: 'insensitive',
  //       },
  //     })),
  //   });
  // }

  if (searchTerm) {
    andConditions.push({
      subGroup: {
        some: {
          account: {
            some: {
              accountName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (groupRelationalFields.includes(key)) {
          return {
            [groupRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.GroupWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.group.findMany({
    where: whereConditions,
    include: {
      subGroup: {
        select: {
          subGroupName: true,
          subGroupId: true,
          account: {
            select: {
              accountName: true,
              accountId: true,
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.group.count({
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

const getTrialBalance = async (
  filters: IGroupFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<{ debit: Group[]; credit: Group[]; totalDebit: number; totalCredit: number }>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, selectedDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.GroupWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: groupSearchableFields.map((field: any) => ({
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
        if (groupRelationalFields.includes(key)) {
          return {
            [groupRelationalFieldsMapper[key]]: {
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

  // Add selected date condition
  andConditions.push({
    createdAt: {
      gte: selectedDate,
    },
  });

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.GroupWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Debit Groups with filtering and pagination
  const findDebitGroup = await prisma.group.findMany({
    where: {
      ...whereConditions,
      tbType: TrailBalanceType.DEBIT,
    },
    select: {
      groupName: true,
      subGroup: {
        select: {
          subGroupName: true,
          subGroupDescription: true,
          account: {
            select: {
              accountName: true,
              closingBalance: true,
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Retrieve Credit Groups with filtering and pagination
  const findCreditGroup = await prisma.group.findMany({
    where: {
      ...whereConditions,
      tbType: TrailBalanceType.CREDIT,
    },
    select: {
      groupName: true,
      subGroup: {
        select: {
          subGroupName: true,
          subGroupDescription: true,
          account: {
            select: {
              accountName: true,
              closingBalance: true,
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Calculate total debit and credit values based on closing balances
  const totalDebit = findDebitGroup.reduce((sum, group) => {
    return (
      sum +
      group.subGroup.reduce((subSum, subGroup) => {
        return subSum + subGroup.account.reduce((accSum, account) => accSum + (account.closingBalance || 0), 0);
      }, 0)
    );
  }, 0);

  const totalCredit = findCreditGroup.reduce((sum, group) => {
    return (
      sum +
      group.subGroup.reduce((subSum, subGroup) => {
        return subSum + subGroup.account.reduce((accSum, account) => accSum + (account.closingBalance || 0), 0);
      }, 0)
    );
  }, 0);

  // Count total matching groups for pagination
  const totalDebitCount = await prisma.group.count({
    where: {
      ...whereConditions,
      tbType: TrailBalanceType.DEBIT,
    },
  });

  const totalCreditCount = await prisma.group.count({
    where: {
      ...whereConditions,
      tbType: TrailBalanceType.CREDIT,
    },
  });

  // Calculate total pages
  const totalPageDebit = Math.ceil(totalDebitCount / limit);
  const totalPageCredit = Math.ceil(totalCreditCount / limit);

  // Combine debit and credit into one result set
  const result = {
    debit: findDebitGroup,
    credit: findCreditGroup,
    totalDebit,
    totalCredit,
  };

  // Return structured data
  return {
    meta: {
      page,
      limit,
      total: totalDebitCount + totalCreditCount,
      totalPage: Math.max(totalPageDebit, totalPageCredit),
    },
    // @ts-ignore
    data: result,
  };
};

export const GroupService = {
  createGroup,
  getGroups,
  getTrialBalance,
};
