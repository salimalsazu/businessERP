"use client";

import {
  Button,
  ButtonToolbar,
  DateRangePicker,
  Dropdown,
  Modal,
  Table,
  Whisper,
  Popover,
} from "rsuite";
import { useState } from "react";
import DocPassIcon from "@rsuite/icons/DocPass";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import { headerCss } from "@/utils/TableCSS";
import { saveExcel } from "@/components/food/monthwise/ExcepReport";
import AddSalaryForm from "./AddSalary";

const { Column, HeaderCell, Cell } = Table;

const SalarySectionTable = () => {
  const query: Record<string, any> = {};

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  // Modal
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
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

  // Report Generate
  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item onClick={saveExcel} eventKey={4}>
            Export to Excel
          </Dropdown.Item>
          <Dropdown.Item onClick={saveExcel} eventKey={4}>
            Save to PDF
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;

  const handleFilterDate = (date: Date[] | null) => {
    if (!date?.length) {
      setSelectedDate({
        startDate: "",
        endDate: "",
      });
    }

    if (date) {
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const formattedStartDate = startDate?.toISOString();
      const formattedEndDate = endDate?.toISOString();

      if (startDate !== null && endDate !== null) {
        setSelectedDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  const salaryData = [
    {
      salaryId: "4ebf37c9-23a0-4707-a855-c30a540c076b",
      salaryMonth: "January",
      salaryYear: "2024",
      userId: "fea9072f-f795-4873-a317-0fadbe754fae",
      basicSalary: 21000,
      houseRent: 10500,
      medicalAllowance: 4200,
      conveyance: 4200,
      otherAllowance: 2100,
      totalSalary: 42000,
      absentDeduction: 0,
      advanceSalaryDeduction: 3000,
      mealAndMobileBillDeduction: 650,
      netPayableSalary: 38350,
      tdsOnSalary: 420,
      netSalary: 37930,
      createdAt: "2024-08-17T23:01:31.044Z",
      updatedAt: "2024-08-17T23:01:31.044Z",
      user: {
        profile: {
          firstName: "Tafseer Al",
          lastName: "Yaad",
          joiningDate: null,
          jobTitle: null,
        },
      },
    },
  ];

  //Drawer

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between">
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
                type="text"
                id="searchTerm"
                className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB] w-full pl-10 py-2 rounded-lg focus:outline-none"
                placeholder="Search with Name"
                required
              />
            </div>
          </div>
          <div>
            <DateRangePicker
              placement="auto"
              onChange={(value: Date[] | null): void => {
                handleFilterDate(value);
              }}
              onClean={() =>
                handleFilterDate({
                  //@ts-ignore
                  startDate: "",
                  endDate: "",
                })
              }
              size="lg"
              style={{ width: 300 }}
              placeholder="Filter By Date"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
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
                <span className="text-sm font-semibold">Add Salary</span>
              </Button>
            </div>
          </div>
          {/* Report */}
          <div className="flex justify-center gap-5">
            <ButtonToolbar>
              <Whisper
                placement="bottomEnd"
                speaker={renderMenu}
                trigger={["click"]}
              >
                <Button
                  appearance="default"
                  className="!bg-secondary outline outline-1 font-medium text-gray-700 !rounded"
                  startIcon={<DocPassIcon className="text-sm" />}
                  endIcon={<ArrowDownLineIcon className="text-xl" />}
                >
                  Report
                </Button>
              </Whisper>
            </ButtonToolbar>
          </div>
        </div>
      </div>

      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full">
        <Table
          rowHeight={100}
          headerHeight={100}
          autoHeight
          data={salaryData}
          onSortColumn={handleSortColumn}
          sortColumn={sortColumn}
          sortType={sortType}
          loading={loading}
        >
          {/* Salary Month */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Month</HeaderCell>
            <Cell dataKey="salaryMonth" />
          </Column>

          {/* Salary Year */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Year</HeaderCell>
            <Cell dataKey="salaryYear" />
          </Column>

          {/* Employee Name */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Employee Name</HeaderCell>
            <Cell>
              {(rowData: any) =>
                `${rowData.user.profile.firstName} ${rowData.user.profile.lastName}`
              }
            </Cell>
          </Column>

          {/* Basic Salary */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Basic Salary</HeaderCell>
            <Cell dataKey="basicSalary" />
          </Column>

          {/* House Rent */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>House Rent</HeaderCell>
            <Cell dataKey="houseRent" />
          </Column>

          {/* Medical Allowance */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Medical Allowance</HeaderCell>
            <Cell dataKey="medicalAllowance" />
          </Column>

          {/* Conveyance */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Conveyance</HeaderCell>
            <Cell dataKey="conveyance" />
          </Column>

          {/* Other Allowance */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Other Allowance</HeaderCell>
            <Cell dataKey="otherAllowance" />
          </Column>

          {/* Total Salary */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Total Salary</HeaderCell>
            <Cell dataKey="totalSalary" />
          </Column>

          {/* Absent Deduction */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Absent Deduction</HeaderCell>
            <Cell dataKey="absentDeduction" />
          </Column>

          {/* Advance Salary Deduction */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Advance Salary Deduction</HeaderCell>
            <Cell dataKey="advanceSalaryDeduction" />
          </Column>

          {/* Meal and Mobile Bill Deduction */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>
              Meal & Mobile Bill Deduction
            </HeaderCell>
            <Cell dataKey="mealAndMobileBillDeduction" />
          </Column>

          {/* Net Payable Salary */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Net Payable Salary</HeaderCell>
            <Cell dataKey="netPayableSalary" />
          </Column>

          {/* TDS on Salary */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>TDS on Salary</HeaderCell>
            <Cell dataKey="tdsOnSalary" />
          </Column>

          {/* Net Salary */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Net Salary</HeaderCell>
            <Cell dataKey="netSalary" />
          </Column>

          {/* Created At */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Created At</HeaderCell>
            <Cell>
              {(rowData: any) => new Date(rowData.createdAt).toLocaleString()}
            </Cell>
          </Column>
        </Table>
      </div>

      <div>
        <AddSalaryForm openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </div>
    </div>
  );
};

export default SalarySectionTable;
