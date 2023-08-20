import {ChartData} from "@/components/victory/types";
import {strokeColor, tickLabelColor} from "@/components/victory/constants/colors";

export function defaultDependentAxisFormatter(x: number): string {
    if (x >= 1000) {
        const num = Number((x/1000).toFixed());
        return `$${num}k`
    }
    return `$${x}`
}

export function getYDomain(chartData: ChartData[]) {
    const yValues = chartData.map(chartData => chartData.yValue)
    const highestYValue = Math.max(...yValues);
    const increasedAmount = highestYValue * 1.1;
    return Number(increasedAmount.toFixed())
}

export function shadowTicksForIndex(index: number, visibleIndex?: number) {
    if (!visibleIndex) return tickLabelColor;
    return index % visibleIndex == 0 ? tickLabelColor : strokeColor
}

export function emptyLabel() {return ""}
