import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import httpStatus from "http-status";
import globalExceptionHandler from "./app/middlewares/globalExceptionHandler";
import routes from "./app/routes";

const app: Application = express();

app.use(
  cors({
    // origin: 'http://85.31.225.190:3100',
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://157.173.108.109:3000",
      "http://157.173.108.109:3100",
      "http://192.168.0.109:3000",
      "http://192.168.0.102:3000",
      "https://account.24-7sourcingbd.com",
      "*",
    ],
    //credentials
    credentials: true,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(globalExceptionHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    errorMessages: [
      {
        path: "",
        message: "API not found",
      },
    ],
  });
});

export default app;
