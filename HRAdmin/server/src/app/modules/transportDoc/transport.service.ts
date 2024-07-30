/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, TransportDoc, docStatus } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { TransportDocRelationalFields, TransportDocRelationalFieldsMapper, transportSearchableFields } from './transport.constants';
import { ITransportDocCreateRequest, ITransportDocFilterRequest, ITransportDocUpdateRequest } from './transport.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';
import { errorLogger } from '../../../shared/logger';
import { Request } from 'express';
import fs from 'fs';

// modules

const addTransportDoc = async (req: Request): Promise<TransportDoc> => {
  //@ts-ignore
  const file = req.file as IUploadFile;

  const filePath = file?.path?.substring(13);

  //@ts-ignore
  const data = req.body as ITransportDocCreateRequest;

  const result = await prisma.$transaction(async transactionClient => {
    const isVehicleExist = await prisma.vehicleAdd.findUnique({
      where: {
        vehicleId: data.vehicleId,
      },
    });

    if (!isVehicleExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Vehicle Not Found');
    }

    // order data
    const newData: any = {
      docExpiryDate: data.docExpiryDate,
      docName: data.docName,
      docNumber: data.docNumber,
      docStatus: docStatus.Valid,
      note: data.note,
      vehicleId: isVehicleExist.vehicleId,
      docFile: filePath,
    };

    // if (filePath !== undefined) newData['orderFile'] = filePath;

    // Create the new order
    const transportDoc = await transactionClient.transportDoc.create({
      data: newData,
    });

    if (!transportDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order creation failed');
    }

    return transportDoc;
  });

  return result;
};

// !----------------------------------get all Courier---------------------------------------->>>
const getTransportDoc = async (filters: ITransportDocFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<TransportDoc[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, vehicleName, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.TransportDocWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: transportSearchableFields.map((field: any) => ({
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
        if (TransportDocRelationalFields.includes(key)) {
          return {
            [TransportDocRelationalFieldsMapper[key]]: {
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
      docExpiryDate: {
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
  const whereConditions: Prisma.TransportDocWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.transportDoc.findMany({
    include: {
      vehicleAdd: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.transportDoc.count({
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

const updateTransportDoc = async (transportDocId: string, req: Request): Promise<TransportDoc> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(13);

  const { docName, docNumber, docExpiryDate, vehicleId, docStatus, note, oldFilePath } = req.body as ITransportDocUpdateRequest;

  const oldFilePaths = 'uploads/' + oldFilePath;
  // Deleting old style Image
  if (oldFilePaths !== undefined && filePath !== undefined) {
    // @ts-ignore
    fs.unlink(oldFilePaths, err => {
      if (err) {
        errorLogger.error('Error deleting old file');
      }
    });
  }

  const result = await prisma.$transaction(async transactionClient => {
    const existingDoc = await transactionClient.transportDoc.findUnique({
      where: {
        transportDocId,
      },
    });

    if (!existingDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Doc Not Found!!');
    }

    const updatedDetails = {
      docExpiryDate,
      docName,
      docNumber,
      docStatus,
      note,
      vehicleId,
      docFile: filePath,
    };

    const updatedDoc = await transactionClient.transportDoc.update({
      where: {
        transportDocId,
      },
      data: updatedDetails,
    });

    return updatedDoc;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Doc Information');
  }

  return result;
};

export const TransportDocService = {
  addTransportDoc,
  getTransportDoc,
  updateTransportDoc,
};
