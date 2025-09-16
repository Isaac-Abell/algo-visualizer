import React, { useState, useEffect } from "react";
import type { GraphVisualizerProps, GraphNode, VisualStep } from "../../types/graphTypes";
import { generateDFSSteps } from "../../algorithms/DFS";
import { calculateNodePositions } from "../../utils/graphUtils";
import { Graph } from "../Graph/Graph";
import { Controls } from "../Controls/Controls";
import "./DFSVisualizer.css";

export const DFSVisualizer: React.FC<GraphVisualizerProps> = ({
  adjacencyList,
  start
}) => {
  const [steps, setSteps] = useState<VisualStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: GraphNode }>({});

  // Generate DFS steps
  useEffect(() => {
    const generatedSteps = generateDFSSteps(adjacencyList, start);
    setSteps(generatedSteps);
    setCurrentStep(-1);
    setIsPlaying(false);
    setIsAnimating(false);
    setNodePositions(calculateNodePositions(adjacencyList));
  }, [adjacencyList, start]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1 || isAnimating) return;
    const id = setTimeout(() => handleStepForward(), speed);
    return () => clearTimeout(id);
  }, [isPlaying, currentStep, steps, speed, isAnimating]);

  const handleStepForward = () => {
    if (currentStep >= steps.length - 1 || isAnimating) return;
    setCurrentStep(prev => prev + 1);
  };

  const handleStepBack = () => {
    if (currentStep <= -1 || isAnimating) return;
    setCurrentStep(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setIsAnimating(false);
  };

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  return (
    <div className="dfs-visualizer">
      <h2 className="dfs-title">DFS (Depth-First Search) Visualizer</h2>

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

      <Graph
        adjacencyList={adjacencyList}
        step={currentStepData}
        nodePositions={nodePositions}
      />

      <div className="dfs-legend">
        <div className="dfs-legend-item">
          <div className="dfs-legend-color dfs-current-mid"></div>
          <span>Current Node</span>
        </div>
        <div className="dfs-legend-item">
          <div className="dfs-legend-color dfs-boundary"></div>
          <span>Pending Node</span>
        </div>
        <div className="dfs-legend-item">
          <div className="dfs-legend-color dfs-active-range"></div>
          <span>Completed Node</span>
        </div>
      </div>

    </div>
  );
};