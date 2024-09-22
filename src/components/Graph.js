import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SlotBookingGraph = ({ slotData }) => {
  // Sample data for demonstration, replace with your actual slot data
  const defaultSlotData = [
    { slotTime: '06:00 AM - 08:00 AM', bookingCount: 8 },
    { slotTime: '08:00 AM - 10:00 AM', bookingCount: 10 },
    { slotTime: '10:00 AM - 12:00 PM', bookingCount: 7 },
    { slotTime: '12:00 PM - 02:00 PM', bookingCount: 5 },
    { slotTime: '02:00 PM - 04:00 PM', bookingCount: 6 },
  ];

  const slots = slotData || defaultSlotData;

  // Prepare data for the bar chart
  const chartData = {
    labels: slots.map((slot) => slot.slotTime),
    datasets: [
      {
        label: 'Number of Bookings',
        data: slots.map((slot) => slot.bookingCount),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options for styling
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Bookings Per Slot',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Slot Booking Graph</h3>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SlotBookingGraph;
