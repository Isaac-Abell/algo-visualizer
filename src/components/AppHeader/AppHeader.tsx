import React from 'react';
import './AppHeader.css';

export function AppHeader(): React.JSX.Element {
  return (
    <div className="app-header">
      <h1 className="app-title">
        Algorithm Visualizer
      </h1>
      <p className="app-subtitle">
        Explore and understand algorithms through interactive visualizations. 
        Choose an algorithm below and configure its parameters.
      </p>
    </div>
  );
}