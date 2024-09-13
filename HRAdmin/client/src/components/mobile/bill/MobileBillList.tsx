"use client";

import {
  Button,
  ButtonToolbar,
  DatePicker,
  DateRangePicker,
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
import { headerCss } from "@/utils/TableCSS";
import NewMobileBillModal from "./NewMobileBillModal";
import { saveExcel } from "@/components/food/monthwise/ExcepReport";
import { useGetMobileBillQuery } from "@/redux/api/features/mobileBillApi";
import MobileEditModal from "./MobileUploadBillModal";
import UploaderFile from "./UploaderFile";
const { Column, HeaderCell, Cell } = Table;

const MobileBillList = () => {
  const query: Record<string, any> = {};
  const [isHovered, setIsHovered] = useState(false);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  //search by Name and mobile No

  const [searchTerm, setSearchTerm] = useState("");
  query["searchTerm"] = searchTerm;

  //filter by Billing Month

  const [billingMonth, setBillingMonth] = useState("");
  query["billingMonth"] = billingMonth;

  const handleDateChange = (date: any) => {
    // Assuming date is in the format "yyyy-MM"
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedMonth = date
      ? `${months[date.getMonth()]} ${date.getFullYear()}`
      : "";
    setBillingMonth(formattedMonth);
  };

  //data fetching for mobile Bill
  const { data: mobileBill, isLoading } = useGetMobileBillQuery({ ...query });

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div>
      <div className="my-5 mx-2 flex justify-between ">
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <div className="flex justify-center items-center gap-5">
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
                <span className="text-sm font-semibold">New Mobile Bill</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

{/* Excel & CSV File */}

      <div className="my-5 mx-1">
        <UploaderFile />
      </div>
      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full">
        <>
          <Table
            rowHeight={60}
            headerHeight={48}
            autoHeight={true}
            data={mobileBill?.data}
            loading={isLoading}
            // bordered={true}
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
                {(rowData, rowIndex: any) => <span>{rowIndex + 1}</span>}
              </Cell>
            </Column>

            {/* Date*/}
            <Column flexGrow={1} sortable>
              <HeaderCell style={headerCss}> JobId</HeaderCell>
              <Cell
                dataKey="user.profile.jobId"
                verticalAlign="middle"
                style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
              >
                {/* {(rowData) => `${moment(rowData?.courierDate).format("ll")}`} */}
              </Cell>
            </Column>

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Name</HeaderCell>
              <Cell
                dataKey="user.profile.firstName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {/* {(rowData) => `${rowData.variants}`} */}
              </Cell>
            </Column>

            {/* Courier Name*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Month</HeaderCell>
              <Cell
                dataKey="billingMonth"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>
            {/* AWB No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Mobile No</HeaderCell>
              <Cell
                dataKey="user.profile.mobileNo"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Limit</HeaderCell>
              <Cell
                dataKey="user.profile.mobileBillingLimit"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Mobile Bill*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Mobile Bill</HeaderCell>
              <Cell
                dataKey="billAmount"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Usages*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Usages</HeaderCell>
              <Cell
                dataKey="usage"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => `${rowData.usage}%`}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Deduction</HeaderCell>
              <Cell
                dataKey="deduction"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) => {
                  return (
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{ display: "flex", alignItems: "end", gap: "5px" }}
                    >
                      <span>{rowData.deduction}</span>
                      {isHovered && (
                        <Button
                          // onClick={handleOpenEdit}
                          appearance="primary"
                          size="xs"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </>

        <div style={{ padding: "20px 10px 0px 10px" }}>
          <Pagination
            total={mobileBill?.meta?.total}
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
        </div>
      </div>

      {/* Modal */}
      <div>
        <NewMobileBillModal open={open} handleClose={handleClose} />
      </div>

      <div>
        <MobileEditModal />
      </div>
    </div>
  );
};

export default MobileBillList;
