/* eslint-disable @typescript-eslint/no-explicit-any */
import { TackPack } from '@prisma/client';
import { Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';
import { ICreateTackPack, IUpdateTackPack } from './tackPack.interface';
import fs from 'fs';

// !----------------------------------Create TackPack---------------------------------------->>>
const createTackPack = async (profileId: string, req: Request): Promise<any> => {
  const file = req.file as IUploadFile;

  const filePath = file?.path?.substring(8);

  if (!filePath) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tack Pack pdf is required');
  }

  const { styleNo, tackPackComment } = req.body as ICreateTackPack;

  // check is exist style
  const isExistStyleNo = await prisma.styles.findFirst({
    where: {
      styleNo,
    },
    select: {
      styleNo: true,
      tackPack: true,
    },
  });
  if (!isExistStyleNo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style No not Found !!');
  }

  // !--------
  let result;

  if (isExistStyleNo?.tackPack !== null) {
    if (isExistStyleNo?.tackPack?.tackFile) {
      // deleting old file
      const oldFilePaths = 'uploads/' + isExistStyleNo?.tackPack?.tackFile;

      fs.unlink(oldFilePaths, err => {
        if (err) {
          console.log('Error deleting old file');
        }
      });
    }

    // updated data
    const updatedTackPackData: Partial<TackPack> = {};
    if (tackPackComment !== undefined) updatedTackPackData['tackPackComment'] = tackPackComment;
    if (filePath !== undefined) updatedTackPackData['tackFile'] = filePath;

    result = await prisma.tackPack.update({
      where: {
        styleNo,
      },
      data: { ...updatedTackPackData, profileId },
    });
  } else if (isExistStyleNo?.tackPack === null) {
    result = await prisma.tackPack.create({
      data: {
        profileId,
        tackFile: filePath,
        tackPackComment,
        styleNo,
      },
    });
  }

  return result;
};
// !----------------------------------Create TackPack---------------------------------------->>>
const getSingleTackPack = async (tackPackId: string): Promise<any> => {
  const result = await prisma.tackPack.findUnique({
    where: {
      tackPackId,
    },
  });

  // if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Tack Pack Not Found !');

  return result;
};
// !----------------------------------Create TackPack---------------------------------------->>>
const updateTackPack = async (profileId: string, tackPackId: string, req: Request): Promise<TackPack> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);

  const { tackPackComment } = req.body as IUpdateTackPack;

  // updated data
  const updatedTackPackData: Partial<TackPack> = {};
  if (tackPackComment !== undefined) updatedTackPackData['tackPackComment'] = tackPackComment;
  if (filePath !== undefined) updatedTackPackData['tackFile'] = filePath;

  const result = await prisma.tackPack.update({
    where: {
      tackPackId,
    },
    data: { ...updatedTackPackData, profileId },
  });

  return result;
};

export const TackPackService = {
  createTackPack,
  getSingleTackPack,
  updateTackPack,
};
