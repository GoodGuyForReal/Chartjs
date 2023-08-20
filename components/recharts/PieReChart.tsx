'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [
  { name: 'Marketing', value: 4345 },
  { name: 'Bills', value: 12268 },
  { name: 'Other', value: 8686 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={10}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} $${value.toLocaleString()}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PieReChart = () => { 
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  }

  const COLORS = [
    { start: "#EA5F8B", via: "#A654AC", end: "#6149CD" },
    { start: "#F9B035", via: "#F98C4E", end: "#F96767" },
    { start: "#FFEBF6", via: "#FFB1DC", end: "#FE76C2" },
  ];

  return (
    <div className='max-w-5xl mx-auto my-16'>
      <PieChart width={600} height={400} id='pie-chart'>
      <defs>
          {data.map((entry, index) => (
            <linearGradient key={`myGradient${index}`} id={`myGradient${index}`}>
              <stop stopColor={COLORS[index % COLORS.length].start} />
              <stop offset="0.53" stopColor={COLORS[index % COLORS.length].via} />
              <stop offset="1" stopColor={COLORS[index % COLORS.length].via} />
            </linearGradient>
          ))}
        </defs>
        {!isSSR && <Pie
          activeIndex={[0, 1, 2]} // index of the slice that you want to display or number array of the slices that you want to display
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          cornerRadius={40}
          paddingAngle={3} // padding between slices
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
        ))}
        </Pie>}
      </PieChart>
    </div>
  );
}

export default PieReChart;