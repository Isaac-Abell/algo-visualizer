import React from 'react';
import { ConfigPanel } from '../ConfigPanel/ConfigPanel';
import { EmptyState } from '../EmptyState/EmptyState';
import { VisualizationManager } from '../VisualizationManager/VisualizationManager';
import { algorithms } from '../Algorithms/Algorithms';
import type { Algorithm, ProcessedParams } from '../../types/algorithmsProps';
import './AlgorithmWorkspace.css';

interface AlgorithmWorkspaceProps {
  selectedAlgorithm: string;
  params: Record<string, string | number>;
  visualizedElement: React.JSX.Element | null;
  onParamChange: (paramName: string, value: string) => void;
  onSetVisualization: (element: React.JSX.Element | null) => void;
}

export function AlgorithmWorkspace({
  selectedAlgorithm,
  params,
  visualizedElement,
  onParamChange,
  onSetVisualization
}: AlgorithmWorkspaceProps): React.JSX.Element {
  const selectedAlgo: Algorithm | undefined = algorithms.find(a => a.id === selectedAlgorithm);

  const handleVisualize = (algorithmId: string, processedParams: ProcessedParams): void => {
    const algorithm = algorithms.find(a => a.id === algorithmId);
    if (!algorithm) return;
    
    VisualizationManager.createVisualization(algorithmId, processedParams, onSetVisualization);
  };

  if (!selectedAlgo) {
    return <EmptyState />;
  }

  return (
    <div className="algorithm-workspace">
      <ConfigPanel
        algorithm={selectedAlgo}
        params={params}
        onParamChange={onParamChange}
        onVisualize={handleVisualize}
      />
      {visualizedElement && (
        <div className="visualization-container">
          {visualizedElement}
        </div>
      )}
    </div>
  );
}