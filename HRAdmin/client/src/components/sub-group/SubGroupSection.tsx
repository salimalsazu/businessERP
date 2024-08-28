"use client";

import React, { useState } from "react";
import { Button, Table } from "rsuite";
import { useDebounced } from "@/redux/hooks";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";

const SubGroupSectionTable = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  // for queries
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;
  query["limit"] = size;
  query["page"] = page;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const data = [
    { id: 1, group: "Asset", subGroup: "Current Asset", account: "Petty Cash" },
    {
      id: 1.1,
      group: "Asset",
      subGroup: "Current Asset",
      account: "Bank Account",
    },
    {
      id: 1.1,
      group: "Asset",
      subGroup: "Current Asset",
      account: "Account Receivable",
    },
    {
      id: 2,
      group: "Asset",
      subGroup: "Fixed Asset",
      account: "Office Equipment",
    },
    {
      id: 2.1,
      group: "Asset",
      subGroup: "Fixed Asset",
      account: "Catering and Cutleries",
    },
    {
      id: 4,
      group: "Liabilities",
      subGroup: "Current Liabilities",
      account: "Accounts Payable",
    },
    {
      id: 5,
      group: "Liabilities",
      subGroup: "Non-Current Liabilities",
      account: "CD Account",
    },
  ];

  const rows: any = [];
  let lastGroup = "";
  let lastSubGroup = "";

  data.forEach((item, index) => {
    if (item.group !== lastGroup) {
      rows.push(
        <tr key={`group-${index}`}>
          <td
            className="bg-gray-50 font-semibold text-left px-4 py-2"
            rowSpan={data.filter((d) => d.group === item.group).length}
          >
            {item.group}
          </td>
          <td
            className="bg-gray-100 font-semibold text-left px-4 py-2"
            rowSpan={data.filter((d) => d.subGroup === item.subGroup).length}
          >
            {item.subGroup}
          </td>
          <td className="px-4 py-2">{item.account}</td>
        </tr>
      );
      lastGroup = item.group;
      lastSubGroup = item.subGroup;
    } else if (item.subGroup !== lastSubGroup) {
      rows.push(
        <tr key={`subgroup-${index}`}>
          <td
            className="bg-gray-100 font-semibold text-left px-4 py-2"
            rowSpan={data.filter((d) => d.subGroup === item.subGroup).length}
          >
            {item.subGroup}
          </td>
          <td className="px-4 py-2">{item.account}</td>
        </tr>
      );
      lastSubGroup = item.subGroup;
    } else {
      rows.push(
        <tr key={`account-${index}`}>
          <td className="px-4 py-2">{item.account}</td>
        </tr>
      );
    }
  });

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between gap-2 ">
        <div className="flex items-center gap-5">
          <div className="w-[300px]">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#919eab"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                id="searchTerm"
                className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB]   w-full pl-10 py-2 rounded-lg focus:outline-none"
                placeholder="Search with Name"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#fff"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span className="text-sm font-semibold">Add Group</span>
            </Button>
          </div>
          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#fff"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span className="text-sm font-semibold">Add Sub Group</span>
            </Button>
          </div>
        </div>
      </div>

      {/* main section for table */}
      <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Group</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Sub Group
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Account
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SubGroupSectionTable;
