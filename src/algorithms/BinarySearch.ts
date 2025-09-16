export interface BinarySearchStep {
  left: number;
  right: number;
  mid: number;
  found: boolean;
  comparison: 'equal' | 'less' | 'greater' | null;
  eliminated: number[]; // indices eliminated in this step
}
export function binarySearch(
  array: number[],
  target: number
): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];

  let left = 0;
  let right = array.length - 1;
  const eliminatedIndices: number[] = [];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];

    let comparison: 'equal' | 'less' | 'greater' | null = null;
    let found = false;

    if (midValue == target) {
      comparison = 'equal';
      found = true;
    } else if (midValue < target) {
      comparison = 'less';
      for (let i = left; i <= mid; i++) {
        if (!eliminatedIndices.includes(i)) eliminatedIndices.push(i);
      }
      left = mid + 1;
    } else {
      comparison = 'greater';
      for (let i = mid; i <= right; i++) {
        if (!eliminatedIndices.includes(i)) eliminatedIndices.push(i);
      }
      right = mid - 1;
    }

    steps.push({
      left,
      right,
      mid,
      found,
      comparison,
      eliminated: [...eliminatedIndices],
    });

    if (found) return steps;
  }

  // Add a final step to show that search is over and target wasn't found
  steps.push({
    left,
    right,
    mid: -1,
    found: false,
    comparison: null,
    eliminated: [...eliminatedIndices],
  });

  return steps;
}