/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Foods, Prisma, Requisition, RequisitionStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IRequisitionCreateRequest, IRequisitionFilterRequest } from './salary.interface';


// modules

// !----------------------------------Create New Salary---------------------------------------->>>
const createSalary = async (data: IRequisitionCreateRequest): Promise<Requisition> => {

  



  return result;
};

// !----------------------------------get all Salary---------------------------------------->>>
const getSalary = async (filters: IRequisitionFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Requisition[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.RequisitionWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: RequisitionSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add date range condition if both startDate and endDate are provided

  if (startDate && endDate) {
    andConditions.push({
      requisitionDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (RequisitionRelationalFields.includes(key)) {
          return {
            [RequisitionRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.RequisitionWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.requisition.findMany({
    where: whereConditions,
    include: {
      account: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.requisition.count({
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

const updateSalary = async (requisitionId: string, payload: any): Promise<any> => {
  const findRequisition = await prisma.requisition.findUnique({
    where: {
      requisitionId,
    },
  });

  if (!findRequisition) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requisition Not Found');
  }

  const result = await prisma.requisition.update({
    where: {
      requisitionId: findRequisition.requisitionId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Update Failed');
  }

  return result;
};

export const SalaryService = {
  createSalary,
  getSalary,
  updateSalary,
};
