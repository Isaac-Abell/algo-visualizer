import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { quickSortWithSteps } from "../../algorithms/QuickSort";
import type { QuickSortStep } from "../../algorithms/QuickSort";
import { Controls } from '../Controls/Controls';
import "./QuickSortVisualizer.css";

interface QuickSortVisualizerProps {
    array: number[];
}


export function QuickSortVisualizer({ array }: QuickSortVisualizerProps) {
    const [steps, setSteps] = useState<QuickSortStep[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [displayArray, setDisplayArray] = useState<number[]>(array);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [isAnimating, setIsAnimating] = useState(false);

    // Generate steps when array changes
    useEffect(() => {
        const sortSteps = quickSortWithSteps(array);
        setSteps(sortSteps);
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

        if (nextStep.action === "swap") {
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

    const getElementClass = (index: number) => {
        if (!step) return "";

        const classes = [];

        if (step.sortedIndices?.includes(index)) {
            classes.push("qs-sorted");
        } else if (step.pivotIndex === index) {
            classes.push("qs-pivot");
        } else if (step.swapIndices?.includes(index)) {
            classes.push("qs-swap");
        } else if (step.compareIndices?.includes(index)) {
            classes.push("qs-compare");
        } else if (step.medianCandidates?.includes(index)) {
            classes.push("qs-median-candidate");
        } else if (step.partitionRange && index >= step.partitionRange.start && index <= step.partitionRange.end) {
            classes.push("qs-active-range");
        } else {
            classes.push("qs-inactive");
        }

        return classes.join(" ");
    };

    return (
        <div className="qs-visualizer">
            <h2 className="qs-title">QuickSort Visualizer (Median of Three Pivot)</h2>

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

            {/* Step Info */}
            {step && (
                <div className="qs-step-info">
                    {step.partitionRange && (
                        <div className="qs-range-info">
                            <span>Partition Range: [{step.partitionRange.start}, {step.partitionRange.end}]</span>
                            {step.pivotIndex !== undefined && (
                                <span>Pivot: {displayArray[step.pivotIndex]} at index {step.pivotIndex}</span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Array indices */}
            <div className="qs-array-container">
                {/* Array visualization */}
                <div className="qs-array">
                    {displayArray.map((val, i) => {
                        const elementClass = getElementClass(i);
                        const isSwapping = step?.action === "swap" && step.swapIndices?.includes(i);

                        return (
                            <motion.div
                                key={`array-${i}`}
                                className={`qs-element ${elementClass}`}
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
            </div>

            {/* Status */}
            <div className="qs-status">
                <div className="qs-description">
                    {step ? step.description : ""}
                </div>
            </div>

            {/* Legend */}
            <div className="qs-legend">
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-pivot"></div>
                    <span>Pivot Element</span>
                </div>
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-median-candidate"></div>
                    <span>Median Candidate</span>
                </div>
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-compare"></div>
                    <span>Comparing</span>
                </div>
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-swap"></div>
                    <span>Swapping</span>
                </div>
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-active-range"></div>
                    <span>Active Range</span>
                </div>
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-sorted"></div>
                    <span>Sorted</span>
                </div>
                <div className="qs-legend-item">
                    <div className="qs-legend-color qs-inactive"></div>
                    <span>Inactive</span>
                </div>
            </div>
        </div>
    );
}