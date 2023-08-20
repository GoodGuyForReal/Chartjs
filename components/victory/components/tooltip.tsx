import {accentColor, shadowColor, transparentColor} from "@/components/victory/constants/colors";
import {VictoryTooltip} from "victory";

const titleTextColor = "#7A86A1"
const backgroundColor = "#fff"

function CustomFlyout(props: any) {
    const {x, y, datum, datumFormatter, dimensionRatio, title, dashedDot} = props;

    const datumValue = Number(datum.yValue)
    const datumLabel = datumFormatter ? datumFormatter(datumValue) : datumValue.toLocaleString(undefined, { maximumFractionDigits: 2 });
    const tY = dashedDot ? y - (dimensionRatio * 10) : y;

    const width = dimensionRatio * 100;
    const height = dimensionRatio * 50;

    const xRectPadding = dimensionRatio * 50;
    const yRectPadding = dimensionRatio * 55;
    const cornerRadius = dimensionRatio * 16;

    const yTitlePadding = dimensionRatio * 38;
    const titleFontSize = dimensionRatio * 9;

    const xTitlePadding = dimensionRatio * 20;
    const xTitleFontSize = dimensionRatio * 15;

    const shadowDx = dimensionRatio * 2;
    const shadowDy = dimensionRatio * 2.75;
    const shadowStdDeviation = dimensionRatio * 1.7;

    const dashedDotRadius = dimensionRatio * 1.6;
    const dashedDotInnerFillerRadius = dimensionRatio * 6;
    const dashedDotStrokeFillerRadius = dimensionRatio * 5;

    return (
        <g>
            <filter id="boxShadow">
                <feDropShadow dx={shadowDx} dy={shadowDy} stdDeviation={shadowStdDeviation} floodColor={shadowColor()}/>
            </filter>
            <rect
                x={x - xRectPadding}
                y={tY - yRectPadding}
                width={width}
                height={height}
                rx={cornerRadius}
                fill={backgroundColor}
                filter="url(#boxShadow)"
                stroke={shadowColor(0.03)}
            />
            <text
                x={x}
                y={tY - yTitlePadding}
                fontSize={titleFontSize}
                fill={titleTextColor}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {title}
            </text>
            <text
                x={x}
                y={tY - xTitlePadding}
                fontSize={xTitleFontSize}
                fill={accentColor}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {datumLabel}
            </text>
            {dashedDot && <circle cx={x} cy={y} r={dashedDotRadius} fill={accentColor} stroke={backgroundColor} strokeWidth={dashedDotInnerFillerRadius} />}
            {dashedDot && <circle cx={x} cy={y} r={dashedDotStrokeFillerRadius} fill={transparentColor} stroke={accentColor} strokeWidth={dashedDotRadius} />}
        </g>
    );
}

export const ToolTip = (title: string, dimensionRatio: number = 1.0, dashedDot: boolean = false, datumFormatter?: (value: number) => string) => {
    return <VictoryTooltip flyoutComponent={<CustomFlyout dimensionRatio={dimensionRatio} title={title} dashedDot={dashedDot} datumFormatter={datumFormatter}/>}/>
}
