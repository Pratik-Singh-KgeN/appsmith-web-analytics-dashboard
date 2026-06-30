import React from 'react';
import Chart from './Chart';

export default function MetricCard({ title, value, delta, chartData, chartKey }) {
  return (
    <div className="card">
      <div className="metric-header">
        <h3>{title}</h3>
        <span className="metric-delta">{delta}</span>
      </div>
      <div className="metric-value">{value}</div>
      {chartData && (
        <Chart
          type="area"
          data={chartData}
          xKey="date"
          yKey={chartKey}
          height={80}
          hideAxis
        />
      )}
    </div>
  );
}
