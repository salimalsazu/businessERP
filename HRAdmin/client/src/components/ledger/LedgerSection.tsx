"use client";

import { useGetRequisitionQuery } from "@/redux/api/features/requisitionApi";
import { headerCss } from "@/utils/TableCSS";
import { useState } from "react";
import { Button, Checkbox, Pagination, Table, Whisper } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";

const LedgerSection = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

    // ! fetching data
    const {
      data: allRequisitionList,
      isLoading,
      isFetching,
    } = useGetRequisitionQuery({ ...query });

  const checkedBoxData = allRequisitionList?.data?.filter((obj: any) =>
    checkedKeys.includes(obj.requisitionId)
  );

  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === allRequisitionList?.data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < allRequisitionList?.data?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? allRequisitionList?.data?.map((item: any) => item.requisitionId)
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
                <input
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  id="searchTerm"
                  className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB] w-full pl-10 py-2 rounded-lg focus:outline-none "
                  placeholder="Search with Ledger Name"
                  required
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
            // loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            // data={allRequisitionList?.data}
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
              <HeaderCell style={headerCss}>Requisition Date</HeaderCell>
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
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Account</HeaderCell>
              <Cell
                // dataKey="title"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => ` ${rowData.account?.accountName}`}
              </Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Details</HeaderCell>
              <Cell
                dataKey="details"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Bank Name</HeaderCell>
              <Cell
                dataKey="bankName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Cheque No </HeaderCell>
              <Cell
                dataKey="chequeNo"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Status*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Cheque Date</HeaderCell>
              <Cell
                dataKey="chequeDate"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => ` ${moment(rowData.chequeDate).format("ll")}`}
              </Cell>
            </Column>

            {/* Status*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Amount Type</HeaderCell>
              <Cell
                dataKey="amountType"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>
            {/* Status*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Status</HeaderCell>
              <Cell
                dataKey="status"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => (
                  <div className="flex items-center gap-2">
                    {rowData.status}
                    <IconButton
                      appearance="primary"
                      icon={<EditIcon />}
                      circle
                      onClick={() => {
                        handleOpenStatusModal();
                        setStatusData(rowData);
                      }}
                    />
                  </div>
                )}
              </Cell>
            </Column>
          </Table>

          <div style={{ padding: "20px 10px 0px 10px" }}>
            <Pagination
              // total={allRequisitionList?.meta?.total}
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
