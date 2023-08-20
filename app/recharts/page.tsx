import BarReChart from "@/components/recharts/BarReChart";
import LineReChart from "@/components/recharts/LineReChart";
import PieReChart from "@/components/recharts/PieReChart";

const Rechart = () => {
  return (
    <div>
      <PieReChart />
      <BarReChart />
      <LineReChart />
    </div>
  )
}

export default Rechart;