"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LabelList,
  Tooltip,
} from "recharts";

const DayWiseChart = () => {
  const [isClient, setIsClient] = useState(false);

  const dailyCost = [
    {
      employeeCost: 400,
      mealRate: 23.12,
    },
    {
      employeeCost: 312,
      mealRate: 20.12,
    },
    {
      employeeCost: 355,
      mealRate: 24.0,
    },
    {
      employeeCost: 430,
      mealRate: 26.25,
    },
    {
      employeeCost: 600,
      mealRate: 27.12,
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <ResponsiveContainer width="100%" height={408}>
          <BarChart
            data={dailyCost}
            margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="employeeCost" />
            <YAxis dataKey="mealRate" />
            <Tooltip />
            <Legend />
            <Bar dataKey="employeeCost" fill="#003E6B" barSize={50}>
              <LabelList dataKey="employeeCost" />
            </Bar>
            <Bar dataKey="mealRate" fill="#2680C2" barSize={50}>
              <LabelList dataKey="mealRate" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DayWiseChart;
