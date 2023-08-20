import {VictoryAxis, VictoryBar, VictoryChart} from "victory";
import { Gradient1, strokeColor, tickLabelColor, transparentColor} from "@/components/victory/constants/colors";
import {ToolTip} from "@/components/victory/components/tooltip";
import {defaultDependentAxisFormatter, emptyLabel, getYDomain} from "@/components/victory/mappers";
import {chartClassProps, xAxis, yAxis} from "@/components/victory/constants/constants";
import {BarChartProps} from "@/components/victory/types";

export function BarChart({data, className = "",width , height, dependentAxisFormatter = defaultDependentAxisFormatter}: BarChartProps) {
    const yDomain = getYDomain(data);
    return (
        <div className={`${className}`}>
            <VictoryChart
                domain={{y: [0, yDomain]}}
                domainPadding={{x: 40, y: 0}}
                padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
                height={30}
                width={300}
            >
                <VictoryAxis
                    style={{
                        axis: {stroke: "transparent"}, 
                        ticks: {stroke: "transparent"},
                        tickLabels: { fill:"transparent"} 
                    }}
                />
                <VictoryBar
                    animate={{onLoad: {duration: 1000}}}
                    barWidth={35}
                    cornerRadius={{top: 6, bottom: 0}}
                    style={{data: {backgroundColor: "#0000"}}}
                    data={data}
                    x={xAxis}
                    y={yAxis}
                />
            </VictoryChart>
        </div>
    )
}
