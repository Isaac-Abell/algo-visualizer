import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heapSort } from "../../algorithms/HeapSort";
import { Controls } from '../Controls/Controls';
import "./HeapSortVisualizer.css";
import { HeapTree } from "../HeapTree/HeapTree";

interface VisualStep {
    array: number[];
    heapSize: number;
    indices: number[];
    action: "highlight" | "swap" | "heapify" | "sorted";
    swapFrom?: number;
    swapTo?: number;
    description: string;
}

interface HeapSortVisualizerProps {
    array: number[];
}

export function HeapSortVisualizer({ array }: HeapSortVisualizerProps) {
    const [steps, setSteps] = useState<VisualStep[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [displayArray, setDisplayArray] = useState<number[]>(array);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [isAnimating, setIsAnimating] = useState(false);

    const TREE_WIDTH = 800;

    // Prepare visual steps from heapSort
    useEffect(() => {
        const rawSteps = heapSort(array);
        const visualSteps: VisualStep[] = [];

        rawSteps.forEach((s) => {
            if (s.action === "compare") {
                visualSteps.push({
                    array: [...s.array],
                    heapSize: s.heapSize,
                    indices: [...s.indices],
                    action: "highlight",
                    description: `Comparing elements: ${s.indices.map(i => s.array[i]).join(', ')}`,
                });
            } else if (s.action === "swap") {
                const [i, j] = s.indices;
                visualSteps.push({
                    array: [...s.array],
                    heapSize: s.heapSize,
                    indices: [i, j],
                    action: "highlight",
                    description: `About to swap elements at indices ${i} and ${j}`,
                });
                visualSteps.push({
                    array: [...s.array],
                    heapSize: s.heapSize,
                    indices: [i, j],
                    action: "swap",
                    swapFrom: i,
                    swapTo: j,
                    description: `Swapping elements at indices ${i} and ${j}`,
                });
            } else if (s.action === "heapify") {
                visualSteps.push({
                    array: [...s.array],
                    heapSize: s.heapSize,
                    indices: [...s.indices],
                    action: "heapify",
                    description: `Heapifying from index ${s.indices[0]}`,
                });
            } else if (s.action === "sorted") {
                visualSteps.push({
                    array: [...s.array],
                    heapSize: s.heapSize,
                    indices: [],
                    action: "sorted",
                    description: "Array is now fully sorted!",
                });
            }
        });

        setSteps(visualSteps);
        setCurrentStep(-1);
        setDisplayArray([...array]);
        setIsPlaying(false);
        setIsAnimating(false);
    }, [array]);

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying || currentStep >= steps.length - 1 || isAnimating) return;
        const id = setTimeout(() => handleStepForward(), speed);
        return () => clearTimeout(id);
    }, [isPlaying, currentStep, steps, speed, isAnimating]);

    const handleStepForward = () => {
        if (currentStep >= steps.length - 1 || isAnimating) return;

        const nextStep = steps[currentStep + 1];

        if (nextStep.action === "swap" && nextStep.swapFrom !== undefined && nextStep.swapTo !== undefined) {
            setCurrentStep(prev => prev + 1);
            setIsAnimating(true);

            setTimeout(() => {
                setDisplayArray([...nextStep.array]);
                setIsAnimating(false);
            }, 400);
        } else {
            setCurrentStep(prev => prev + 1);
            setDisplayArray([...nextStep.array]);
        }
    };

    const handleStepBack = () => {
        if (currentStep <= -1 || isAnimating) return;
        const newStep = currentStep - 1;
        setCurrentStep(newStep);

        if (newStep >= 0) {
            setDisplayArray([...steps[newStep].array]);
        } else {
            setDisplayArray([...array]);
        }
        setIsAnimating(false);
    };

    const handleReset = () => {
        setCurrentStep(-1);
        setDisplayArray([...array]);
        setIsPlaying(false);
        setIsAnimating(false);
    };

    const step = currentStep >= 0 ? steps[currentStep] : null;
    const heapSize = step ? step.heapSize : array.length;
    const highlighted = step?.indices || [];

    const getTreePositions = (length: number) => {
        const positions: { x: number; y: number }[] = [];
        const levelHeight = 70;

        const place = (i: number, depth: number, x: number, spread: number) => {
            if (i >= length) return;
            positions[i] = { x, y: depth * levelHeight + 40 };
            place(2 * i + 1, depth + 1, x - spread / 2, spread / 2);
            place(2 * i + 2, depth + 1, x + spread / 2, spread / 2);
        };

        if (length > 0) {
            place(0, 0, TREE_WIDTH / 2, TREE_WIDTH / 2);
        }
        return positions;
    };

    const treePositions = getTreePositions(heapSize);

    return (
        <div className="hs-visualizer">
            <h2 className="hs-title">Heap Sort Visualizer</h2>

            <Controls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentStep={currentStep}
                totalSteps={steps.length}
                speed={speed}
                setSpeed={setSpeed}
                onStepForward={handleStepForward}
                onStepBack={handleStepBack}
                onReset={handleReset}
                isAnimating={isAnimating}
            />

            {/* Array view */}
            <div className="hs-array">
                {displayArray.map((val, i) => {
                    const isHighlighted = highlighted.includes(i);
                    const isSorted = i >= heapSize;
                    const isSwapping = step?.action === "swap" && (i === step.swapFrom || i === step.swapTo);

                    return (
                        <motion.div
                            key={`array-${i}`}
                            className={`hs-element ${isSorted ? "hs-sorted" : ""} ${isHighlighted ? "hs-swap" : ""}`}
                            initial={false}
                            animate={{
                                scale: isSwapping ? 1.1 : 1,
                                zIndex: isSwapping ? 10 : 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                scale: { duration: 0.2 }
                            }}
                        >
                            {val}
                        </motion.div>
                    );
                })}
            </div>

            {/* Heap tree visualization */}
            <div className="hs-tree-wrapper">
                <HeapTree
                    array={displayArray}
                    heapSize={heapSize}
                    highlightedIndices={highlighted}
                    treePositions={treePositions}
                    stepAction={step?.action}
                    swapFrom={step?.swapFrom}
                    swapTo={step?.swapTo}
                />
            </div>
        </div>
    );
}