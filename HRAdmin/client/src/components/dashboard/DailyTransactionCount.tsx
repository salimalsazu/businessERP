"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { useGetMonthWiseOrdersQuery } from "@/redux/features/orderApi";
import { useEffect, useState } from "react";
import { useGetDailyTransactionCountQuery } from "@/redux/api/features/dashboardApi";
import { SelectPicker } from "rsuite";

interface MonthWiseOrderData {
  day: string;
  transactionCount: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
    barThickness: number;
    borderColor: string;
    borderWidth: number;
  }[];
}

const DailyTransactionCount = () => {
  const query: Record<string, any> = {};

  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  query["month"] = month;
  query["year"] = year;

  const { data: monthWiseOrderData, isLoading: monthWiseOrderLoading } =
    useGetDailyTransactionCountQuery({ ...query });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (monthWiseOrderData && monthWiseOrderData.data) {
      const labels = monthWiseOrderData.data.map(
        (item: MonthWiseOrderData) => item.day
      );
      const data = monthWiseOrderData.data.map(
        (item: MonthWiseOrderData) => item.transactionCount
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Transaction",
            data,
            backgroundColor: "black",
            borderRadius: 10,
            barThickness: 40,
            borderColor: "white",
            borderWidth: 4,
          },
        ],
      });
    }
  }, [monthWiseOrderData]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Transaction Data",
      },
    },
  };

  const monthCount = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month) => ({ label: month, value: month }));

  const yearCount = [
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ].map((year) => ({ label: year, value: year }));

  return (
    <div className="grid grid-cols-1 justify-end items-end gap-3 lg:m-3 m-2">
      <div>
        {monthWiseOrderLoading ? (
          <div>
            <div className="flex justify-center items-center gap-2 w-full h-80 ">
              <div className="border-t-4 border-blue-500 border-solid h-10 w-10 rounded-full animate-spin "></div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-md">
            <div className="flex justify-end gap-2">
              <div>
                <SelectPicker
                  data={monthCount}
                  searchable={false}
                  style={{ width: 224 }}
                  placeholder="Month"
                  onChange={(value) => setMonth(value as string)}
                />
              </div>

              <div>
                <SelectPicker
                  data={yearCount}
                  searchable={false}
                  style={{ width: 224 }}
                  placeholder="Year"
                  onChange={(value) => setYear(value as string)}
                />
              </div>
            </div>
            <Bar options={options} data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyTransactionCount;
