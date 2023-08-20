'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
  Filler,
  TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// Custom tooltip
// Couldn't figure out how to remove default tooltip content
const footer = (tooltipItems: TooltipItem<'bar'>[]) => {
  let sum = 0;

  tooltipItems.forEach(function(tooltipItem: TooltipItem<'bar'>) {
    sum += tooltipItem.parsed.y;
  });
  return 'Earning\n' + '$' + sum + 'k';
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'bottom' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
    tooltip: {
      callbacks: {
        footer: footer
      }
    }
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        drawTicks: false,
      },
      border: {
        display: false,
      }
    },
    y: {
      grid: {
        drawOnChartArea: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        callback: function(val: string) {
          return `$${val}k`;
        },
        color: '#C0BDCC',
      }
    }
  }
}

export const data = {
  // labels that we defined above, bottom side labels of the chart as default
  labels,
  datasets: [
    {
      label: 'Your Earnings This Month',
      data: [4.5, 6, 4, 6.5, 8.5, 3, 4.5],
      fill: 'start',
      backgroundColor: (context: ScriptableContext<"bar">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(context.chart.width/2, context.chart.height, context.chart.width/2, 0);
        gradient.addColorStop(0, "#f87171");
        gradient.addColorStop(0.5, "#fb923c");
        gradient.addColorStop(1, "#fbbf24");

        const gradient1 = ctx.createLinearGradient(context.chart.width/2, context.chart.height, context.chart.width/2, 0);
        gradient1.addColorStop(0, "#4f46e5");
        gradient1.addColorStop(0.5, "#a21caf");
        gradient1.addColorStop(1, "#fb7185");

        return ['#F6EFFF', gradient, "#F6EFFF", gradient1, "#F6EFFF", "#F6EFFF", "#F6EFFF"];
      },
      borderRadius: 40,
      borderSkipped: false,
    },
  ],
};

const VerticalBarChart = () => {

  return (
    <div className='max-w-5xl mx-auto mt-32'>
      {/* @ts-ignore */}
      <Bar options={options} data={data} />
    </div>
  )
}

export default VerticalBarChart;