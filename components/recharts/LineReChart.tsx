"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps
} from "recharts";
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';

const data = [
  {
    name: "Jan",
    expenses: 4000,
    income: 2500,
  },
  {
    name: "Feb",
    expenses: 3000,
    income: 2400,
  },
  {
    name: "Mar",
    expenses: 2000,
    income: 5000,
  },
  {
    name: "Apr",
    expenses: 2780,
    income: 7800,
  },
  {
    name: "May",
    expenses: 1890,
    income: 2750,
  },
  {
    name: "Jun",
    expenses: 2390,
    income: 3200,
  },
  {
    name: "Jul",
    expenses: 3490,
    income: 4100,
  },
];

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
  if(Number(payload.value) === 0) {
    return <g></g>
  }
  
  return (
    <g transform={transform}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" className="text-sm">
        {`$${Number(payload.value) / 1000}k`}
      </text>
    </g>
  );
};

const XAxisTick = ({ x, y, payload }: {x: number, y: number, payload: { value: string }}) => {
  const customStyle = {
    fill: "#C0BDCC",
    fontSize: "0.875rem",
  }
  // console.log(x, y)

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill={customStyle.fill} style={customStyle}>
        {payload.value}
      </text>
    </g>
  );
}

// const CustomLegend = () => {
//   return (
//     <div className="text-center mt-4 text-purple-600">
//       Custom Legend
//     </div>
//   );
// }

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if(active){
    return payload?.map(item => (
      <div key={item.dataKey} className="shadow rounded-lg bg-white py-2 px-4 text-center mb-1">
        <p className="text-xs text-gray-400">{item.dataKey}</p>
        <p>{`$${item.value}`}</p>
      </div>
    ))
  }
  return null;
};

const LineReChart = () => {
  return (
    <div className='max-w-5xl mx-auto my-16'>
      <LineChart
        id="line-chart"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* @ts-ignore */}
        <CartesianGrid strokeDasharray="3 3"  horizontal={false} vertical={false} />
        <XAxis dataKey="name" tick={XAxisTick} axisLine={false} tickLine={false} />
        {/* @ts-ignore */}
        <YAxis tick={<YAxisTick />} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {/* By adding content props to Legend and giving it the proper component we can create custom legends */}
        <Legend  />
        <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 4 }} dot={false} />
        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" activeDot={{ r: 4 }} dot={false} />
      </LineChart>
    </div>
  );
};

export default LineReChart;

// There is a warning on the console: Warning: Curve: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.
// Unfortunately there is no solution for this warning currently. Src: https://github.com/recharts/recharts/issues/3615

// Another warning: Warning: Prop `strokeDasharray` did not match. Server: "null" Client: "0px 0px"
// I tried to give null value because that props do not affect anything. I also made ts to ignore the error, but somehow browser kept giving this warning