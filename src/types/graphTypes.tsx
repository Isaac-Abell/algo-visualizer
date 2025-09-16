export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  isActive: boolean;
}

export interface VisualStep {
  currentNode: string | null;
  visitedNodes: Set<string>;
  processingNodes: Set<string>;
  edges: GraphEdge[];
  action: "visit" | "process" | "backtrack" | "complete";
  description: string;
}

export interface GraphVisualizerProps {
  adjacencyList: { [key: string]: string[] };
  start: string;
}

export interface GraphComponentProps {
  adjacencyList: { [key: string]: string[] };
  step: VisualStep | null;
  nodePositions: { [key: string]: GraphNode };
}