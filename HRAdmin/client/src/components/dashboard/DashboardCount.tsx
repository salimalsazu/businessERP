"use client";

import { useGetAllCountQuery } from "@/redux/api/features/dashboardApi";
import { Loader } from "rsuite";

const DashboardCount = () => {
  //@ts-ignore
  const { data: dataCount, isLoading } = useGetAllCountQuery("");

  console.log("Count", dataCount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-3 lg:m-3 m-2">
      <div className="flex flex-col justify-center items-center gap-2 px-5 py-8 bg-lime-50 shadow-md rounded-md">
        <h1 className="text-4xl font-bold">Requisition</h1>
        <div className="text-lg font-extrabold">
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <p>{dataCount?.data?.requisitionCount}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 px-5 py-8 bg-lime-50 shadow-md rounded-md">
        <h1 className="text-4xl font-bold">Account</h1>
        <div className="text-lg font-extrabold">
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <p>{dataCount?.data?.accountCount}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 px-5 py-8 bg-lime-50 shadow-md rounded-md">
        <h1 className="text-4xl font-bold">Transaction</h1>
        <div className="text-lg font-extrabold">
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <p>{dataCount?.data?.transactionCount}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCount;
