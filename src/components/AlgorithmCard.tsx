import type { Algorithm } from './Algorithms';

interface AlgorithmCardProps {
  algorithm: Algorithm;
  isSelected: boolean;
  onSelect: (algorithmId: string) => void;
}

export function AlgorithmCard({ algorithm, isSelected, onSelect }: AlgorithmCardProps) {
  return (
    <div
      onClick={() => onSelect(algorithm.id)}
      className={`algorithm-card ${isSelected ? 'selected' : ''}`}
    >
      <div className="algorithm-card-header">
        <div className={`algorithm-card-icon ${isSelected ? 'selected' : 'default'}`}>
          {algorithm.icon}
        </div>
        <h3 className="algorithm-card-title">
          {algorithm.name}
        </h3>
      </div>
      <p className="algorithm-card-description">
        {algorithm.description}
      </p>
    </div>
  );
}