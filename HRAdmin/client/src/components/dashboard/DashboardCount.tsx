"use client";

import { useGetAllCountQuery } from "@/redux/api/features/dashboardApi";
import { Loader } from "rsuite";

const DashboardCount = () => {
  //@ts-ignore
  const { data: dataCount, isLoading } = useGetAllCountQuery("");

  console.log("Count", dataCount);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-3 lg:m-3 m-2">
        <div>
          {isLoading ? (
            <div className="rounded overflow-hidden shadow-lg bg-white p-4">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>

                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 px-5 py-8 bg-lime-50 shadow-md rounded-md">
              <h1 className="text-4xl font-bold">Requisition</h1>
              <div className="text-lg font-extrabold">
                <p>{dataCount?.data?.requisitionCount}</p>
              </div>
            </div>
          )}
        </div>
        <div>
          {isLoading ? (
            <div className=" rounded overflow-hidden shadow-lg bg-white p-4">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
        <div>
          {isLoading ? (
            <div className=" rounded overflow-hidden shadow-lg bg-white p-4">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-3 lg:m-3 m-2">
        <div>
          {isLoading ? (
            <div className="rounded overflow-hidden shadow-lg bg-white p-4">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>

                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 px-5 py-8 bg-lime-50 shadow-md rounded-md">
              <h1 className="text-4xl font-bold">Cash Balance</h1>
              <div className="text-lg font-extrabold">
                <p>{dataCount?.data?.pettyCashBalance?.closingBalance}</p>
              </div>
            </div>
          )}
        </div>
        <div>
          {isLoading ? (
            <div className="rounded overflow-hidden shadow-lg bg-white p-4">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>

                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 px-5 py-8 bg-lime-50 shadow-md rounded-md">
              <h1 className="text-4xl font-bold">Bank Balance</h1>
              <div className="text-lg font-extrabold">
                <p>{dataCount?.data?.bankBalance?.closingBalance}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCount;
