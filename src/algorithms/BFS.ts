import type { VisualStep } from '../types/graphTypes';
import { initializeEdges } from '../utils/graphUtils';

export function generateBFSSteps(
  adjacencyList: { [key: string]: string[] },
  start: string
): VisualStep[] {
  const steps: VisualStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [start];
  const allEdges = initializeEdges(adjacencyList);
  const usedEdges = new Set<string>();

  const parent: { [key: string]: string | null } = {};
  parent[start] = null;

  // Initial step
  steps.push({
    currentNode: null,
    visitedNodes: new Set(),
    processingNodes: new Set([start]),
    edges: allEdges,
    action: "visit",
    description: `Starting BFS traversal from node ${start}. Added ${start} to queue.`
  });

  while (queue.length > 0) {
    const current = queue.shift()!; // FIFO for BFS

    if (!visited.has(current)) {
      visited.add(current);

      // Mark edge from parent
      if (parent[current]) {
        usedEdges.add(`${parent[current]}-${current}`);
      }

      // Step: visiting current node
      steps.push({
        currentNode: current,
        visitedNodes: new Set(visited),
        processingNodes: new Set(queue),
        edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
        action: "visit",
        description: `Visiting node ${current}. Marked as visited.`
      });

      const neighbors = adjacencyList[current] || [];
      const unvisitedNeighbors: string[] = [];

      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
          parent[neighbor] = current;
          unvisitedNeighbors.push(neighbor);
        }
      });

      // Step: processing neighbors
      if (unvisitedNeighbors.length > 0) {
        steps.push({
          currentNode: current,
          visitedNodes: new Set(visited),
          processingNodes: new Set(queue),
          edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
          action: "process",
          description: `From ${current}, added unvisited neighbors to queue: ${unvisitedNeighbors.join(', ')}. Queue now contains: [${queue.join(', ')}]`
        });
      }
    }
  }

  // Final step: BFS complete
  steps.push({
    currentNode: null,
    visitedNodes: visited,
    processingNodes: new Set(),
    edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
    action: "complete",
    description: `BFS traversal complete! Visited ${visited.size} nodes: [${Array.from(visited).join(', ')}]`
  });

  return steps;
}