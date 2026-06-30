import React from 'react';

export default function Header({ live }) {
  return (
    <header className="app-header">
      <h1>Web Analytics Dashboard</h1>
      <nav>
        <a href="#metrics">Metrics</a>
        <a href="#charts">Charts</a>
        <a href="#table">Data Table</a>
        {live && <span className="live-indicator" title="Live data"></span>}
      </nav>
    </header>
  );
}
