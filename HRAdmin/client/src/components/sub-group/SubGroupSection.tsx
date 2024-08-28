"use client";

import {
    Button,
  ButtonToolbar,
  Checkbox,
  DateRangePicker,
  Dropdown,
  IconButton,
  Pagination,
  Popover,
  Table,
  Whisper,
} from "rsuite";
import { useState } from "react";
import { LiaFileExportSolid } from "react-icons/lia";
import { useDebounced } from "@/redux/hooks";

const SubGroupSectionTable = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

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

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between gap-2 w-full">
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

        <div className="flex items-center justify-end gap-2">
          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
              onClick={() => setOpenDrawer(true)}
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
              <span className="text-sm font-semibold">Add Ledger/Account</span>
            </Button>
          </div>
        </div>
      </div>

      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full"></div>
    </div>
  );
};

export default SubGroupSectionTable;
