import { Request, Response } from 'express';
import { logFileService } from './logFIle.service';

const getLogController = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const logContent = await logFileService.getLatestLogFile(type);

    res.status(200).json({
      success: true,
      message: 'Log content retrieved successfully',
      data: logContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      //@ts-ignore
      message: error.message,
    });
  }
};

export const LogController = {
  getLogController,
};
