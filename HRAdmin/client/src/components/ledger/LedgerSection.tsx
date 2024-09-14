"use client";
import { useGetAccountQuery } from "@/redux/api/features/accountApi";
import { headerCss } from "@/utils/TableCSS";
import moment from "moment";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button, InputPicker } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import AddTransactionSection from "./AddTransaction";
import AddLedgerSection from "./AddLedger";

const LedgerSection = () => {
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(300);
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;

  // ! fetching data
  const {
    data: allAccountList,
    isLoading,
    isFetching,
  } = useGetAccountQuery({ ...query });

  const searchAccount = allAccountList?.data?.data?.map((account: any) => ({
    label: account.accountName,
    value: account.accountName,
  }));

  //Drawer

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <div className=" rounded-sm m-5 p-5">
        <div className="my-5 mx-2 flex flex-col-reverse gap-10">
          <div className="flex items-center gap-5 shadow-sm border p-5">
            <div className="w-full">
              <div>
                <InputPicker
                  onChange={setSearchTerm}
                  data={searchAccount}
                  block
                  id="searchTerm"
                  className="w-full"
                  loading={isLoading || isFetching}
                  placeholder="Search with Ledger / Account Name"
                />
              </div>
            </div>
            <div className="flex justify-end items-center my-2">
              {searchTerm && (
                <Link href={`/ledger/${searchTerm}`} legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    <Button appearance="primary">Details</Button>
                  </a>
                </Link>
              )}
            </div>
          </div>

          {/* Add Ledger */}
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
                <span className="text-sm font-semibold">
                  Add Ledger/Account
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Add Ledger & Account Form */}
        <div>
          <AddLedgerSection
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
        </div>

        {/* Transaction Form */}
        <div className="shadow-sm border p-5">
          <AddTransactionSection />
        </div>
      </div>
    </div>
  );
};

export default LedgerSection;
