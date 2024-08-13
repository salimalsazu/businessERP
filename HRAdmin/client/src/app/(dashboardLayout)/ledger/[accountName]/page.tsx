"use client";

import { useGetAccountByNameQuery } from "@/redux/api/features/accountApi";
import { useDebounced } from "@/redux/hooks";
import moment from "moment";
import React, { useState } from "react";
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
} from "rsuite";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const SingleAccountDetails = ({ params }: any) => {
  console.log("params", params);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  } = data?.data?.data;

  const transactions = [
    ...transactionCredit?.map((transaction: any) => ({
      date: moment(transaction.createdAt).format("YYYY-MM-DD hh:mm:ss A"), // Replace with actual transaction date
      particular: transaction.debitAccount.accountName, // Replace with actual particular
      trID: transaction.trId,
      transactionId: transaction.transactionId,
      debit: "-",
      credit: transaction.transactionAmount,
    })),
    ...transactionDebit?.map((transaction: any) => ({
      date: moment(transaction.createdAt).format("YYYY-MM-DD hh:mm:ss A"), // Replace with actual transaction date
      particular: transaction.creditAccount.accountName, // Replace with actual particular
      trID: transaction.trId,
      transactionId: transaction.transactionId,
      debit: transaction.transactionAmount,
      credit: "-",
    })),
  ];

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

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            // disabled={!isLoading && !allRequisitionList?.data?.length}
            // onClick={generatePDF}
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
        <h1 className="text-xl bg-blue-50 shadow-sm p-2 rounded-md">
          Account Details Page
        </h1>
        <Panel bordered className="shadow-sm my-2">
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
                  <strong>Opening Balance:</strong>
                </p>
                <p>{openingBalance}</p>
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
        <Panel bordered style={{ marginTop: "20px" }}>
          <Table height={400} data={transactions} wordWrap bordered>
            <Column flexGrow={1} align="center" fixed>
              <HeaderCell>Transaction Date</HeaderCell>
              <Cell dataKey="date" />
            </Column>
            <Column flexGrow={1} align="center">
              <HeaderCell>Particular</HeaderCell>
              <Cell dataKey="particular" />
            </Column>
            <Column flexGrow={1} align="center">
              <HeaderCell>Transaction No</HeaderCell>
              <Cell dataKey="trID" />
            </Column>
            <Column flexGrow={1} align="center">
              <HeaderCell>Transaction Id</HeaderCell>
              <Cell dataKey="transactionId" />
            </Column>
            <Column flexGrow={1} align="center">
              <HeaderCell>Debit (Taka)</HeaderCell>
              <Cell dataKey="debit" />
            </Column>
            <Column flexGrow={1} align="center">
              <HeaderCell>Credit (Taka)</HeaderCell>
              <Cell dataKey="credit" />
            </Column>
          </Table>
        </Panel>
      </div>
    </div>
  );
};

export default SingleAccountDetails;
