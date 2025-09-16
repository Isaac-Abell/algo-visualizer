export interface HeapSortStep {
    array: number[];
    action: 'compare' | 'swap' | 'heapify' | 'sorted';
    indices: number[];       // indices being highlighted
    heapSize: number;        // current heap size
}

function heapify(arr: number[], n: number, i: number, steps: HeapSortStep[]): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // First, compare with the left child and highlight
    if (left < n) {
        steps.push({ array: [...arr], action: 'compare', indices: [i, left], heapSize: n });
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    // Then, compare with the right child and highlight all three if it exists
    if (right < n) {
        steps.push({ array: [...arr], action: 'compare', indices: [i, largest, right], heapSize: n });
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        steps.push({ array: [...arr], action: 'swap', indices: [i, largest], heapSize: n });
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        steps.push({ array: [...arr], action: 'heapify', indices: [i, largest], heapSize: n });
        heapify(arr, n, largest, steps);
    } else {
        steps.push({ array: [...arr], action: 'heapify', indices: [i], heapSize: n });
    }
}

export function heapSort(arr: number[]): HeapSortStep[] {
    const steps: HeapSortStep[] = [];
    const arrayCopy = [...arr];
    const n = arrayCopy.length;

    // Build max heap step by step
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arrayCopy, n, i, steps);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        // Highlight and swap (heap includes last element)
        steps.push({ array: [...arrayCopy], action: 'swap', indices: [0, i], heapSize: i + 1 });
        [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];

        // Show swapped state before removal
        steps.push({ array: [...arrayCopy], action: 'heapify', indices: [0, i], heapSize: i + 1 });

        // Now remove last element from heap (reduce heap size)
        steps.push({ array: [...arrayCopy], action: 'heapify', indices: [], heapSize: i });

        // Heapify the new root
        heapify(arrayCopy, i, 0, steps);
    }

    // Final sorted step
    steps.push({ array: [...arrayCopy], action: 'sorted', indices: [], heapSize: 0 });
    return steps;
}