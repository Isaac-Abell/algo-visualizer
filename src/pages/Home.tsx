import { useState } from 'react';
import { AlgorithmCard } from '../components/AlgorithmCard';
import { ConfigPanel } from '../components/ConfigPanel';
import { EmptyState } from '../components/EmptyState';
import { algorithms } from '../components/Algorithms';
import type { Algorithm, ProcessedParams } from '../components/Algorithms';
import { BinarySearchVisualizer } from '../components/AlgoVisualizer/BinarySearchVisualizer';
import { HeapSortVisualizer } from '../components/AlgoVisualizer/HeapSortVisualizer';
import { DFSVisualizer } from '../components/AlgoVisualizer/DFSVisualizer';
import { BFSVisualizer } from '../components/AlgoVisualizer/BFSVisualizer';
import { QuickSortVisualizer } from '../components/AlgoVisualizer/QuickSortVisualizer';

import './Home.css';

export function Home(): React.JSX.Element {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
  const [params, setParams] = useState<Record<string, string | number>>({});
  const [visualizedElement, setVisualizedElement] = useState<React.JSX.Element | null>(null);

  const handleAlgorithmSelect = (algorithmId: string): void => {
    setSelectedAlgorithm(algorithmId);
    setVisualizedElement(null);
    setParams({});
  };

  const handleParamChange = (paramName: string, value: string): void => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleVisualize = (algorithmId: string, processedParams: ProcessedParams): void => {
    const algorithm = algorithms.find(a => a.id === algorithmId);
    if (!algorithm) return;
    
    console.log(`Starting ${algorithm.name} visualization with params:`, processedParams);
    if (algorithm.id === 'binary-search') {
      setVisualizedElement(<BinarySearchVisualizer {...(processedParams as { array: number[]; target: number })} />);
    }
    else if (algorithm.id === 'heap-sort') {
      setVisualizedElement(<HeapSortVisualizer array={processedParams.array as number[]} />);
    }
    else if (algorithm.id === 'quick-sort') {
      setVisualizedElement(<QuickSortVisualizer array={processedParams.array as number[]} />);
    }
    else if (algorithm.id === 'bfs') {
       setVisualizedElement(
        <BFSVisualizer
          adjacencyList={processedParams.adjacencyList as Record<string, string[]>}
          start={processedParams.start as string}
        />
      );
    }
    else if (algorithm.id === 'dfs') {
      setVisualizedElement(
        <DFSVisualizer
          adjacencyList={processedParams.adjacencyList as Record<string, string[]>}
          start={processedParams.start as string}
        />
      );
    }
  };

  const selectedAlgo: Algorithm | undefined = algorithms.find(a => a.id === selectedAlgorithm);

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header */}
        <div className="home-header">
          <h1 className="home-title">
            Algorithm Visualizer
          </h1>
          <p className="home-subtitle">
            Explore and understand algorithms through interactive visualizations. 
            Choose an algorithm below and configure its parameters.
          </p>
        </div>

        {/* Algorithm Selection Grid */}
        <div className="algorithm-grid">
          {algorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
              isSelected={selectedAlgorithm === algorithm.id}
              onSelect={handleAlgorithmSelect}
            />
          ))}
        </div>

        {/* Parameter Configuration or Empty State */}
        {selectedAlgo ? (
          <>
            <ConfigPanel
              algorithm={selectedAlgo}
              params={params}
              onParamChange={handleParamChange}
              onVisualize={handleVisualize}
            />
            {visualizedElement}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}