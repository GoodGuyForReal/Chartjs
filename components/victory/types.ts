export interface ChartData {
    xLabel: string;
    yValue: number;
}
export interface ChartProps {
    data: ChartData[];
    title?: string;
    className?: string;
    dependentAxisFormatter?: (x: number) => string;
}

export interface BarChartProps extends ChartProps {
    height?: number;
    width?: number;
}

export interface LineAreaChartProps extends ChartProps {
    height?: number;
    width?: number;
    shadowTicksIndex?: number;
    dashedDot?: boolean;
}