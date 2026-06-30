import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#4c51bf', '#34a853', '#ff9800', '#e91e63'];

export default function Chart({
  type = 'line',
  data,
  xKey = 'date',
  yKey = 'value',
  height = 200,
  hideAxis = false,
}) {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            {hideAxis ? null : <XAxis dataKey={xKey} hide={hideAxis} />}
            {hideAxis ? null : <YAxis hide={hideAxis} />}
            <Tooltip />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            {hideAxis ? null : <XAxis dataKey={xKey} hide={hideAxis} />}
            {hideAxis ? null : <YAxis hide={hideAxis} />}
            <Tooltip />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            {hideAxis ? null : <XAxis dataKey={xKey} hide={hideAxis} />}
            {hideAxis ? null : <YAxis hide={hideAxis} />}
            <Tooltip />
            <Bar dataKey={yKey} fill="var(--color-primary)" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Tooltip />
            <Pie data={data} dataKey={yKey} nameKey={xKey} outerRadius={height / 2}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  );
}
