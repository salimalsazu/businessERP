/* eslint-disable no-undef */
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

// Custom Log Format

// const myFormat = printf(({ level, message, timestamp }) => {
//   const date = new Date(timestamp);
//   const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
//     hour12: true,
//   });

//   return `📅${date.toDateString()}  ⏲${formattedTime} ▶ ${level}: ${message} `;
// });

// const logger = createLogger({
//   level: 'info',
//   format: combine(label({ label: 'HR' }), timestamp(), myFormat),
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'HR-%DATE%-success.log'),
//       datePattern: 'YYYY-DD-MM-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '30d',
//     }),
//   ],
// });

// Custom Log Format
const myFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: true,
  });

  return `📅${date.toDateString()}  ⏲${formattedTime} ▶ ${level}: ${message} `;
});

//Logger Format
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'HR' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'HR-%DATE%-success.log'),
      datePattern: 'YYYY-MM-DD', // Daily log pattern
      zippedArchive: false, // No compression
      maxFiles: '14d', // Keep logs for 14 days
    }),
  ],
});

const errorFormat = printf(({ level, message, timestamp, ...srv }) => {
  const date = new Date(timestamp);
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: true,
  });

  return `📅${date.toDateString()}  ⏲${formattedTime} ▶ ${level}: ${message} 😟 statusCode: ${srv?.statusCode || '400'}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'HR' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'info', 'HR-%DATE%-info.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'HR' }), timestamp(), errorFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'HR-%DATE%-error.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

export { logger, errorLogger, infoLogger };
