import {VictoryArea, VictoryAxis, VictoryChart, VictoryTheme, VictoryVoronoiContainer} from "victory";
import {ToolTip} from "@/components/victory/components/tooltip";
import {chartClassProps, xAxis, yAxis} from "@/components/victory/constants/constants";
import {defaultDependentAxisFormatter, emptyLabel, getYDomain, shadowTicksForIndex} from "@/components/victory/mappers";
import {
    accentColor,
    fillNone,
    getAreaGradient,
    getGradientId,
    strokeColor,
    tickLabelColor
} from "@/components/victory/constants/colors";
import {LineAreaChartProps} from "@/components/victory/types";

export default function AreaChart(
    {
        data,
        title,
        height = 250,
        width,
        shadowTicksIndex,
        dashedDot = true,
        dependentAxisFormatter = defaultDependentAxisFormatter,
        className = ""
    }: LineAreaChartProps
) {
    const yDomain = getYDomain(data);
    const areaGradient = getAreaGradient('areaGradient')
    return (
        <div className={`${chartClassProps} ${className}`}>
            <svg>
                <defs>
                    {areaGradient.gradient}
                </defs>
            </svg>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{y: [0, yDomain]}}
                height={height}
                width={width}
                padding={{top: 0, bottom: 30, left: 40, right: 30}}
                containerComponent={<VictoryVoronoiContainer voronoiDimension="x"/>}
            >
                <VictoryAxis
                    dependentAxis
                    crossAxis={false}
                    tickFormat={dependentAxisFormatter}
                    style={{
                        axis: {stroke: strokeColor},
                        tickLabels: {fill: tickLabelColor, fontSize: 6},
                        ticks: {stroke: fillNone},
                        grid: {strokeDasharray: fillNone},
                    }}
                />
                <VictoryArea
                    animate={{
                        onLoad: {duration: 1000}
                    }}
                    interpolation="natural"
                    style={{
                        data: {
                            fill: getGradientId(areaGradient.id),
                            stroke: accentColor,
                            strokeWidth: 1,
                        },
                    }}
                    labels={emptyLabel}
                    labelComponent={ToolTip(title, 0.6, dashedDot)}
                    data={data}
                    x={xAxis}
                    y={yAxis}
                />
            </VictoryChart>
        </div>
    )
}
