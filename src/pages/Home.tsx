import React from 'react';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { AlgorithmSelection } from '../components/AlgorithmSelection/AlgorithmSelection';
import { AlgorithmWorkspace } from '../components/AlgorithmWorkspace/AlgorithmWorkspace';
import { useAlgorithmState } from '../hooks/useAlgorithmState';
import './Home.css';

export function Home(): React.JSX.Element {
  const {
    selectedAlgorithm,
    params,
    visualizedElement,
    handleAlgorithmSelect,
    handleParamChange,
    setVisualization
  } = useAlgorithmState();

  return (
    <div className="home-container">
      <div className="home-content">
        <AppHeader />
        
        <AlgorithmSelection
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmSelect={handleAlgorithmSelect}
        />
        
        <AlgorithmWorkspace
          selectedAlgorithm={selectedAlgorithm}
          params={params}
          visualizedElement={visualizedElement}
          onParamChange={handleParamChange}
          onSetVisualization={setVisualization}
        />
      </div>
    </div>
  );
}