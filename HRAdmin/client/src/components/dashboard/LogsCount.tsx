"use client";

import { useGetLogsQuery } from "@/redux/api/features/logApi";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const LogsCount = () => {
  const query: Record<string, any> = {};

  const { data: logsData, isLoading } = useGetLogsQuery({ ...query });

  const limitedData = logsData?.data?.slice().reverse().slice(0, 10);

  return (
    <div className=" rounded overflow-hidden shadow-lg bg-white p-4 lg:m-3 m-2">
      <Table
        autoHeight
        data={limitedData}
        bordered={true}
        cellBordered={true}
        rowHeight={70}
        headerHeight={50}
        wordWrap="break-word"
        loading={isLoading}
        className="rsuite-table"
      >
        {/* Serial Number Column */}
        <Column width={60} fixed="left">
          <HeaderCell className="text-xl font-bold">SL</HeaderCell>
          <Cell>{(rowData) => limitedData?.indexOf(rowData) + 1}</Cell>
        </Column>

        <Column flexGrow={1} align="normal">
          <HeaderCell className="text-xl font-bold">Log Message</HeaderCell>
          <Cell dataKey="message" />
        </Column>
      </Table>
    </div>
  );
};

export default LogsCount;
