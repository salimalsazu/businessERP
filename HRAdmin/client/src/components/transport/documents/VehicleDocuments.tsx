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
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
import { useState } from "react";
import DocPassIcon from "@rsuite/icons/DocPass";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import { headerCss } from "@/utils/TableCSS";
import { saveExcel } from "@/components/food/monthwise/ExcepReport";
import AddVehicleDocumentsModal from "./AddVehicleDocumentsModal";
import AddFuelExpModal from "../fuel/AddFuelExpModal";

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    sl: 1,
    date: "22/12/2023",
    totalCost: 500,
    totalMeal: 7,
    employeeCost: 250,
    mealRate: 18.5,
  },
  {
    sl: 2,
    date: "21/12/2023",
    totalCost: 600,
    totalMeal: 7,
    employeeCost: 150,
    mealRate: 15.5,
  },
];

const VehicleDocumentsTableSection = () => {
  const query: Record<string, any> = {};

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

      // Set the start time to 00:00:00 (12:00 AM)
      startDate.setHours(0, 0, 0, 0);

      // Set the end time to 23:59:59 (11:59 PM)
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

  const VehicleNo = ["AB-102", "CD-200"].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between ">
        <div className="flex justify-center gap-5">
          <div>
            <SelectPicker
              // onChange={(value: string | null): void =>
              //   setSelectedStyleNo(value as string)
              // }
              // onClean={() => setSelectedStyleNo(null)}
              size="lg"
              data={VehicleNo}
              style={{ width: 300 }}
              // searchable={false}
              placeholder="Filter By Vehicle No"
              searchable={false}
              // renderMenu={(menu) => renderLoading(menu, isLoadingAllStyleNames)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-5">
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
              <span className="text-sm font-semibold">Add Fuel Exp</span>
            </Button>
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
              <span className="text-sm font-semibold">Add Vehicle</span>
            </Button>
          </div>
        </div>
      </div>

      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full">
        <>
          <Table
            rowHeight={60}
            headerHeight={48}
            autoHeight={true}
            data={data}
            // loading={isLoadingCouriersData || isFetchingCourierData}
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
                {/* {(rowData) => `${rowData.variants}`} */}
              </Cell>
            </Column>

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Vehicle No</HeaderCell>
              <Cell
                dataKey="employeeName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {/* {(rowData) => `${rowData.variants}`} */}
              </Cell>
            </Column>

            {/* Document Type*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Document Type</HeaderCell>
              <Cell
                dataKey="month"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* AWB No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Expire Date(Current)</HeaderCell>
              <Cell
                dataKey="mobileNumber"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Status</HeaderCell>
              <Cell
                dataKey="limit"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>PDF</HeaderCell>
              <Cell
                dataKey="limit"
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

        <div style={{ padding: "20px 10px 0px 10px" }}>
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
        </div>
      </div>

      {/* Modal */}
      <div>
        <AddFuelExpModal open={open} handleClose={handleClose} />
      </div>
      <div>
        <AddVehicleDocumentsModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default VehicleDocumentsTableSection;