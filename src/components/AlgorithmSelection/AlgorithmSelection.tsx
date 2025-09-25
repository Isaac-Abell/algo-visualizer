import React from 'react';
import { AlgorithmCard } from '../AlgorithmCard/AlgorithmCard';
import { algorithms } from '../Algorithms/Algorithms';
import './AlgorithmSelection.css';

interface AlgorithmSelectionProps {
  selectedAlgorithm: string;
  onAlgorithmSelect: (algorithmId: string) => void;
}

export function AlgorithmSelection({ selectedAlgorithm, onAlgorithmSelect }: AlgorithmSelectionProps): React.JSX.Element {
  return (
    <div className="algorithm-selection">
      <div className="algorithm-grid">
        {algorithms.map((algorithm) => (
          <AlgorithmCard
            key={algorithm.id}
            algorithm={algorithm}
            isSelected={selectedAlgorithm === algorithm.id}
            onSelect={onAlgorithmSelect}
          />
        ))}
      </div>
    </div>
  );
}