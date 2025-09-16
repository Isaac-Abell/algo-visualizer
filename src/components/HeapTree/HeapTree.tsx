import { motion } from "framer-motion";

interface TreePosition {
    x: number;
    y: number;
}

interface HeapTreeProps {
    array: number[];
    heapSize: number;
    highlightedIndices: number[];
    treePositions: TreePosition[];
    stepAction?: "highlight" | "swap" | "heapify" | "sorted";
    swapFrom?: number;
    swapTo?: number;
}

export const HeapTree: React.FC<HeapTreeProps> = ({
    array,
    heapSize,
    highlightedIndices,
    treePositions,
    stepAction,
    swapFrom,
    swapTo,
}) => {
    // Calculate the height of the tree dynamically
    const calculateTreeHeight = (n: number) => {
        if (n <= 1) return 100;
        // Levels are 0-indexed, so we add 1 to get the count
        const levels = Math.floor(Math.log2(n)) + 1;
        // The first 4 levels (0-3) have a base height
        const baseHeight = 300;
        if (levels <= 4) {
            return baseHeight;
        } else {
            // Each level beyond the 4th adds 50px
            const extraLevels = levels - 4;
            return baseHeight + extraLevels * 50;
        }
    };
    const dynamicTreeHeight = calculateTreeHeight(heapSize);

    return (
        <svg className="hs-tree" width={800} height={dynamicTreeHeight}>
            {/* Draw edges */}
            {array.slice(0, heapSize).map((_, i) => {
                if (!treePositions[i]) return null;

                const leftChild = 2 * i + 1;
                const rightChild = 2 * i + 2;

                return (
                    <g key={`edges-${i}`}>
                        {leftChild < heapSize && treePositions[leftChild] && (
                            <line
                                x1={treePositions[i].x}
                                y1={treePositions[i].y}
                                x2={treePositions[leftChild].x}
                                y2={treePositions[leftChild].y}
                                stroke="#cbd5e1"
                                strokeWidth={2}
                            />
                        )}
                        {rightChild < heapSize && treePositions[rightChild] && (
                            <line
                                x1={treePositions[i].x}
                                y1={treePositions[i].y}
                                x2={treePositions[rightChild].x}
                                y2={treePositions[rightChild].y}
                                stroke="#cbd5e1"
                                strokeWidth={2}
                            />
                        )}
                    </g>
                );
            })}

            {/* Draw nodes */}
            {array.slice(0, heapSize).map((val, i) => {
                if (!treePositions[i]) return null;

                const isHighlighted = highlightedIndices.includes(i);
                const isSwapping = stepAction === "swap" && (i === swapFrom || i === swapTo);

                return (
                    <motion.g
                        key={`tree-${i}`}
                        initial={false}
                        animate={{
                            x: treePositions[i].x,
                            y: treePositions[i].y,
                            scale: isSwapping ? 1.2 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            scale: { duration: 0.2 },
                        }}
                    >
                        <circle
                            r={20}
                            className={`hs-node ${isHighlighted ? "hs-swap" : ""}`}
                        />
                        <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            dy="0.35em"
                            className="hs-node-text"
                        >
                            {val}
                        </text>
                    </motion.g>
                );
            })}
        </svg>
    );
};
