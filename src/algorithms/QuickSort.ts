export interface QuickSortStep {
    array: number[];
    action: "partition" | "pivot" | "compare" | "swap" | "sorted" | "complete" | "median_selection";
    pivotIndex?: number;
    compareIndices?: number[];
    swapIndices?: number[];
    partitionRange?: { start: number; end: number };
    sortedIndices?: number[];
    medianCandidates?: number[];
    description: string;
}

// Helper function to generate QuickSort steps with median of three pivot selection
export function quickSortWithSteps(arr: number[]): QuickSortStep[] {
    const steps: QuickSortStep[] = [];
    const array = [...arr];
    const sortedIndices = new Set<number>();
    
    function medianOfThree(low: number, high: number): number {
        const mid = Math.floor((low + high) / 2);
        const candidates = [low, mid, high];
        
        // Show the three candidates being considered
        steps.push({
            array: [...array],
            action: "median_selection",
            medianCandidates: candidates,
            partitionRange: { start: low, end: high },
            sortedIndices: Array.from(sortedIndices),
            description: `Selecting median of three: ${array[low]} (index ${low}), ${array[mid]} (index ${mid}), ${array[high]} (index ${high})`
        });
        
        // Sort the three indices by their values to find median
        const sortedCandidates = [...candidates].sort((a, b) => array[a] - array[b]);
        const medianIndex = sortedCandidates[1]; // Middle element after sorting
        
        // If median is not already at the end, swap it there
        if (medianIndex !== high) {
            steps.push({
                array: [...array],
                action: "swap",
                swapIndices: [medianIndex, high],
                partitionRange: { start: low, end: high },
                sortedIndices: Array.from(sortedIndices),
                description: `Moving median ${array[medianIndex]} to end position for partitioning`
            });
            
            [array[medianIndex], array[high]] = [array[high], array[medianIndex]];
        }
        
        return high;
    }
    
    function partition(low: number, high: number): number {
        // Use median of three if we have at least 3 elements
        const pivotIndex = (high - low >= 2) ? medianOfThree(low, high) : high;
        const pivot = array[pivotIndex];
        
        steps.push({
            array: [...array],
            action: "pivot",
            pivotIndex,
            partitionRange: { start: low, end: high },
            sortedIndices: Array.from(sortedIndices),
            description: `Selected pivot: ${pivot} at index ${pivotIndex} (median of three)`
        });
        
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            steps.push({
                array: [...array],
                action: "compare",
                pivotIndex,
                compareIndices: [j],
                partitionRange: { start: low, end: high },
                sortedIndices: Array.from(sortedIndices),
                description: `Comparing ${array[j]} with pivot ${pivot}`
            });
            
            if (array[j] <= pivot) {
                i++;
                if (i !== j) {
                    steps.push({
                        array: [...array],
                        action: "swap",
                        pivotIndex,
                        swapIndices: [i, j],
                        partitionRange: { start: low, end: high },
                        sortedIndices: Array.from(sortedIndices),
                        description: `${array[j]} ≤ ${pivot}, swapping positions ${i} and ${j}`
                    });
                    
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
        }
        
        // Place pivot in correct position
        if (i + 1 !== high) {
            steps.push({
                array: [...array],
                action: "swap",
                pivotIndex,
                swapIndices: [i + 1, high],
                partitionRange: { start: low, end: high },
                sortedIndices: Array.from(sortedIndices),
                description: `Placing pivot ${pivot} in correct position`
            });
            
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
        }
        
        sortedIndices.add(i + 1);
        
        steps.push({
            array: [...array],
            action: "partition",
            pivotIndex: i + 1,
            partitionRange: { start: low, end: high },
            sortedIndices: Array.from(sortedIndices),
            description: `Pivot ${pivot} is now in correct position at index ${i + 1}`
        });
        
        return i + 1;
    }
    
    function quickSort(low: number, high: number): void {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }
    
    quickSort(0, array.length - 1);
    
    // Mark all remaining elements as sorted
    for (let i = 0; i < array.length; i++) {
        sortedIndices.add(i);
    }
    
    steps.push({
        array: [...array],
        action: "complete",
        sortedIndices: Array.from(sortedIndices),
        description: "Array is now completely sorted!"
    });
    
    return steps;
}