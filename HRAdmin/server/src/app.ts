import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(
  cors({
    // origin: 'http://85.31.225.190:3100',
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'http://157.173.108.109:3000',
      'http://157.173.108.109:3100',
      'http://192.168.0.109:3000',
      'http://192.168.0.102:3000',
      '*',
    ],
    credentials: true,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('data/uploads'));

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
