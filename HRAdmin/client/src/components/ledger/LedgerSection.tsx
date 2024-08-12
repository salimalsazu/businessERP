"use client";
import { useGetAccountQuery } from "@/redux/api/features/accountApi";
import { useGetRequisitionQuery } from "@/redux/api/features/requisitionApi";
import { headerCss } from "@/utils/TableCSS";
import moment from "moment";
import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  InputPicker,
  Pagination,
  Table,
  Whisper,
} from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";

const LedgerSection = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  console.log("searchTerm", searchTerm);

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

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

  // State for totals
  const [totals, setTotals] = useState({ totalDebit: 0, totalCredit: 0 });

  // Calculate transactions and totals
  const { transactions } = useMemo(() => {
    let totalDebit = 0;
    let totalCredit = 0;

    const filteredTransactions = searchTerm
      ? allAccountList?.data?.data
          ?.filter((account: any) =>
            account.accountName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          ?.flatMap((account: any) => [
            // Handle credit transactions
            ...(account.transactionCredit || []).map((transaction: any) => {
              totalCredit += transaction.transactionAmount; // Accumulate credit amount
              return {
                date: transaction.debitAccount?.createdAt.split("T")[0], // Date from debitAccount's createdAt
                particular: transaction.debitAccount?.accountName, // Account name of the related debitAccount
                trID: transaction.trId,
                transactionId: transaction.transactionId,
                debit: "-",
                credit: transaction.transactionAmount,
              };
            }),
            // Handle debit transactions
            ...(account.transactionDebit || []).map((transaction: any) => {
              totalDebit += transaction.transactionAmount; // Accumulate debit amount
              return {
                date: transaction.creditAccount?.createdAt.split("T")[0], // Date from creditAccount's createdAt
                particular: transaction.creditAccount?.accountName, // Account name of the related creditAccount
                trID: transaction.trId,
                transactionId: transaction.transactionId,
                debit: transaction.transactionAmount,
                credit: "-",
              };
            }),
          ])
      : [];

    setTotals({ totalDebit, totalCredit });

    return { transactions: filteredTransactions };
  }, [allAccountList, searchTerm]);

  //Checked Box
  const checkedBoxData = allAccountList?.data?.data?.filter((obj: any) =>
    checkedKeys.includes(obj.requisitionId)
  );

  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === allAccountList?.data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < allAccountList?.data?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? allAccountList?.data?.map((item: any) => item.requisitionId)
      : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value: any, check: any) => {
    const keys = check
      ? [...checkedKeys, value]
      : checkedKeys.filter((item: any) => item !== value);
    setCheckedKeys(keys);
  };

  const CheckCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }: any) => {
    return (
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gray-100 rounded-sm m-5 p-5">
        <div className="my-5 mx-2 flex flex-col-reverse gap-10">
          <div className="flex items-center gap-5">
            <div className="w-full">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none w-full">
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
                <InputPicker
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  onChange={setSearchTerm}
                  data={searchAccount}
                  block
                  id="searchTerm"
                  className="w-full"
                  loading={isLoading || isFetching}
                  placeholder="Search with Ledger Name"
                />
              </div>
            </div>
          </div>

          {/* Add Ledger */}
          <div className="flex items-center justify-end gap-2">
            <div>
              <Button
                className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
                type="button"
                // onClick={handleOpen}
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
                <span className="text-sm font-semibold">Add Ledger</span>
              </Button>
            </div>
            <div>
              <Button
                className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
                type="button"
                // onClick={handleOpen}
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
                <span className="text-sm font-semibold">Add Transaction</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={transactions}
          >
            <Column width={50} align="center" verticalAlign="middle">
              <HeaderCell style={headerCss}>
                <div style={{ lineHeight: "40px" }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>

              <Cell>
                {(rowData) => (
                  <div>
                    <CheckCell
                      dataKey="requisitionId"
                      rowData={rowData}
                      checkedKeys={checkedKeys}
                      onChange={handleCheck}
                    />
                  </div>
                )}
              </Cell>
            </Column>

            {/* SL No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>SL</HeaderCell>
              <Cell
                dataKey="sl"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData, rowIndex: any) => <span>{rowIndex + 1}</span>}
              </Cell>
            </Column>

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Transaction Date</HeaderCell>
              <Cell
                dataKey="date"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) =>
                  ` ${moment(rowData.requisitionDate).format("ll")}`
                }
              </Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={4}>
              <HeaderCell style={headerCss}>Particular</HeaderCell>
              <Cell
                dataKey="particular"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => ` ${rowData.particular}`}
              </Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>TR No</HeaderCell>
              <Cell
                dataKey="trID"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Transaction Id</HeaderCell>
              <Cell
                dataKey="transactionId"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Debit</HeaderCell>
              <Cell
                dataKey="debit"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Status*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Credit</HeaderCell>
              <Cell
                dataKey="chequeDate"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => ` ${rowData.credit}`}
              </Cell>
            </Column>
          </Table>

          <div
            style={{
              marginTop: "20px",
              textAlign: "right",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <div>Total Debit: {totals.totalDebit.toFixed(2)}</div>
            <div>Total Credit: {totals.totalCredit.toFixed(2)}</div>
          </div>

          <div style={{ padding: "20px 10px 0px 10px" }}>
            <Pagination
              total={allAccountList?.data?.meta?.total}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="lg"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[10, 20, 30, 50]}
              limit={size}
              onChangeLimit={(limitChange) => setSize(limitChange)}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerSection;
