import {
  IGenericErrorResponse,
  ResponseSuccessType,
  authKey,
} from "@/constant/common";
import axios from "axios";
import { getFromLocalStorage } from "../utils";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    if (error?.response?.status === 403) {
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessages: error?.response?.data?.message,
      };
      // console.log(error?.response?.status, "ssssssssssssss");
      throw responseObject;
    }

    // return Promise.reject(error);
  }
);

export { instance };
