import React, {ReactElement} from "react";
import {ChartData} from "@/components/victory/types";

export const transparentColor = "#00000000"
export const accentColor = "#6149CD"
export const tickLabelColor = "#C0BDCC"

export const strokeColor = "transparent"
export const fillNone = "none"

export const Gradient1: GradientFill = {
    gradient:
        <defs>
            <linearGradient id="Gradient1" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#4f46e5"/>
                <stop offset="50%" stopColor="#a21caf"/>
                <stop offset="100%" stopColor="#fb7185"/>
            </linearGradient>
        </defs>,
    id: "Gradient1",
}

interface GradientFill {
    gradient: ReactElement;
    id: string;
}

interface PieGradientProps {
    start: string;
    mid: string;
    end: string;
}

const PieGradient1: PieGradientProps = {start:"#EA5F8B", mid:"#A654AC", end:"#6149CD"}
const PieGradient2: PieGradientProps = {start:"#F9B035", mid:"#F98C4E", end:"#F96767"}
const PieGradient3: PieGradientProps = {start:"#FFEBF6", mid:"#FFB1DC", end:"#FE76C2"}
const PieGradients: PieGradientProps[] = [PieGradient1, PieGradient2, PieGradient3]

const AreaGradient: PieGradientProps = {start: "#fff", mid: "#A654AC", end: "#EA5F8B"}

function PieGradientFactory(props: PieGradientProps, id: string): GradientFill {
    const {start, mid, end} = props;
    return {
        gradient:
            <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor={start}/>
                <stop offset="0.5" stopColor={mid}/>
                <stop offset="1" stopColor={end}/>
            </linearGradient>,
        id: id,
    }
}

function AreaGradientFactory(id: string): GradientFill {
    const {start, mid, end} = AreaGradient;
    return {
        gradient:
            <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor={start} stopOpacity={0.1}/>
                <stop offset="0.5" stopColor={mid} stopOpacity={0.1}/>
                <stop offset="1" stopColor={end} stopOpacity={0.1}/>
            </linearGradient>,
        id: id,
    }
}

export function getPieGradients(chartData: ChartData[]): GradientFill[] {
    return chartData.map((data, index) => PieGradientFactory(PieGradients[index], data.xLabel))
}

export function getAreaGradient(id: string): GradientFill {
    return AreaGradientFactory(id);
}

export const getGradientId = (id: string): string => `url(#${id})`
export const shadowColor = (opacity: number = 0.13) => `rgba(105, 95, 151, ${opacity})`;
