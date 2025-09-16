import type { GraphNode, GraphEdge } from "../types/graphTypes";

// Helper function to calculate node positions in a circle layout
export function calculateNodePositions(adjacencyList: { [key: string]: string[] }): { [key: string]: GraphNode } {
  const nodes = Object.keys(adjacencyList);
  const positions: { [key: string]: GraphNode } = {};
  
  const centerX = 400;
  const centerY = 300;
  const radius = Math.min(200, 150 + nodes.length * 10);
  
  nodes.forEach((node, index) => {
    const angle = (2 * Math.PI * index) / nodes.length;
    positions[node] = {
      id: node,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });
  
  return positions;
}

// Helper function to initialize all edges
export function initializeEdges(adjacencyList: { [key: string]: string[] }): GraphEdge[] {
  const allEdges: GraphEdge[] = [];
  
  Object.keys(adjacencyList).forEach(node => {
    adjacencyList[node].forEach(neighbor => {
      allEdges.push({ from: node, to: neighbor, isActive: true });
    });
  });
  
  return allEdges;
}

// Helper function to get active edges based on visited nodes
export function getActiveEdges(allEdges: GraphEdge[], visitedSet: Set<string>): GraphEdge[] {
  return allEdges.map(edge => ({
    ...edge,
    isActive: visitedSet.has(edge.from) && visitedSet.has(edge.to)
  }));
}