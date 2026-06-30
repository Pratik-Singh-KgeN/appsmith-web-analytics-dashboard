import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import MetricCard from './components/MetricCard';
import Chart from './components/Chart';
import DataTable from './components/DataTable';
import DateRangeFilter from './components/DateRangeFilter';
import { format, subDays } from 'date-fns';
import './styles.css';

function generateInitialData() {
  const now = new Date();
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    data.push({
      date,
      visitors: Math.floor(200 + Math.random() * 300),
      duration: Math.floor(60 + Math.random() * 120),
    });
  }
  return data;
}

export default function App() {
  const [rawData, setRawData] = useState(generateInitialData);
  const [startDate, setStartDate] = useState(() => subDays(new Date(), 30));
  const [endDate, setEndDate] = useState(() => new Date());

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRawData((prev) => {
        const newPoint = {
          date: new Date(),
          visitors: Math.floor(200 + Math.random() * 300),
          duration: Math.floor(60 + Math.random() * 120),
        };
        const updated = [...prev, newPoint];
        // Keep only last 30 entries
        if (updated.length > 30) updated.shift();
        return updated;
      });
      setEndDate(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = rawData.filter(
    (d) => d.date >= startDate && d.date <= endDate
  );

  // Metrics calculations
  const totalVisitors = filteredData.reduce((sum, d) => sum + d.visitors, 0);
  const avgDuration = filteredData.length
    ? Math.round(
        filteredData.reduce((sum, d) => sum + d.duration, 0) / filteredData.length
      )
    : 0;

  // Deltas (compare last day to previous day)
  const sortedByDate = [...filteredData].sort((a, b) => a.date - b.date);
  const lastDay = sortedByDate[sortedByDate.length - 1];
  const prevDay = sortedByDate[sortedByDate.length - 2];
  const visitorsDelta = lastDay && prevDay ? lastDay.visitors - prevDay.visitors : 0;
  const durationDelta = lastDay && prevDay ? lastDay.duration - prevDay.duration : 0;

  const handleDateChange = useCallback(
    ({ startDate: newStart, endDate: newEnd }) => {
      if (newStart) setStartDate(newStart);
      if (newEnd) setEndDate(newEnd);
    },
    []
  );

  // Prepare chart data (format dates for X axis)
  const chartData = filteredData.map((d) => ({
    date: format(d.date, 'MM/dd'),
    visitors: d.visitors,
    duration: d.duration,
  }));

  return (
    <div className="app-shell">
      <Header live />
      <DateRangeFilter startDate={startDate} endDate={endDate} onChange={handleDateChange} />
      <Board>
        <MetricCard
          title="Total Visitors"
          value={totalVisitors}
          delta={`${visitorsDelta >= 0 ? '+' : ''}${visitorsDelta}`}
          chartData={chartData}
          chartKey="visitors"
        />
        <MetricCard
          title="Avg Session (s)"
          value={avgDuration}
          delta={`${durationDelta >= 0 ? '+' : ''}${durationDelta}`}
          chartData={chartData}
          chartKey="duration"
        />
        <div className="card" id="charts">
          <h3>Visitors Over Time</h3>
          <Chart type="line" data={chartData} xKey="date" yKey="visitors" height={250} />
        </div>
        <div className="card">
          <h3>Session Duration Distribution</h3>
          <Chart type="bar" data={chartData} xKey="date" yKey="duration" height={250} />
        </div>
        <DataTable data={filteredData} />
      </Board>
    </div>
  );
}
