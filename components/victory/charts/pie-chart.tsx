import React, { useEffect, useState } from "react";
import {VictoryPie} from "victory";
import {ToolTip} from "@/components/victory/components/tooltip";
import {chartClassProps, xAxis, yAxis} from "@/components/victory/constants/constants";
import {emptyLabel} from "@/components/victory/mappers";
import {ChartData, ChartProps} from "@/components/victory/types";
import {getGradientId, getPieGradients} from "@/components/victory/constants/colors";

function cleanChartData(chartData: ChartData[]): ChartData[] {
  const initialMinYValue = 3
  const totalDataCount = chartData.length * initialMinYValue
  return chartData.map((item: ChartData, index) => {
    const yValue = index === 0 ? (100-totalDataCount) : initialMinYValue
    return {xLabel: item.xLabel, yValue: yValue}
  })
}

export default function PieChart({data, title, className = ""}: ChartProps) {
    const cleanedData = cleanChartData(data);
    const [graphicData, setGraphicData] = useState(cleanedData);

    const pieGradients = getPieGradients(data)
    const colorScales = pieGradients.map((gradient) => getGradientId(gradient.id))

    useEffect(() => setGraphicData(data), [data]);

    return (
        <div className={`${chartClassProps} ${className}`}>
            <svg>
                <defs>
                    {pieGradients.map(item => item.gradient)}
                </defs>
            </svg>
            <VictoryPie
                animate={{easing: 'exp', duration: 1000}}
                padAngle={1}
                innerRadius={100}
                cornerRadius={30}
                colorScale={colorScales}
                labels={emptyLabel}
                labelComponent={ToolTip(title)}
                data={graphicData}
                x={xAxis}
                y={yAxis}
            />
        </div>
    )
}
