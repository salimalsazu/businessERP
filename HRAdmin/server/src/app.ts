import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';
import fs from 'fs';

const app: Application = express();

// create uploads directory while starting the application
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Create user directory in the /uploads path while starting the application
if (!fs.existsSync('./uploads/users')) {
  fs.mkdirSync('./uploads/users');
}
// Create tack pack directory in the /uploads path while starting the application
if (!fs.existsSync('./uploads/tackpack')) {
  fs.mkdirSync('./uploads/tackpack');
}
// Create styles directory in the /uploads path while starting the application
if (!fs.existsSync('./uploads/styles')) {
  fs.mkdirSync('./uploads/styles');
}

app.use(
  cors({
    // origin: 'http://85.31.225.190:3100',
    origin: 'http://localhost:3100',
    credentials: true,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));

app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
