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
import AddStationaryModal from "../stock/AddStationaryModal";
import { useGetStationaryItemAssignQuery } from "@/redux/api/features/stationaryItemListApi";
import moment from "moment";
import { useGetStationaryItemQuery } from "@/redux/api/features/stationaryItemApi";

const { Column, HeaderCell, Cell } = Table;

const StationaryAssign = () => {
  //Query Defined
  const query: Record<string, any> = {};

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  //filter by Status

  const [assignItemStatus, setAssignItemStatus] = useState<string | undefined>(
    undefined
  );
  query["assignItemStatus"] = assignItemStatus;

  const assignStatus = ["Pending", "Approval", "Rejected"].map((status) => ({
    label: status,
    value: status,
  }));

  //Filter by Item
  const [itemName, setItemName] = useState<string | undefined>(undefined);
  query["itemName"] = itemName;

  // Search by stationaryName and User Name

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  query["searchTerm"] = searchTerm;

  // console.log("assignItemStatus", assignItemStatus.value);

  // Modal
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Stationary Item Data
  const { data: stationaryItemData, isLoading: isLoadingStationaryItem } =
    useGetStationaryItemQuery({...query});

  // Map data for the SelectPicker
  const mappedData = stationaryItemData?.data.map((item: any) => ({
    label: item.itemName,
    value: item.itemName,
  }));



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

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      if (startDate !== null && endDate !== null) {
        setSelectedDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  console.log("date", selectedDate.startDate);

  //table Data
  const { data, isLoading } = useGetStationaryItemAssignQuery({ ...query });

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between  ">
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
            <DateRangePicker
              // @ts-ignore
              // ranges={predefinedRanges}
              placement="auto"
              onChange={(value: Date[] | null): void => {
                handleFilterDate(value);
              }}
              // onClean={() =>
              //   handleFilterDate({
              //     startDate: "",
              //     endDate: "",
              //   })
              // }
              size="lg"
              style={{ width: 300 }}
              placeholder="Filter By Date"
            />
          </div>

          <div>
            <SelectPicker
              // onClean={() => setSelectedStyleNo(null)}
              size="lg"
              data={assignStatus}
              onChange={(value: string | null): void =>
                setAssignItemStatus(value as string)
              }
              style={{ width: 170 }}
              // searchable={false}
              placeholder="Filter By Status"
              searchable={false}
              // renderMenu={(menu) => renderLoading(menu, isLoadingAllStyleNames)}
            />
          </div>

          <div>
            <SelectPicker
              onChange={(value: string | null): void =>
                setItemName(value as string)
              }
              // onClean={() => setSelectedStyleNo(null)}
              size="lg"
              data={mappedData}
              style={{ width: 160 }}
              // searchable={false}
              placeholder="Filter By Item"
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
              <span className="text-sm font-semibold">Add Stationary</span>
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
            data={data?.data}
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
                {(rowData, rowIndex: any) => rowIndex + 1}
              </Cell>
            </Column>

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Date</HeaderCell>
              <Cell
                dataKey="lastAssignedDate"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) =>
                  `${moment(rowData?.lastAssignedDate).format("ll")}`
                }
              </Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Job Id</HeaderCell>
              <Cell
                dataKey="user.profile.jobId"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Employee Name</HeaderCell>
              <Cell
                dataKey="user.profile.firstName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Item Name</HeaderCell>
              <Cell
                dataKey="stationaryItem.itemName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Quantity </HeaderCell>
              <Cell
                dataKey="assignQuantity"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Status*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Status</HeaderCell>
              <Cell
                dataKey="assignItemStatus"
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
            total={data?.meta?.total}
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
        <AddStationaryModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default StationaryAssign;
