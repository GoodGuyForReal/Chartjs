'use client';

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "tailwindcss/types/config";

interface YAxisTickProps {
  x: number;
  y: number;
  payload: { value: string };
}

const YAxisTick: React.FC<YAxisTickProps> = ({ x, y, payload }) => {
  const [transform, setTransform] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTransform(`translate(${x},${y})`);
    }
  }, [x, y]);
  
  return (
    <g transform={transform}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#c0bdcc" className="text-sm">
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if(active){
    return payload?.map(item => (
      <div key={item.dataKey} className="shadow rounded-lg bg-white py-2 px-4 text-center mb-1">
        <p className="text-xs text-gray-400">Active</p>
        <p className="text-indigo-600 text-base">{item.value}</p>
      </div>
    ))
  }
  return null;
};

const BarReChart = () => {
  const data = [
    {
      name: "Jan",
      users: 80,
    },
    {
      name: "Feb",
      users: 190,
    },
    {
      name: "Mar",
      users: 110,
    },
    {
      name: "Apr",
      users: 200,
    },
    {
      name: "May",
      users: 140,
    },
    {
      name: "Jun",
      users: 100,
    },
    {
      name: "Jul",
      users: 75,
    },
  ];

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div className='max-w-5xl mx-auto my-16'>
      <BarChart
        width={500}
        height={300}
        data={data}
        id="bar-chart"
        >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="1" x2="0" y2="0">
            <stop offset="30%" stopColor="#4f46e5" stopOpacity={1} />
            <stop offset="65%" stopColor="#a21caf" stopOpacity={1} />
            <stop offset="95%" stopColor="#fb7185" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} />
        {/* @ts-ignore */}
        <YAxis axisLine={false} tickLine={false} tick={<YAxisTick />} />
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
        <Legend />
        {!isSSR && <Bar dataKey="users" fill="url(#colorUv)" radius={[30, 30, 0, 0]} barSize={30} />}
      </BarChart>
    </div>
  );
};

export default BarReChart;
