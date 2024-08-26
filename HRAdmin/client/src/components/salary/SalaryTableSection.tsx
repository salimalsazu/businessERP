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
  SelectPicker,
} from "rsuite";
import { useState } from "react";
import DocPassIcon from "@rsuite/icons/DocPass";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import { headerCss } from "@/utils/TableCSS";
import { saveExcel } from "@/components/food/monthwise/ExcepReport";
import AddSalaryForm from "./AddSalary";
import { useGetSalaryQuery } from "@/redux/api/features/salaryApi";
import { salaryMonthValue, salaryYearValue } from "./SalaryUtils";
import EditIcon from "@rsuite/icons/Edit";
import EditSalaryModal from "./EditSalaryModal";
const { Column, HeaderCell, Cell } = Table;

const SalarySectionTable = () => {
  const query: Record<string, any> = {};

  const [searchTerm, setSearchTerm] = useState<string>();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [salaryMonth, setSalaryMonth] = useState<string>();
  const [salaryYear, setSalaryYear] = useState<string>();
  query["searchTerm"] = searchTerm;
  query["salaryMonth"] = salaryMonth;
  query["salaryYear"] = salaryYear;

  const { data: salaryData, isLoading } = useGetSalaryQuery({ ...query });

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

  //Filter with MOnth
  const handleFilterMonth = (value: string) => {
    setSalaryMonth(value);
  };

  //Filter with Year
  const handleFilterYear = (value: string) => {
    setSalaryYear(value);
  };

  //Drawer

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState<any>();

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB] w-full pl-10 py-2 rounded-lg focus:outline-none"
                placeholder="Search with Name"
                required
              />
            </div>
          </div>
          <div>
            <SelectPicker
              placement="auto"
              onChange={(value: any | null): void => {
                handleFilterMonth(value);
              }}
              data={salaryMonthValue?.map((month: any) => ({
                label: month,
                value: month,
              }))}
              size="lg"
              searchable={false}
              style={{ width: 300 }}
              placeholder="Filter By Month"
            />
          </div>
          <div>
            <SelectPicker
              placement="auto"
              onChange={(value: any | null): void => {
                handleFilterYear(value);
              }}
              data={salaryYearValue?.map((year: any) => ({
                label: year,
                value: year,
              }))}
              size="lg"
              searchable={false}
              style={{ width: 300 }}
              placeholder="Filter By Year"
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
          data={salaryData?.data}
          onSortColumn={handleSortColumn}
          sortColumn={sortColumn}
          sortType={sortType}
          loading={isLoading}
        >
          {/* Salary Month */}
          <Column flexGrow={2} sortable>
            <HeaderCell style={headerCss}>Month</HeaderCell>
            <Cell dataKey="salaryMonth" />
          </Column>

          {/* Salary Year */}
          <Column flexGrow={0}>
            <HeaderCell style={headerCss}>Year</HeaderCell>
            <Cell dataKey="salaryYear" />
          </Column>

          {/* Employee Name */}
          <Column flexGrow={2}>
            <HeaderCell style={headerCss}>Employee Name</HeaderCell>
            <Cell>
              {(rowData: any) =>
                `${rowData.user.profile.firstName} ${rowData.user.profile.lastName}`
              }
            </Cell>
          </Column>

          {/* Basic Salary */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Basic Salary</HeaderCell>
            <Cell dataKey="basicSalary" />
          </Column>

          {/* House Rent */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>House Rent</HeaderCell>
            <Cell dataKey="houseRent" />
          </Column>

          {/* Medical Allowance */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Medical Allowance</HeaderCell>
            <Cell dataKey="medicalAllowance" />
          </Column>

          {/* Conveyance */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Conveyance</HeaderCell>
            <Cell dataKey="conveyance" />
          </Column>

          {/* Other Allowance */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Other Allowance</HeaderCell>
            <Cell dataKey="otherAllowance" />
          </Column>

          {/* Total Salary */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Total Salary</HeaderCell>
            <Cell dataKey="totalSalary" />
          </Column>

          {/* Absent Deduction */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Absent Deduction</HeaderCell>
            <Cell dataKey="absentDeduction" />
          </Column>

          {/* Advance Salary Deduction */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Advance Salary Deduction</HeaderCell>
            <Cell dataKey="advanceSalaryDeduction" />
          </Column>

          {/* Meal and Mobile Bill Deduction */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>
              Meal & Mobile Bill Deduction
            </HeaderCell>
            <Cell dataKey="mealAndMobileBillDeduction" />
          </Column>

          {/* Net Payable Salary */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Net Payable Salary</HeaderCell>
            <Cell dataKey="netPayableSalary" />
          </Column>

          {/* TDS on Salary */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>TDS on Salary</HeaderCell>
            <Cell dataKey="tdsOnSalary" />
          </Column>

          {/* Net Salary */}
          <Column flexGrow={1} sortable>
            <HeaderCell style={headerCss}>Net Salary</HeaderCell>
            <Cell dataKey="netSalary" />
          </Column>
          {/* Net Salary */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Edit</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <Button
                  onClick={() => {
                    setOpenEditModal(true);
                    setEditData(rowData);
                  }}
                  appearance="link"
                  className="!text-lg !font-extrabold"
                >
                  <EditIcon />
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
      <div>
        <AddSalaryForm openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </div>

      <div>
        <EditSalaryModal
          open={openEditModal}
          handleClose={handleCloseModal}
          editData={editData}
        />
      </div>
    </div>
  );
};

export default SalarySectionTable;
