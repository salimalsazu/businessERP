/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Requisition, Salary, SalaryMonth } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ISalaryCreateRequest, ISalaryFilterRequest } from './salary.interface';
import { SalaryRelationalFields, SalaryRelationalFieldsMapper, SalarySearchableFields } from './salary.constants';

// modules

// !----------------------------------Create New Salary---------------------------------------->>>
const createSalary = async (data: ISalaryCreateRequest): Promise<Salary> => {
  // Fetch employee details
  const employee = await prisma.user.findUnique({
    where: { userId: data.userId },
  });

  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not Found');
  }

  // Fetch profile details
  const profile = await prisma.profile.findUnique({
    where: { profileId: employee.profileId as string },
  });

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile Not Found');
  }

  // Safely handle possible null values
  const totalSalary = profile.totalSalary ?? 0;
  const tdsOnSalary = profile.tdsOnSalary ?? 0;

  // Calculate salary components
  const basicSalary = totalSalary / 2;
  const houseRent = basicSalary * 0.5;
  const medicalAllowance = basicSalary * 0.2;
  const conveyance = basicSalary * 0.2;
  const otherAllowance = basicSalary * 0.1;
  const netPayableSalary = totalSalary - data.absentDeduction - data.advanceSalaryDeduction - data.mealAndMobileBillDeduction;
  const netSalary = netPayableSalary - tdsOnSalary;

  // Construct salary object
  const salaryObj: Prisma.SalaryUncheckedCreateInput = {
    salaryMonth: data.salaryMonth as SalaryMonth, // Adjust this type accordingly
    salaryYear: data.salaryYear,
    userId: data.userId,
    basicSalary,
    houseRent,
    medicalAllowance,
    conveyance,
    otherAllowance,
    totalSalary,
    absentDeduction: data.absentDeduction,
    advanceSalaryDeduction: data.advanceSalaryDeduction,
    mealAndMobileBillDeduction: data.mealAndMobileBillDeduction,
    netPayableSalary,
    tdsOnSalary,
    netSalary,
  };

  // Create salary record
  const result = await prisma.salary.create({ data: salaryObj });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Salary Creation Failed');
  }

  return result;
};

// !----------------------------------get all Salary---------------------------------------->>>
const getSalary = async (filters: ISalaryFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Salary[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, salaryMonth, salaryYear, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.SalaryWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: SalarySearchableFields.map((field: string) => {
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
          } as Prisma.SalaryWhereInput;
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
          } as Prisma.SalaryWhereInput;
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          } as Prisma.SalaryWhereInput;
        }
      }),
    } as Prisma.SalaryWhereInput);
  }

  //Salary Month

  if (salaryMonth) {
    andConditions.push({
      salaryMonth: salaryMonth,
    });
  }

  //Salary Year

  if (salaryYear) {
    andConditions.push({
      salaryYear: salaryYear,
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (SalaryRelationalFields.includes(key)) {
          return {
            [SalaryRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.SalaryWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.salary.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              joiningDate: true,
              jobTitle: true,
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
  const total = await prisma.salary.count({
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

const updateSalary = async (salaryId: string, payload: any): Promise<any> => {
  const findSalary = await prisma.salary.findUnique({
    where: {
      salaryId,
    },
  });

  if (!findSalary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Salary Not Found');
  }

  const findEmployee = await prisma.user.findUnique({
    where: {
      userId: findSalary.userId,
    },
  });

  if (!findEmployee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not Found');
  }

  if (findEmployee.profileId) {
    const findProfile = await prisma.profile.findUnique({
      where: {
        profileId: findEmployee.profileId,
      },
    });

    if (!findProfile) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Profile Not Found');
    }

    // Use payload value if present; otherwise, use value from findSalary
    const absentDeduction = payload.absentDeduction ?? findSalary.absentDeduction;
    const advanceSalaryDeduction = payload.advanceSalaryDeduction ?? findSalary.advanceSalaryDeduction;
    const mealAndMobileBillDeduction = payload.mealAndMobileBillDeduction ?? findSalary.mealAndMobileBillDeduction;

    // Calculate netPayableSalary and netSalary
    const netPayableSalary = findSalary.totalSalary - absentDeduction - advanceSalaryDeduction - mealAndMobileBillDeduction;
    const netSalary = netPayableSalary - (payload.tdsOnSalary ?? findSalary.tdsOnSalary);

    // Prepare updated data object
    const objData = {
      salaryMonth: payload?.salaryMonth ?? findSalary.salaryMonth,
      salaryYear: payload?.salaryYear ?? findSalary.salaryYear,
      userId: payload?.userId ?? findSalary.userId,
      absentDeduction,
      advanceSalaryDeduction,
      mealAndMobileBillDeduction,
      netSalary,
    };

    // Update the salary in the database
    const result = await prisma.salary.update({
      where: {
        salaryId: findSalary.salaryId,
      },
      data: objData, // Use objData to update the salary
    });

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Update Failed');
    }

    return result;
  }
};

export const SalaryService = {
  createSalary,
  getSalary,
  updateSalary,
};
