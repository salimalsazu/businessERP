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
import AddFuelExpModal from "./AddFuelExpModal";
import { useGetFuelListQuery } from "@/redux/api/features/fuelListApi";
import moment from "moment";
import { useGetVehicleQuery } from "@/redux/api/features/vehicleApi";
import FuelStatusEditDrawer from "./FuelStatusEditDrawer";

const { Column, HeaderCell, Cell } = Table;

const FuelPurchaseAndConsumptionSection = () => {
  const query: Record<string, any> = {};

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  //filter by Vehicle No
  const [vehicleName, setVehicleName] = useState<string | null>(null);
  query["vehicleName"] = vehicleName;

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

  //Date Fetching For Fuel List

  const { data: fuelList, isLoading } = useGetFuelListQuery(query);

  //Fetching Vehicle No
  //@ts-ignore

  const { data: vehicle, isLoading: vehicleLoading } = useGetVehicleQuery(null);

  const VehicleNo = vehicle?.data.map((item: any) => ({
    label: item?.vehicleName,
    value: item?.vehicleName,
  }));

  //Fuel Edit Drawer

  const [openFuelDrawer, setOpenFuelDrawer] = useState(false);
  const [placement, setPlacement] = useState();
  const [fuelEditData, setFuelEditData] = useState<any>();

  const handleOpenFuelDrawer = ({
    key,
    rowData,
  }: {
    key: any;
    rowData: any;
  }) => {
    setOpenFuelDrawer(true);
    setPlacement(key);
    setFuelEditData(rowData);
  };

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between ">
        <div className="flex justify-center gap-5">
          <div>
            <DateRangePicker
              // @ts-ignore
              // ranges={predefinedRanges}
              placement="auto"
              onChange={(value: Date[] | null): void => {
                handleFilterDate(value);
              }}
              onClean={() => handleFilterDate(null)}
              size="lg"
              style={{ width: 400 }}
              placeholder="Filter By Date"
            />
          </div>
          <div>
            <SelectPicker
              onChange={(value: string | null): void =>
                setVehicleName(value as string)
              }
              onClean={() => setVehicleName(null)}
              size="lg"
              data={VehicleNo}
              style={{ width: 300 }}
              // searchable={false}
              placeholder="Filter By Vehicle No"
              searchable={false}
              // renderMenu={(menu) => renderLoading(menu, vehicleLoading)}
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
        </div>
      </div>

      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full">
        <>
          <Table
            rowHeight={60}
            headerHeight={48}
            autoHeight={true}
            data={fuelList?.data}
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
              <HeaderCell style={headerCss}> Date</HeaderCell>
              <Cell
                dataKey="purchaseDate"
                verticalAlign="middle"
                style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
              >
                {(rowData) => `${moment(rowData?.purchaseDate).format("ll")}`}
              </Cell>
            </Column>

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Vehicle No</HeaderCell>
              <Cell
                dataKey="vehicleAdd.vehicleName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Courier Name*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>KM (Previous)</HeaderCell>
              <Cell
                dataKey="kmPrevious"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>
            {/* AWB No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>KM (Current)</HeaderCell>
              <Cell
                dataKey="kmCurrent"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Fuel (Ltr)</HeaderCell>
              <Cell
                dataKey="fuelQuantity"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Mobile Bill*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Cost (Tk)</HeaderCell>
              <Cell
                dataKey="fuelCost"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Usages*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Per Ltr (Tk)</HeaderCell>
              <Cell
                dataKey="perLitreCost"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Deduction*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>KM (Consumption)</HeaderCell>
              <Cell
                dataKey="kmConsumed"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Remarks</HeaderCell>
              <Cell>
                {(rowData) => (
                  <Button
                    appearance="link"
                    onClick={() =>
                      handleOpenFuelDrawer({ key: "bottom", rowData })
                    }
                  >
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </>

        <div>
          <FuelStatusEditDrawer
            placement={placement}
            open={openFuelDrawer}
            setOpen={setOpenFuelDrawer}
            rowData={fuelEditData}
          />
        </div>

        <div style={{ padding: "20px 10px 0px 10px" }}>
          <Pagination
            total={fuelList?.meta?.total}
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="lg"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            limitOptions={[5, 10, 20, 30, 50]}
            // limit={size}
            // onChangeLimit={(limitChange) => setSize(limitChange)}
            // activePage={page}
            // onChangePage={setPage}
          />
        </div>
      </div>

      {/* Modal */}
      <div>
        <AddFuelExpModal
          open={open}
          handleClose={handleClose}
          VehicleNo={VehicleNo}
        />
      </div>
    </div>
  );
};

export default FuelPurchaseAndConsumptionSection;
