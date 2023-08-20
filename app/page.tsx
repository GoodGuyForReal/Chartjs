"use client"
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <button className="bg-blue-500 hover:bg-blue-700" onClick={() => router.push("chart-js")}>
                Ye yo go chart-js
            </button>

            <button className="bg-blue-500 hover:bg-blue-700" onClick={() => router.push("recharts")}>
                Ye yo go recharts
            </button>

            <button className="bg-blue-500 hover:bg-blue-700" onClick={() => router.push("victory-charts")}>
                Ye yo go victory charts
            </button>
        </main>
    )
}
