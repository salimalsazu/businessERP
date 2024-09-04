"use client";
import React from "react";
import { useGetTrailBalanceQuery } from "@/redux/api/features/groupApi";
import { DateRangePicker, Loader } from "rsuite";

const TrialBalanceSection = () => {
  const { data: tbData, isLoading: tbLoading } = useGetTrailBalanceQuery({});

  const allTbData = tbData?.data?.data ?? null;

  const handleFilterDate = (value: any) => {
    console.log("Date Range", value);
  };

  return (
    <div>
      <div>
        {tbLoading ? (
          <div className="flex justify-center items-center h-screen">
            {" "}
            <Loader size="md" content="Trail Balance" />{" "}
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-2xl font-bold mb-4">Trail Balance</h1>
              </div>
              <div>
                <DateRangePicker
                  // @ts-ignore
                  // ranges={predefinedRanges}
                  placement="auto"
                  onChange={(value: Date[] | null): void => {
                    handleFilterDate(value);
                  }}
                  onClean={() =>
                    handleFilterDate({
                      //@ts-ignore
                      startDate: "",
                      endDate: "",
                    })
                  }
                  size="lg"
                  style={{ width: 300 }}
                  placeholder="Filter By Date"
                />
              </div>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Particular
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Taka
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Particular
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Taka
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Render Debit and Credit data conditionally */}
                {allTbData?.debit?.map((debitGroup: any, index: any) => {
                  const creditGroup = allTbData.credit[index] || {};
                  return (
                    <tr key={index}>
                      {/* Debit Group and Subgroup Rows */}
                      <td className="border border-gray-200 px-4 py-2 align-top">
                        <strong>Group Name:</strong> {debitGroup.groupName}
                        <ul className="ml-4 list-disc">
                          {debitGroup.subGroup.map(
                            (subGroup: any, subIndex: any) => (
                              <li key={subIndex}>
                                <strong>Subgroup Name:</strong>{" "}
                                {subGroup.subGroupName}
                                <ul className="ml-4 list-disc">
                                  {subGroup.account.map(
                                    (account: any, accIndex: any) => (
                                      <li key={accIndex}>
                                        {account.accountName}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            )
                          )}
                        </ul>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 align-top text-right">
                        {debitGroup.subGroup.map((subGroup: any) => (
                          <ul
                            key={subGroup.subGroupName}
                            className="ml-4 list-none"
                          >
                            {subGroup.account.map((account: any) => (
                              <li key={account.accountName}>
                                {account.closingBalance.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        ))}
                      </td>

                      {/* Credit Group and Subgroup Rows */}
                      <td className="border border-gray-200 px-4 py-2 align-top">
                        {creditGroup.groupName && (
                          <>
                            <strong>Group Name:</strong> {creditGroup.groupName}
                            <ul className="ml-4 list-disc">
                              {creditGroup.subGroup.map(
                                (subGroup: any, subIndex: any) => (
                                  <li key={subIndex}>
                                    <strong>Subgroup Name:</strong>{" "}
                                    {subGroup.subGroupName}
                                    <ul className="ml-4 list-disc">
                                      {subGroup.account.map(
                                        (account: any, accIndex: any) => (
                                          <li key={accIndex}>
                                            {account.accountName}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                )
                              )}
                            </ul>
                          </>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 align-top text-right">
                        {creditGroup.subGroup &&
                          creditGroup.subGroup.map((subGroup: any) => (
                            <ul
                              key={subGroup.subGroupName}
                              className="ml-4 list-none"
                            >
                              {subGroup.account.map((account: any) => (
                                <li key={account.accountName}>
                                  {account.closingBalance.toFixed(2)}
                                </li>
                              ))}
                            </ul>
                          ))}
                      </td>
                    </tr>
                  );
                })}
                {/* Total Row */}
                <tr>
                  <td className="border border-gray-200 px-4 py-2 font-bold">
                    Total Debit
                  </td>
                  <td className="border border-gray-200 px-4 py-2 font-bold text-right">
                    {allTbData?.totalDebit?.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 font-bold">
                    Total Credit
                  </td>
                  <td className="border border-gray-200 px-4 py-2 font-bold text-right">
                    {allTbData?.totalCredit?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrialBalanceSection;
