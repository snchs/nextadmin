import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Function to interpolate between blue and red based on the value
const interpolateColor = (value, minValue, maxValue) => {
  const ratio = (value - minValue) / (maxValue - minValue);
  const r = Math.round(255 * ratio);
  const b = Math.round(255 * (0.8 - ratio));
  return `rgba(${r}, 4, ${b}, 0.8)`;
};

const ChartComponent = ({ filteredData }) => {
  // Extract unique years and types
  const years = [...new Set(filteredData.map(item => item.year))];
  const types = [...new Set(filteredData.map(item => item.type))];
  years.reverse();
  // Find min and max values for scaling the colors
  const values = filteredData.map(item => item.end_year);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Prepare the datasets for stacking
  const datasets = types.map((type) => {
    const data = years.map(year => {
      const item = filteredData.find(d => d.year === year && d.type === type);
      return item ? item.end_year : 0; // Use only the end_year value
    });
    const backgroundColor = data.map(value => interpolateColor(value, minValue, maxValue));
    return {
      label: type,
      data: data,
      backgroundColor: backgroundColor, // Use the generated colors
    };
  });

  const chartData = {
    labels: years,
    datasets: datasets,
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'left' },
            title: { display: true, text: 'График с накоплением' },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
          layout: {
            padding: 10,
          },
        }}
      />

    </div>
  );
};

export default ChartComponent;