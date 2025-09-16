import { Search, BarChart3, Zap, MapPin, GitBranch } from 'lucide-react';

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

export const algorithms: Algorithm[] = [
  {
    id: 'binary-search',
    name: 'Binary Search',
    icon: <Search className="w-6 h-6" />,
    description: 'Find an element in a sorted array',
    params: [
      { name: 'array', label: 'Sorted Array (if you don\'t sort the array, we will sort it for you)', type: 'text', placeholder: '1,3,5,7,9,11,13', required: true },
      { name: 'target', label: 'Target Value', type: 'number', placeholder: '7', required: true }
    ]
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    icon: <BarChart3 className="w-6 h-6" />,
    description: 'Sort using a binary heap structure',
    params: [
      { name: 'array', label: 'Array to Sort', type: 'text', placeholder: '64,34,25,12,22,11,90', required: true }
    ]
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    icon: <Zap className="w-6 h-6" />,
    description: 'Efficient divide-and-conquer sorting algorithm',
    params: [
      { name: 'array', label: 'Array to Sort', type: 'text', placeholder: '10,80,30,90,40,50,70', required: true },
    ]
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    icon: <MapPin className="w-6 h-6" />,
    description: 'Traverse a graph breadth-first',
    params: [
      { name: 'edges', label: 'Edges (format: from,to)', type: 'textarea', placeholder: '0,1\n0,2\n1,3\n1,4\n2,5', required: true },
      { name: 'start', label: 'Starting Node', type: 'number', placeholder: '0', min: '0', required: true }
    ]
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    icon: <GitBranch className="w-6 h-6" />,
    description: 'Traverse a graph depth-first',
    params: [
      { name: 'edges', label: 'Edges (format: from,to)', type: 'textarea', placeholder: '0,1\n0,2\n1,3\n1,4\n2,5', required: true },
      { name: 'start', label: 'Starting Node', type: 'number', placeholder: '0', min: '0', required: true }
    ]
  }
];