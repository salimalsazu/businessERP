"use client";

import {
  Button,
  ButtonToolbar,
  DatePicker,
  Dropdown,
  Modal,
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

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    sl: 1,
    month: "January",
    jobId: 10,
    employeeName: "Salim Al Sazu",
    lunch: 5,
    mealRate: 18.5,
    totalCost: 120.0,
  },
  {
    sl: 2,
    month: "January",
    jobId: 8,
    employeeName: "Tafseer Al Yaad",
    lunch: 4,
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

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a: any, b: any) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

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
      <div className="mb-5 flex justify-between ">
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

      <div className="border rounded-md">
        <Table
          height={420}
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
        >
          <Column width={100} align="center" fixed sortable>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              SL
            </HeaderCell>
            <Cell dataKey="sl" />
          </Column>

          <Column width={150} align="center" fixed>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              Month
            </HeaderCell>
            <Cell dataKey="month" />
          </Column>

          <Column width={150} align="center" fixed sortable>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              Job ID
            </HeaderCell>
            <Cell dataKey="jobId" />
          </Column>

          <Column width={275} fixed>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              Name
            </HeaderCell>
            <Cell dataKey="employeeName" />
          </Column>

          <Column width={200} fixed sortable>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              Launch
            </HeaderCell>
            <Cell dataKey="lunch" />
          </Column>

          <Column width={200} sortable>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              Meal Rate
            </HeaderCell>
            <Cell dataKey="mealRate" />
          </Column>

          <Column width={200} sortable>
            <HeaderCell
              style={{
                backgroundColor: `var(--primary)`,
                color: "#ffff",
                fontWeight: 900,
              }}
            >
              Total Cost
            </HeaderCell>
            <Cell dataKey="totalCost" />
          </Column>
        </Table>
      </div>

      {/* Modal */}
      <div>
        <AddExpensesModal handleClose={handleClose} open={open} />
      </div>
    </div>
  );
};

export default MonthWiseTable;
