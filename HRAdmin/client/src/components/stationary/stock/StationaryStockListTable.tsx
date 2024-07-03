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
import AddStationaryModal from "./AddStationaryModal";
import { useGetStationaryItemQuery } from "@/redux/api/features/stationaryItemApi";
import moment from "moment";

const { Column, HeaderCell, Cell } = Table;

const StationaryStockListTable = () => {
  const query: Record<string, any> = {};

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  //fitlet by item

  const [itemName, setItemName] = useState<string | null>(null);
  query["itemName"] = itemName;

  //filter by Status

  const [stockItemStatus, setStockItemStatus] = useState<string | null>(null);
  query["stockItemStatus"] = stockItemStatus;

  const stockItemStatusFeature = ["Excellent", "Good", "Poor"].map((item) => ({
    label: item,
    value: item,
  }));

  //Data Fetching for Item List

  const { data: stationaryItem, isLoading } = useGetStationaryItemQuery({
    ...query,
  });

  //data Fetching for Item

  //@ts-ignore
  const { data: stationaryItemData } = useGetStationaryItemQuery(null);

  const mappedData = stationaryItemData?.data.map((item: any) => ({
    label: item.itemName,
    value: item.itemName,
  }));

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

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between ">
        <div className="flex justify-center gap-5">
          <div>
            <SelectPicker
              onChange={(value: string | null): void =>
                setStockItemStatus(value as string)
              }
              // onClean={() => setSelectedStyleNo(null)}
              size="lg"
              data={stockItemStatusFeature}
              style={{ width: 300 }}
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
              style={{ width: 300 }}
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
            data={stationaryItem?.data}
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

            {/* Style No*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Item Name</HeaderCell>
              <Cell
                dataKey="itemName"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {/* {(rowData) => `${rowData.variants}`} */}
              </Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Last Purchased Date</HeaderCell>
              <Cell
                dataKey="stationaryItemList[0].purchaseDate"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) =>
                  `${moment(rowData?.stationaryItemList[0].purchaseDate).format(
                    "ll"
                  )}`
                }
              </Cell>
            </Column>

            {/* Purchase Quantity*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Purchase (Qty)</HeaderCell>
              <Cell
                dataKey="stationaryItemList[0].purchaseQuantity"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Last Assign Date </HeaderCell>
              <Cell
                dataKey="stationaryItemAssign[0].lastAssignedDate"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              >
                {(rowData) =>
                  `${moment(
                    rowData?.stationaryItemAssign[0].lastAssignedDate
                  ).format("ll")}`
                }
              </Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Assign (Qty) </HeaderCell>
              <Cell
                dataKey="stationaryItemAssign[0].assignQuantity"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Details*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Now Stock(Qty)</HeaderCell>
              <Cell
                dataKey="stockQuantity"
                verticalAlign="middle"
                style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
              ></Cell>
            </Column>

            {/* Status*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Status </HeaderCell>
              <Cell
                dataKey="stockItemStatus"
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
            total={stationaryItem?.meta?.total}
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

export default StationaryStockListTable;
