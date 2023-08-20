'use client';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const footer = (tooltipItems: TooltipItem<'line'>[]) => {
  let sum = 0;

  tooltipItems.forEach(function(tooltipItem: TooltipItem<'line'>) {
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
      text: 'Chart.js Line Chart',
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
      max: 5,
      beginAtZero: false,
      border: {
        display: false,
      },
      ticks: {
        callback: function(val: string) {
          return `$${val}k`;
        },
        stepSize: 2,
        color: '#C0BDCC',
      }
    }
  },
  elements: {
    point:{
      radius: 0
    }
  }
}

export const data = {
  // labels that we defined above, bottom side labels of the chart as default
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: [0.5, 1.1, 1, 3, 3, 1.2, 2.7, 4, 1.3, 2, 2.9, 3],
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      borderJoinStyle: "round",
    },
    {
      label: 'Income',
      data: [0.4, 1.1, 2.2, 2, 1.8, 1.3, 3, 2.1, 3.8, 4.1, 3.2, 2.7],
      tension: 0.4,
      borderColor: "#6149CD",
    },
  ],
};

const LineChart = () => {
  return (
    <div className='max-w-5xl mx-auto my-16'>
      {/* @ts-ignore */}
      <Line options={options} data={data} className='max-h-80' />
    </div>
  )
}

export default LineChart;