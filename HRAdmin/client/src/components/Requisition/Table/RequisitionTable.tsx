"use client";

import {
  ButtonToolbar,
  Checkbox,
  DateRangePicker,
  Dropdown,
  IconButton,
  Pagination,
  Popover,
  Table,
  Whisper,
} from "rsuite";
import { useState } from "react";
import { headerCss } from "@/utils/TableCSS";
import { useGetRequisitionQuery } from "@/redux/api/features/requisitionApi";
import { LiaFileExportSolid } from "react-icons/lia";
import { requisitionColumns } from "@/constant/exportCoumn.const";
import { saveExcel } from "@/utils/ExportToExcel";
import moment from "moment";
import { useDebounced } from "@/redux/hooks";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toWords } from "number-to-words";
import EditIcon from "@rsuite/icons/Edit";
import StatusMenu from "./StatusEditModal";
import StatusEditModal from "./StatusEditModal";

const { Column, HeaderCell, Cell } = Table;

const RequisitionListTable = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // const [sortColumn, setSortColumn] = useState();
  // const [sortType, setSortType] = useState();
  // const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  // for queries
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // ! fetching data
  const {
    data: allRequisitionList,
    isLoading,
    isFetching,
  } = useGetRequisitionQuery({ ...query });

  const checkedBoxData = allRequisitionList?.data?.filter((obj: any) =>
    checkedKeys.includes(obj.requisitionId)
  );

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

  //Export PDF

  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = (text: any) => (pageWidth - doc.getTextWidth(text)) / 2;

    // Custom header
    const header = () => {
      doc.setFontSize(18);
      doc.text(
        "24/7 Sourcing Private Ltd",
        centerX("24/7 Sourcing Private Ltd"),
        22
      );
      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.text("Payment Requisition", centerX("Payment Requisition"), 30);
      doc.setFontSize(8);
      doc.setTextColor(35);
      doc.text(
        "House 60, Lake Drive Road, Sector:07, Uttara, Dhaka-1230",
        centerX("House 60, Lake Drive Road, Sector:07, Uttara, Dhaka-1230"),
        35
      );
    };

    const tableColumn = [
      "Requisition Date",
      "Account",
      "Details",
      "Bank Name",
      "Cheque No",
      "Cheque Date",
      "Amount",
      "Amount Type",
    ];

    const tableRows = checkedBoxData.map((item: any) => [
      moment(item.requisitionDate).format("ll"),
      item?.account?.accountName,
      item?.details,
      item?.bankName,
      item?.chequeNo,
      moment(item?.chequeDate).format("ll"),
      item?.amount,
      item?.amountType,
    ]);

    // Calculate the total sum of the amount
    const totalSum = checkedBoxData.reduce(
      (sum: any, item: any) => sum + item.amount,
      0
    );

    // Convert total sum to words
    const totalSumInWords = toWords(totalSum);

    let finalY = 0; // Variable to store final Y position

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      didDrawPage: (data) => {
        // Header and Footer on each page
        header();
      },
      margin: { top: 40 },
      didDrawCell: (data) => {
        // Update finalY position
        finalY = data.cell.y + data.cell.height;
        // Check if it's the last row of the table on the last page
        if (
          data.row.index === tableRows.length - 1 &&
          data.cell.section === "body"
        ) {
          // Calculate the y position for the "Approved by" text
          const yPosition = finalY + 30;
          const xPosition = pageWidth - 60; // Adjust this value to position the text on the right side
          doc.setFontSize(10);
          // Add line for signature
          doc.line(xPosition - 10, yPosition, xPosition + 30, yPosition);
          doc.text("Approved by", xPosition, yPosition + 5);
        }
      },
    });

    // Add total sum row
    doc.setFontSize(10);
    doc.text(`Total Amount: ${totalSum}`, 14, finalY + 10);
    doc.text(`In Words: ${totalSumInWords} only`, 14, finalY + 20);

    doc.save("Requisition.pdf");
  };

  // export render menu
  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            disabled={!isLoading && !allRequisitionList?.data?.length}
            onClick={() =>
              saveExcel({
                allRequisitionList,
                checkedBoxData,
                columns: requisitionColumns,
              })
            }
            eventKey={4}
          >
            Export to Excel Sheet
          </Dropdown.Item>
          <Dropdown.Item
            disabled={!isLoading && !allRequisitionList?.data?.length}
            onClick={generatePDF}
            eventKey={1}
          >
            Export to PDF
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  // ! export to excel -------------------------------------------------

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

  //! check box

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

  //! Status Edit Modal

  const [openStatusEdit, setOpenStatusEditModal] = useState(false);
  const [statusData, setStatusData] = useState<any>({});
  const handleOpenStatusModal = () => setOpenStatusEditModal(true);
  const handleCloseStatusModal = () => setOpenStatusEditModal(false);

  return (
    <div>
      <div className="my-5 mx-2 flex justify-between gap-2 w-full">
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

        <div>
          <Whisper
            placement="bottomEnd"
            speaker={renderMenu}
            trigger={["click"]}
          >
            <button
              type="button"
              className="border px-10 py-2 flex justify-center items-center gap-2  border-primary  rounded-lg   text-primary font-medium hover:bg-primary/10 duration-300"
            >
              <span>
                <LiaFileExportSolid size={25} />
              </span>
              <span>Export</span>
            </button>
          </Whisper>
        </div>
      </div>

      {/* main section for table */}
      <div className="bg-white shadow-sm rounded-md p-5 m-2 w-full">
        <>
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allRequisitionList?.data}
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
        </>

        <div>
          <StatusEditModal
            open={openStatusEdit}
            handleClose={handleCloseStatusModal}
            rowData={statusData}
          />
        </div>

        <div style={{ padding: "20px 10px 0px 10px" }}>
          <Pagination
            total={allRequisitionList?.meta?.total}
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
  );
};

export default RequisitionListTable;
