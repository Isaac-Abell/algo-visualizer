import { useState, useEffect } from 'react';
import { binarySearch } from '../../algorithms/BinarySearch';
import type { BinarySearchStep } from '../../algorithms/BinarySearch';
import { Controls } from '../Controls/Controls';
import './BinarySearchVisualizer.css';

interface BinarySearchVisualizerProps {
    array: number[];
    target: number;
}

export function BinarySearchVisualizer({
    array,
    target,
}: BinarySearchVisualizerProps) {
    const [steps, setSteps] = useState<BinarySearchStep[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(1000); // milliseconds

    useEffect(() => {
        const searchSteps = binarySearch(array, target);
        console.log(searchSteps);
        setSteps(searchSteps);
        setCurrentStep(-1);
        setIsPlaying(false);
    }, [array, target, binarySearch]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => {
                setCurrentStep(prev => prev + 1);
            }, speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }

        return () => clearInterval(interval);
    }, [isPlaying, currentStep, steps.length, speed]);

    const handleReset = (): void => {
        setCurrentStep(-1);
        setIsPlaying(false);
    };

    const handleStepForward = (): void => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleStepBackward = (): void => {
        if (currentStep > -1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const getElementClass = (index: number): string => {
        if (currentStep === -1) return 'bs-element';

        const step = steps[currentStep];

        // If search finished and target not found
        if (step.mid === -1 && !step.found) {
            return 'bs-element bs-not-found';
        }

        const allEliminated = steps.slice(0, currentStep + 1).flatMap(s => s.eliminated);

        if (step.found && index === step.mid) return 'bs-element bs-found';
        if (index === step.mid) return 'bs-element bs-current-mid';
        if (index === step.left || index === step.right) return 'bs-element bs-boundary';
        if (allEliminated.includes(index)) return 'bs-element bs-eliminated';
        if (index >= step.left && index <= step.right) return 'bs-element bs-active-range';

        return 'bs-element bs-inactive';
    };


    const getCurrentComparison = (): string => {
        if (currentStep === -1 || !steps[currentStep]) return '';

        const step = steps[currentStep];

        // Handle target not found
        if (step.mid === -1 && !step.found) {
            return 'Target not in list';
        }

        const midValue = array[step.mid];

        switch (step.comparison) {
            case 'less':
                return `Mid value ${midValue} < target ${target} → searching right half`;
            case 'greater':
                return `Mid value ${midValue} > target ${target} → searching left half`;
            case 'equal':
                return `Mid value ${midValue} = target ${target} → target found!`;
            default:
                return `Comparing mid value ${midValue} with target ${target}`;
        }
    };

    return (
        <div className="bs-visualizer">
            <div className="bs-header">
                <h2 className="bs-title">Binary Search Visualization</h2>
            </div>

            <Controls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentStep={currentStep}
                totalSteps={steps.length}
                speed={speed}
                setSpeed={setSpeed}
                onStepForward={handleStepForward}
                onStepBack={handleStepBackward}
                onReset={handleReset}
                isAnimating={isPlaying}
            />

            <div className="bs-array-container">
                <div className="bs-info">
                    <span className="bs-target">Target: <strong>{target}</strong></span>
                </div>
                <div className="bs-array">
                    {array.map((value, index) => (
                        <div
                            key={index}
                            className={getElementClass(index)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bs-status">
                <div className="bs-comparison">
                    {getCurrentComparison()}
                </div>
            </div>

            <div className="bs-legend">
                <div className="bs-legend-item">
                    <div className="bs-legend-color bs-current-mid"></div>
                    <span>Current Mid</span>
                </div>
                <div className="bs-legend-item">
                    <div className="bs-legend-color bs-boundary"></div>
                    <span>Left/Right Boundary</span>
                </div>
                <div className="bs-legend-item">
                    <div className="bs-legend-color bs-active-range"></div>
                    <span>Active Search Range</span>
                </div>
                <div className="bs-legend-item">
                    <div className="bs-legend-color bs-eliminated"></div>
                    <span>Eliminated</span>
                </div>
                <div className="bs-legend-item">
                    <div className="bs-legend-color bs-found"></div>
                    <span>Found</span>
                </div>
            </div>
        </div>
    );
}