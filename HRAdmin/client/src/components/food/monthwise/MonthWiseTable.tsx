"use client";

import {
  Button,
  ButtonToolbar,
  DatePicker,
  Dropdown,
  Modal,
  Pagination,
  Placeholder,
  Popover,
  Table,
  Whisper,
} from "rsuite";
import { useState } from "react";
import DocPassIcon from "@rsuite/icons/DocPass";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import { saveExcel } from "./ExcepReport";
import AddExpensesModal from "./AddExpensesModal";
import { headerCss } from "../../../utils/TableCSS";

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    sl: 1,
    month: "January",
    jobId: 10,
    employeeName: "Salim Al Sazu",
    launch: 5,
    mealRate: 18.5,
    totalCost: 120.0,
  },
  {
    sl: 2,
    month: "January",
    jobId: 8,
    employeeName: "Tafseer Al Yaad",
    launch: 4,
    mealRate: 18.5,
    totalCost: 98.0,
  },
];

const MonthWiseTable = () => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  // Modal

  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const getData = () => {
  //   if (sortColumn && sortType) {
  //     return data.sort((a: any, b: any) => {
  //       let x = a[sortColumn];
  //       let y = b[sortColumn];
  //       if (typeof x === "string") {
  //         x = x.charCodeAt();
  //       }
  //       if (typeof y === "string") {
  //         y = y.charCodeAt();
  //       }
  //       if (sortType === "asc") {
  //         return x - y;
  //       } else {
  //         return y - x;
  //       }
  //     });
  //   }
  //   return data;
  // };

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  //Report Generate

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            // disabled={!isLoading && !allOrders?.data?.length}
            onClick={saveExcel}
            eventKey={4}
          >
            Export to Excel
          </Dropdown.Item>
          <Dropdown.Item
            // disabled={!isLoading && !allOrders?.data?.length}
            onClick={saveExcel}
            eventKey={4}
          >
            Save to PDF
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <div className="">
      <div className="my-5 flex justify-between mx-2 ">
        <div className="flex items-center gap-5">
          <div className="w-[400px]">
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
                //   onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                id="searchTerm"
                className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB]   w-full pl-10 py-2 rounded-lg focus:outline-none"
                placeholder="Search with Name"
                required
              />
            </div>
          </div>
          <div>
            <DatePicker
              size="md"
              format="yyyy-MM"
              ranges={[]}
              style={{ width: 250 }}
              placeholder="Filter By Month"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div>
            <ButtonToolbar>
              <Whisper
                placement="bottomEnd"
                speaker={renderMenu}
                trigger={["click"]}
              >
                <Button
                  appearance="default"
                  className="!bg-secondary  outline outline-1 font-medium text-gray-700 !rounded "
                  // color="blue"
                  startIcon={<DocPassIcon className="text-sm" />}
                  endIcon={<ArrowDownLineIcon className="text-xl" />}
                >
                  Report
                </Button>
              </Whisper>
            </ButtonToolbar>
          </div>

          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
              onClick={handleOpen}
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
              <span className="text-sm font-semibold">Add Expense</span>
            </Button>
          </div>
        </div>
      </div>

      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full border">
        <>
          <Table
            rowHeight={60}
            headerHeight={48}
            autoHeight={true}
            data={data}
            // loading={isLoadingCouriersData || isFetchingCourierData}
            bordered={true}
            cellBordered={true}
            onSortColumn={handleSortColumn}
            // sortType={sortOrder}
            // sortColumn={sortBy}
            id="table"
          >
            {/* SL No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>SL</HeaderCell>
              <Cell
                dataKey="sl"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {/* {(rowData) => `${rowData.variants}`} */}
              </Cell>
            </Column>

            {/* Date*/}
            <Column flexGrow={1} sortable>
              <HeaderCell style={headerCss}>Month</HeaderCell>
              <Cell
                dataKey="month"
                verticalAlign="middle"
                style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
              >
                {/* {(rowData) => `${moment(rowData?.courierDate).format("ll")}`} */}
              </Cell>
            </Column>

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Job Id</HeaderCell>
              <Cell
                dataKey="jobId"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {/* {(rowData) => `${rowData.variants}`} */}
              </Cell>
            </Column>

            {/* Courier Name*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Employee Name</HeaderCell>
              <Cell
                dataKey="employeeName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>
            {/* AWB No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Launch</HeaderCell>
              <Cell
                dataKey="launch"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Meal Rate*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Meal Rate</HeaderCell>
              <Cell
                dataKey="mealRate"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Total Cost</HeaderCell>
              <Cell
                dataKey="totalCost"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* {role !== "USER" && (
                  <Column width={70}>
                    <HeaderCell style={headerCss}>Action</HeaderCell>
                    <Cell style={cellCss} verticalAlign="middle" align="center">
                      {(rowData: any) => (
                        <IconButton
                          onClick={() => {
                            setCourierEditModalOpen(true);
                            setCourierEditData(rowData);
                          }}
                          circle
                          icon={<RiEdit2Line size={20} />}
                        />
                      )}
                    </Cell>
                  </Column>
                )} */}
          </Table>
        </>

        {/* <div style={{ padding: "20px 10px 0px 10px" }}>
          <Pagination
            // total={couriersData?.meta?.total}
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
            // limit={size}
            // onChangeLimit={(limitChange) => setSize(limitChange)}
            // activePage={page}
            // onChangePage={setPage}
          />
        </div> */}
      </div>

      {/* Modal */}
      <div>
        <AddExpensesModal handleClose={handleClose} open={open} />
      </div>
    </div>
  );
};

export default MonthWiseTable;
