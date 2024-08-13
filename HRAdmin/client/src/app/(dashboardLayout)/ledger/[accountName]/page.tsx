"use client";

import { useGetAccountByNameQuery } from "@/redux/api/features/accountApi";
import moment from "moment";
import React from "react";
import { Table, Panel, Loader, Grid, Row, Col, Button, Heading } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const SingleAccountDetails = ({ params }: any) => {
  const { data } = useGetAccountByNameQuery({
    accountName: params.accountName,
  });

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
  } = data.data;

  const transactions = [
    ...transactionCredit.map((transaction: any) => ({
      date: moment(transaction.createdAt).format("YYYY-MM-DD hh:mm:ss A"), // Replace with actual transaction date
      particular: transaction.debitAccount.accountName, // Replace with actual particular
      trID: transaction.trId,
      transactionId: transaction.transactionId,
      debit: "-",
      credit: transaction.transactionAmount,
    })),
    ...transactionDebit.map((transaction: any) => ({
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

  return (
    <div style={{ padding: "20px" }}>
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
  );
};

export default SingleAccountDetails;
