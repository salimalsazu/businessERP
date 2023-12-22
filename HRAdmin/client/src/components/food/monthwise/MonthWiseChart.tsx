"use client";

import { useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "10",
    cost: 150,
  },
  {
    name: "5",
    cost: 90,
  },
  {
    name: "5",
    cost: 120,
  },
  {
    name: "8",
    cost: 78,
  },
];

const customToolTip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black rounded-3xl p-2">
        <p className="text-white">{payload[0].value}</p>
      </div>
    );
  }
};

// For client side Rendering
const MonthWiseChart = () => {
  const [isClient, setIsClient] = useState(false);
  const CustomTick = ({ x, y, payload }: any) => {
    const paddingLeft = payload.index === 0 ? 20 : 0; // Add padding only for the first tick
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="start"
          fill="#949494"
          fontSize={13}
          fontWeight={600}
          style={{ paddingLeft }}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-2 shadow-lg shadow-[#7acae913]">
      <div className="flex flex-col items-end">
        <p>
          {" "}
          <span className="font-bold">Left:</span> Meal Cost
        </p>
        <p>
          {" "}
          <span className="font-bold">Bottom :</span> Job Id
        </p>
      </div>

      {isClient && (
        <ResponsiveContainer width="100%" height={408}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F78908" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F78908" stopOpacity={0} />
                {/* Add border to the linear gradient */}
                <animate
                  attributeName="stroke-width"
                  from="0"
                  to="5"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>

            <XAxis strokeWidth={0} dataKey="name" tick={CustomTick} />

            <YAxis
              dataKey="cost"
              strokeWidth={0}
              tick={{ fontSize: 13, fontWeight: 600, fill: "#949494" }}
              domain={["dataMin", "dataMax"]}
            />
            <CartesianGrid
              strokeDasharray="5 5"
              horizontal={true}
              vertical={false}
            />
            <Tooltip content={customToolTip} cursor={false} />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#F78908"
              fillOpacity={0.8}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthWiseChart;
