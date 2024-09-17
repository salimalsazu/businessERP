"use client";

import { formatNumber } from "@/components/ledger/FormatNumber";
import { useGetAccountByNameQuery } from "@/redux/api/features/accountApi";
import { useDebounced } from "@/redux/hooks";
import { headerCss } from "@/utils/TableCSS";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Table,
  Panel,
  Loader,
  Grid,
  Row,
  Col,
  Button,
  Heading,
  Whisper,
  DateRangePicker,
  Popover,
  Dropdown,
  Checkbox,
  Pagination,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const SingleAccountDetails = ({ params }: any) => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

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

  const { data } = useGetAccountByNameQuery({
    accountName: params.accountName,
    ...query,
  });

  console.log("data", data);

  const [totalDebit, setTotalDebit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const { transactionCredit, transactionDebit } = data?.data?.data ?? {};

      let debitTotal = 0;
      let creditTotal = 0;

      (transactionCredit ?? []).forEach((transaction: any) => {
        creditTotal += transaction.transactionAmount;
      });

      (transactionDebit ?? []).forEach((transaction: any) => {
        debitTotal += transaction.transactionAmount;
      });

      setTotalDebit(debitTotal);
      setTotalCredit(creditTotal);
    }
  }, [data]);

  if (!data) {
    return <Loader center content="Loading..." />;
  }

  const {
    accountId,
    accountName,
    openingBalance,
    closingBalance,
    createdAt,
    updatedAt,
    transactionCredit,
    transactionDebit,
  } = data?.data?.data ?? {};

  const transactions = [
    ...(transactionCredit ?? []).map((transaction: any) => ({
      date: moment(transaction.transactionDate).format("YYYY-MM-DD hh:mm:ss A"), // Replace with actual transaction date
      particular: transaction.debitAccount.accountName,
      details: transaction.transactionDescription,
      closingBalance: transaction.creditAccountClosingBalance,
      trID: transaction.trId,
      transactionId: transaction.transactionId,
      debit: "-",
      credit: transaction.transactionAmount,
    })),
    ...(transactionDebit ?? []).map((transaction: any) => ({
      date: moment(transaction.transactionDate).format("YYYY-MM-DD hh:mm:ss A"), // Replace with actual transaction date
      particular: transaction.creditAccount.accountName, // Replace with actual particular
      details: transaction.transactionDescription,
      closingBalance: transaction.debitAccountClosingBalance,
      trID: transaction.trId,
      transactionId: transaction.transactionId,
      debit: transaction.transactionAmount,
      credit: "-",
    })),
  ];

  console.log("transactions", transactions);

  //Format Closing Balance
  const formattedClosingBalance = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(closingBalance);

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

  //Checked Box
  const checkedBoxData = transactions?.filter((obj: any) =>
    checkedKeys.includes(obj.transactionId)
  );

  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === transactions?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < transactions?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? transactions?.map((item: any) => item.transactionId)
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
      doc.text(`${params.accountName}`, centerX("Ledger"), 30);
      doc.setFontSize(8);
      doc.setTextColor(35);
      doc.text(
        "House 60, Lake Drive Road, Sector:07, Uttara, Dhaka-1230",
        centerX("House 60, Lake Drive Road, Sector:07, Uttara, Dhaka-1230"),
        35
      );
    };

    const tableColumn = [
      "Transaction Date",
      "Particular",
      "TR No",
      "Transaction Id",
      "Debit",
      "Credit",
      "Balance",
    ];

    const tableRows = checkedBoxData.map((item: any) => [
      moment(item.date).format("ll"),
      item?.particular,
      item?.trID,
      item?.transactionId,
      item?.debit,
      item?.credit,
      item?.closingBalance,
    ]);

    // Calculate the total sum of the amount
    const totalDebit = checkedBoxData.reduce(
      (sum: any, item: any) => sum + item.debit,
      0
    );

    const totalCredit = checkedBoxData.reduce(
      (sum: any, item: any) => sum + item.credit,
      0
    );

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
    doc.text(`Total Debit: ${totalDebit}`, 14, finalY + 10);
    doc.text(`Total Credit: ${totalCredit}`, 14, finalY + 20);

    doc.save("ledger.pdf");
  };

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            // disabled={!isLoading && !allRequisitionList?.data?.length}
            onClick={generatePDF}
            eventKey={1}
          >
            Export to PDF
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <div>
          <div>
            <div>
              <h1 className="text-xl bg-blue-50 shadow-sm p-2 rounded-md">
                Account Details Page
              </h1>
              <Panel bordered className="shadow-sm my-2 bg-slate-50">
                <Grid fluid>
                  <Row className="show-grid">
                    <Col xs={24} sm={12} md={6}>
                      <p>
                        <strong>Account ID:</strong>
                      </p>
                      <p>{accountId}</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <p>
                        <strong>Account Name:</strong>
                      </p>
                      <h2 className="text-lg font-semibold">{accountName}</h2>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <p>
                        <strong>Closing Balance:</strong>
                      </p>
                      <p>{formattedClosingBalance}</p>
                    </Col>
                  </Row>
                  <Row className="show-grid" style={{ marginTop: "20px" }}>
                    <Col xs={24} sm={12} md={6}>
                      <p>
                        <strong>Created At:</strong>
                      </p>
                      <p>{new Date(createdAt).toLocaleString()}</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <p>
                        <strong>Updated At:</strong>
                      </p>
                      <p>{new Date(updatedAt).toLocaleString()}</p>
                    </Col>
                  </Row>
                </Grid>
              </Panel>
            </div>
            <div className="my-5 mx-2 flex justify-between gap-2 w-full">
              <div className="flex items-center gap-5">
                <div className="w-full">
                  <label htmlFor="voice-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none w-full">
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
                      size={100}
                      className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB] w-full pl-10 py-2 rounded-lg focus:outline-none"
                      placeholder="Search with Tr No Ex Conveyance01"
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

              <div className="mr-2">
                <Whisper
                  placement="bottomEnd"
                  speaker={renderMenu}
                  trigger={["click"]}
                >
                  <Button type="button" appearance="primary">
                    <span>{/* <LiaFileExportSolid size={25} /> */}</span>
                    <span>Export</span>
                  </Button>
                </Whisper>
              </div>
            </div>

            <div>
              <h1 className="text-xl bg-blue-50 shadow-sm p-2 rounded-md">
                Transactions
              </h1>
              <Panel
                bordered
                style={{ marginTop: "20px" }}
                className="bg-slate-50 shadow-sm"
              >
                <Table
                  bordered={true}
                  cellBordered={true}
                  wordWrap="break-word"
                  rowHeight={70}
                  headerHeight={50}
                  shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
                  autoHeight={true}
                  data={transactions}
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
                            dataKey="transactionId"
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
                    <HeaderCell style={headerCss}>Transaction Date</HeaderCell>
                    <Cell
                      dataKey="date"
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    ></Cell>
                  </Column>

                  <Column flexGrow={4}>
                    <HeaderCell style={headerCss}>
                      Particular & Details
                    </HeaderCell>
                    <Cell
                      // dataKey="particular"
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      {(rowData) => (
                        <>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {rowData.particular}
                          </span>
                          <br />
                          <span style={{ fontWeight: "normal" }}>
                            {rowData.details}
                          </span>
                        </>
                      )}
                    </Cell>
                  </Column>

                  {/* Details*/}
                  <Column flexGrow={1}>
                    <HeaderCell style={headerCss}>TR No</HeaderCell>
                    <Cell
                      dataKey="trID"
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    ></Cell>
                  </Column>

                  {/* Details*/}
                  <Column flexGrow={2}>
                    <HeaderCell style={headerCss}>Transaction Id</HeaderCell>
                    <Cell
                      dataKey="transactionId"
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    ></Cell>
                  </Column>

                  {/* Details*/}
                  <Column flexGrow={1}>
                    <HeaderCell style={headerCss}>Debit</HeaderCell>
                    <Cell
                      dataKey="debit"
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      {(rowData) => formatNumber(rowData.debit)}
                    </Cell>
                  </Column>

                  {/* Status*/}
                  <Column flexGrow={1}>
                    <HeaderCell style={headerCss}>Credit</HeaderCell>
                    <Cell
                      dataKey="credit"
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      {(rowData) => formatNumber(rowData.credit)}
                    </Cell>
                  </Column>

                  {/* Status*/}
                  <Column flexGrow={1}>
                    <HeaderCell style={headerCss}>Balance</HeaderCell>
                    <Cell
                      dataKey=""
                      verticalAlign="middle"
                      style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      {(rowData) => formatNumber(rowData.closingBalance)}
                    </Cell>
                  </Column>
                </Table>
              </Panel>
            </div>
          </div>

          <div className="flex items-start gap-2 border p-2 shadow-sm">
            <h1 className="text-sm">
              <span>Total Debit : {totalDebit}</span>
            </h1>
            <h1 className="text-sm">
              <span>Total Credit : {totalCredit}</span>
            </h1>
          </div>

          <div style={{ padding: "20px 10px 0px 10px" }}>
            <Pagination
              total={data?.data?.meta?.total}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="lg"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[10, 20, 50, 100, 200, 300, 400, 500]}
              limit={size}
              onChangeLimit={(limitChange: any) => setSize(limitChange)}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAccountDetails;
