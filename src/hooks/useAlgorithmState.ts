import { useState } from 'react';

export interface AlgorithmState {
  selectedAlgorithm: string;
  params: Record<string, string | number>;
  visualizedElement: React.JSX.Element | null;
}

export function useAlgorithmState() {
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

  const setVisualization = (element: React.JSX.Element | null): void => {
    setVisualizedElement(element);
  };

  return {
    selectedAlgorithm,
    params,
    visualizedElement,
    handleAlgorithmSelect,
    handleParamChange,
    setVisualization
  };
}