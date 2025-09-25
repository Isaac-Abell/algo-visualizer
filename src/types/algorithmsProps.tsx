export interface AlgorithmParam {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  options?: string[];
  default?: string;
}

export interface Algorithm {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  params: AlgorithmParam[];
}

export type AlgorithmId = 'binary-search' | 'heap-sort' | 'quick-sort' | 'dijkstra' | 'dfs';

export interface ProcessedParams {
  [key: string]: string | number | number[] | Record<string, string[]>;
}