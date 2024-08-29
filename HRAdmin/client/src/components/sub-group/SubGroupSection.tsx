"use client";

import React, { useState } from "react";
import { Button, Loader, Table } from "rsuite";
import { useDebounced } from "@/redux/hooks";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import { useGetGroupQuery } from "@/redux/api/features/groupApi";
import AddGroupDrawer from "./AddGroupDrawer";
import AddSubGroupDrawer from "./AddSubGroupDrawer";

const SubGroupSectionTable = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  query["limit"] = size;
  query["page"] = page;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allGroupData,
    isLoading,
    error,
  } = useGetGroupQuery({ ...query });

  console.log("data", allGroupData?.data?.data);

  const rows: any = [];
  // Keep track of the last group and subgroup to handle rowspan correctly
  let lastGroup: any = null;
  let lastSubGroup: any = null;

  // Iterate over all groups
  // allGroupData?.data?.data.forEach((group: any, groupIndex: any) => {
  //   // Check if the current group is different from the last one
  //   if (group.groupName !== lastGroup) {
  //     // Check if the group has subgroups
  //     if (group.subGroup && group.subGroup.length > 0) {
  //       group.subGroup.forEach((subGroup: any, subGroupIndex: any) => {
  //         // Check if the current subgroup is different from the last one
  //         if (subGroup.subGroupName !== lastSubGroup) {
  //           rows.push(
  //             <tr key={`group-${groupIndex}-subgroup-${subGroupIndex}`}>
  //               {subGroupIndex === 0 && (
  //                 <td
  //                   className="bg-gray-50 font-semibold text-left px-4 py-2"
  //                   rowSpan={group.subGroup.length}
  //                 >
  //                   {group.groupName}
  //                 </td>
  //               )}
  //               <td
  //                 className="bg-gray-100 font-semibold text-left px-4 py-2"
  //                 rowSpan={subGroup.account.length}
  //               >
  //                 {subGroup.subGroupName}
  //               </td>
  //               <td className="px-4 py-2">
  //                 {subGroup?.account[0]?.accountName}
  //               </td>
  //             </tr>
  //           );

  //           // Push additional account rows if there are more than one
  //           subGroup.account
  //             .slice(1)
  //             .forEach((account: any, accountIndex: any) => {
  //               rows.push(
  //                 <tr
  //                   key={`account-${groupIndex}-${subGroupIndex}-${accountIndex}`}
  //                 >
  //                   <td className="px-4 py-2">{account.accountName}</td>
  //                 </tr>
  //               );
  //             });

  //           // Update the last subgroup to the current one
  //           lastSubGroup = subGroup.subGroupName;
  //         }
  //       });
  //     } else {
  //       // No subgroups, just add the group row
  //       rows.push(
  //         <tr key={`group-${groupIndex}`}>
  //           <td
  //             className="bg-gray-50 font-semibold text-left px-4 py-2"
  //             rowSpan={1}
  //           >
  //             {group.groupName}
  //           </td>
  //           <td colSpan={2} className="px-4 py-2 text-center">
  //             No Subgroups
  //           </td>
  //         </tr>
  //       );
  //     }

  //     // Update the last group to the current one
  //     lastGroup = group.groupName;
  //   }
  // });

  allGroupData?.data?.data.forEach((group: any, groupIndex: any) => {
    // Calculate the total number of rows for the group (sum of all accounts in each subgroup)
    const groupRowCount = group.subGroup.reduce(
      (count: number, subGroup: any) =>
        count + Math.max(subGroup.account.length, 1),
      0
    );

    // Render the group only once and span all its subgroups and accounts
    let isGroupRendered = false;

    if (group.subGroup && group.subGroup.length > 0) {
      group.subGroup.forEach((subGroup: any, subGroupIndex: any) => {
        // Calculate the total number of rows for the subgroup (number of accounts or 1 if empty)
        const subGroupRowCount = Math.max(subGroup.account.length, 1);

        // Render the group row only once per group
        if (!isGroupRendered) {
          rows.push(
            <tr key={`group-${groupIndex}`}>
              <td
                className="bg-gray-50 font-semibold text-left px-4 py-2"
                rowSpan={groupRowCount} // Span all subgroup rows under this group
              >
                {group.groupName}
              </td>
              <td
                className="bg-gray-100 font-semibold text-left px-4 py-2"
                rowSpan={subGroupRowCount} // Span all account rows under this subgroup
              >
                {subGroup.subGroupName}
              </td>
              <td className="px-4 py-2">
                {subGroup.account[0]?.accountName || "No Accounts"}
              </td>
            </tr>
          );
          isGroupRendered = true;
        } else {
          // Render only the subgroup and accounts for other subgroups
          rows.push(
            <tr key={`subgroup-${groupIndex}-${subGroupIndex}`}>
              <td
                className="bg-gray-100 font-semibold text-left px-4 py-2"
                rowSpan={subGroupRowCount} // Span all account rows under this subgroup
              >
                {subGroup.subGroupName}
              </td>
              <td className="px-4 py-2">
                {subGroup.account[0]?.accountName || "No Accounts"}
              </td>
            </tr>
          );
        }

        // Render remaining accounts for the subgroup if any
        subGroup.account.slice(1).forEach((account: any, accountIndex: any) => {
          rows.push(
            <tr key={`account-${groupIndex}-${subGroupIndex}-${accountIndex}`}>
              <td className="px-4 py-2">{account.accountName}</td>
            </tr>
          );
        });
      });
    } else {
      // No subgroups, just add the group row
      rows.push(
        <tr key={`group-${groupIndex}`}>
          <td
            className="bg-gray-50 font-semibold text-left px-4 py-2"
            rowSpan={1}
          >
            {group.groupName}
          </td>
          <td colSpan={2} className="px-4 py-2 text-center">
            No Subgroups
          </td>
        </tr>
      );
    }
  });

  //Add Group Drawer
  const [backdropDrawer, setBackdropDrawer] = React.useState("static");
  const [openGroupDrawer, setOpenGroupDrawer] = React.useState(false);

  //Add Sub Group Drawer
  const [backdropDrawerSubGroup, setBackdropDrawerSubGroup] =
    React.useState("static");
  const [openSubGroupDrawer, setOpenSubGroupDrawer] = React.useState(false);

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
              onClick={() => setOpenGroupDrawer(true)}
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
              onClick={() => setOpenSubGroupDrawer(true)}
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
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader size="md" content="All Accounts" />
          </div>
        ) : (
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Sub Group
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Account
                </th>
              </tr>
            </thead>
            {!allGroupData?.data?.data?.length ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              rows
            )}
          </table>
        )}
      </div>

      <div>
        <AddGroupDrawer
          setOpenGroupDrawer={setOpenGroupDrawer}
          openGroupDrawer={openGroupDrawer}
          backdropDrawer={backdropDrawer}
        />
      </div>

      <div>
        <AddSubGroupDrawer
          backdropDrawerSubGroup={backdropDrawerSubGroup}
          openSubGroupDrawer={openSubGroupDrawer}
          setOpenSubGroupDrawer={setOpenSubGroupDrawer}
        />
      </div>
    </div>
  );
};

export default SubGroupSectionTable;
