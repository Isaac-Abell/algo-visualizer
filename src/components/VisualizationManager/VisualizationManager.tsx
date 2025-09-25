import React from 'react';
import { BinarySearchVisualizer } from '../AlgoVisualizers/BinarySearchVisualizer/BinarySearchVisualizer';
import { HeapSortVisualizer } from '../AlgoVisualizers/HeapSortVisualizer/HeapSortVisualizer';
import { QuickSortVisualizer } from '../AlgoVisualizers/QuickSortVisualizer/QuickSortVisualizer';
import { DFSVisualizer } from '../AlgoVisualizers/DFSVisualizer/DFSVisualizer';
import { BFSVisualizer } from '../AlgoVisualizers/BFSVisualizer/BFSVisualizer';
import type { ProcessedParams } from '../../types/algorithmsProps';


export class VisualizationManager {
  static createVisualization(
    algorithmId: string, 
    processedParams: ProcessedParams,
    onSetVisualization: (element: React.JSX.Element | null) => void
  ): void {
    console.log(`Starting ${algorithmId} visualization with params:`, processedParams);
    
    switch (algorithmId) {
      case 'binary-search':
        onSetVisualization(
          <BinarySearchVisualizer 
            {...(processedParams as { array: number[]; target: number })} 
          />
        );
        break;
        
      case 'heap-sort':
        onSetVisualization(
          <HeapSortVisualizer array={processedParams.array as number[]} />
        );
        break;
        
      case 'quick-sort':
        onSetVisualization(
          <QuickSortVisualizer array={processedParams.array as number[]} />
        );
        break;
        
      case 'bfs':
        onSetVisualization(
          <BFSVisualizer
            adjacencyList={processedParams.adjacencyList as Record<string, string[]>}
            start={processedParams.start as string}
          />
        );
        break;
        
      case 'dfs':
        onSetVisualization(
          <DFSVisualizer
            adjacencyList={processedParams.adjacencyList as Record<string, string[]>}
            start={processedParams.start as string}
          />
        );
        break;
        
      default:
        console.warn(`Unknown algorithm: ${algorithmId}`);
        onSetVisualization(null);
    }
  }
}