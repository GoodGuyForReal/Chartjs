"use client";

import AreaChart from "@/components/victory/charts/area-chart";
import { BarChart } from "@/components/victory/charts/bar-chart";
import LineChart from "@/components/victory/charts/line-chart";
import PieChart from "@/components/victory/charts/pie-chart";
import { ChartData } from "@/components/victory/types";

const data: ChartData[] = [
  { xLabel: "Mo", yValue: 2041 },
  { xLabel: "Tu", yValue: 2976 },
  { xLabel: "We", yValue: 1767 },
  { xLabel: "Th", yValue: 3325 },
  { xLabel: "Fr", yValue: 4889 },
  { xLabel: "Sa", yValue: 911 },
  { xLabel: "Su", yValue: 2106 },
];

const lineChartData: ChartData[] = [
  { xLabel: "Jan", yValue: 493 },
  { xLabel: "Feb", yValue: 1267 },
  { xLabel: "Mar", yValue: 2145 },
  { xLabel: "Apr", yValue: 2694 },
  { xLabel: "May", yValue: 1402 },
  { xLabel: "Jun", yValue: 1321 },
  { xLabel: "Jul", yValue: 2946 },
  { xLabel: "Aug", yValue: 2525 },
  { xLabel: "Sep", yValue: 3776 },
  { xLabel: "Oct", yValue: 4003 },
  { xLabel: "Nov", yValue: 3209 },
  { xLabel: "Dec", yValue: 2660 },
];

const pieChartData = [
  { xLabel: "Marketing", yValue: 4345 },
  { xLabel: "Bills", yValue: 12268 },
  { xLabel: "Other", yValue: 8686 },
];

export default function VictoryCharts() {
  return (
    <div>
      <div className={"flex flex-col items-center md:flex-row"}>
        <LineChart
          data={lineChartData}
          title={"Total Amount"}
          className={"w-full p-12"}
        />
        <div className={"w-24"} />
        <div className="border border-zinc-300 rounded-lg p-4 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-medium">Total Scans All Time</h3>
            <h2 className="text-4xl font-bold">21,638</h2>
            <p className="text-xs text-zinc-400">This is your lifetime scan count</p>
          </div>
          <BarChart data={data} className={"w-full"}  height={40} width={300}/>
        </div>
      </div>
      <div className={"flex flex-col items-center md:flex-row"}>
        <div className={"h-48 w-full rounded-3xl bg-purple-600 p-12"} />
        <div className={"w-24"} />
        <PieChart
          data={pieChartData}
          title={"Pie Chart"}
          className={"w-full p-12"}
        />
      </div>
      <div className={"flex flex-col items-center md:flex-row"}>
        <AreaChart
          data={lineChartData}
          title={"Total Amount"}
          className={"w-full p-12"}
        />
      </div>
    </div>
  );
}
