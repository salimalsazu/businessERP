"use client";

import React, { useState } from "react";
import { Button, Loader, Table, Tabs } from "rsuite";
import { useDebounced } from "@/redux/hooks";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import { useGetGroupQuery } from "@/redux/api/features/groupApi";
import AddGroupDrawer from "./AddGroupDrawer";
import AddSubGroupDrawer from "./AddSubGroupDrawer";
import TrashIcon from "@rsuite/icons/Trash";
import AccountModal from "./AccountModal";

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

  console.log("allGroupData", allGroupData);

  //Add Group Drawer
  const [backdropDrawer, setBackdropDrawer] = React.useState("static");
  const [openGroupDrawer, setOpenGroupDrawer] = React.useState(false);

  //Add Sub Group Drawer
  const [backdropDrawerSubGroup, setBackdropDrawerSubGroup] =
    React.useState("static");
  const [openSubGroupDrawer, setOpenSubGroupDrawer] = React.useState(false);

  //Modal

  const [openModal, setOpenModal] = useState(false);
  const [sizeModal, setSizeModal] = useState();

  const [accountData, setAccountData] = useState<any>([]);

  const handleOpenModal = (value: any, subGroup: any) => {
    setSizeModal(value);
    setOpenModal(true);
    setAccountData(subGroup.account);
  };
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between gap-2 ">
        <div className="flex items-center gap-5">
          {/* <div className="w-[300px]">
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
          </div> */}
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

      <div className="mx-3">
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <Loader size="md" content="Loading All Accounts" />
          </div>
        )}

        {!isLoading && !error && allGroupData?.data?.data?.length > 0 && (
          <Tabs
            defaultActiveKey={allGroupData.data.data[0].groupId}
            appearance="subtle"
            className="text-2xl flex gap-2"
          >
            {allGroupData.data.data.map((group: any) => (
              <Tabs.Tab
                key={group.groupId}
                eventKey={group.groupId}
                title={group.groupName}
              >
                {/* You can decide what to do inside the tab later */}
                <div className="flex item-center gap-3 ">
                  {group.subGroup.map((subGroup: any) => (
                    <Button
                      key={subGroup.subGroupId}
                      appearance="primary"
                      onClick={() => handleOpenModal("md", subGroup)}
                    >
                      {subGroup.subGroupName}
                    </Button>
                  ))}
                </div>
              </Tabs.Tab>
            ))}
          </Tabs>
        )}
      </div>
      <div>
        <AccountModal
          size={sizeModal}
          open={openModal}
          handleClose={handleCloseModal}
          data={accountData}
        />
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
