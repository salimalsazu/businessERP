// utils/sendResponse.js

export const sendResponse = (res:any, { statusCode, success, message, data }:any) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
