import type { VisualStep } from '../types/graphTypes';
import { initializeEdges } from '../utils/graphUtils';

export function generateDFSSteps(
  adjacencyList: { [key: string]: string[] },
  start: string
): VisualStep[] {
  const steps: VisualStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [start];
  const allEdges = initializeEdges(adjacencyList);
  const usedEdges = new Set<string>();

  // Track parent of each node to mark DFS tree edges correctly
  const parent: { [key: string]: string | null } = {};
  parent[start] = null;

  // Initial step
  steps.push({
    currentNode: null,
    visitedNodes: new Set(),
    processingNodes: new Set([start]),
    edges: allEdges,
    action: "visit",
    description: `Starting DFS traversal from node ${start}. Added ${start} to stack.`
  });

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (!visited.has(current)) {
      visited.add(current);

      // Mark edge from parent if it exists
      if (parent[current]) {
        usedEdges.add(`${parent[current]}-${current}`);
      }

      // Step: visiting current node
      steps.push({
        currentNode: current,
        visitedNodes: new Set(visited),
        processingNodes: new Set(stack),
        edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
        action: "visit",
        description: `Visiting node ${current}. Marked as visited.`
      });

      // Get unvisited neighbors in reverse order (DFS)
      const neighbors = [...(adjacencyList[current] || [])].reverse();
      const unvisitedNeighbors: string[] = [];

      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          parent[neighbor] = current; // track parent for edge
          unvisitedNeighbors.push(neighbor);
        }
      });

      // Step: processing neighbors
      if (unvisitedNeighbors.length > 0) {
        steps.push({
          currentNode: current,
          visitedNodes: new Set(visited),
          processingNodes: new Set(stack),
          edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
          action: "process",
          description: `From ${current}, added unvisited neighbors to stack: ${unvisitedNeighbors.join(', ')}. Stack now contains: [${stack.join(', ')}]`
        });
      }

      // Step: backtracking
      if (stack.length > 0) {
        steps.push({
          currentNode: null,
          visitedNodes: new Set(visited),
          processingNodes: new Set(stack),
          edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
          action: "backtrack",
          description: `Backtracking. Next node from stack: ${stack[stack.length - 1]}`
        });
      }
    }
  }

  // Final step: DFS complete
  steps.push({
    currentNode: null,
    visitedNodes: visited,
    processingNodes: new Set(),
    edges: allEdges.filter(edge => usedEdges.has(`${edge.from}-${edge.to}`)),
    action: "complete",
    description: `DFS traversal complete! Visited ${visited.size} nodes: [${Array.from(visited).join(', ')}]`
  });

  return steps;
}