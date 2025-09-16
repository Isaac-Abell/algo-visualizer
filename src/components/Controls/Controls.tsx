import React from "react";
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react";
import type { ControlsProps } from "../../types/controlsProps";
import "./Controls.css";

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  setIsPlaying,
  currentStep,
  totalSteps,
  speed,
  setSpeed,
  onStepForward,
  onStepBack,
  onReset,
  isAnimating
}) => {
  return (
    <div className="graph-controls">
      <button 
        className="control-btn reset" 
        onClick={onReset}
        disabled={isAnimating}
        title="Reset to beginning"
      >
        <RotateCcw size={20} />
      </button>
      
      <button 
        className="control-btn" 
        onClick={onStepBack} 
        disabled={currentStep <= -1 || isAnimating}
        title="Previous step"
      >
        <SkipBack size={20} />
      </button>
      
      <button 
        className={`control-btn play-pause ${isPlaying ? "playing" : ""}`} 
        onClick={() => setIsPlaying(!isPlaying)}
        disabled={isAnimating || currentStep >= totalSteps - 1}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button 
        className="control-btn" 
        onClick={onStepForward} 
        disabled={currentStep >= totalSteps - 1 || isAnimating}
        title="Next step"
      >
        <SkipForward size={20} />
      </button>
      
      <div className="speed-control">
        <label htmlFor="speed">Speed:</label>
        <select 
          id="speed" 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isAnimating}
        >
          <option value={1500}>0.5x</option>
          <option value={1000}>1x</option>
          <option value={500}>2x</option>
          <option value={250}>4x</option>
        </select>
      </div>
      
      <div className="step-info">
        <span>Step: {currentStep + 1} / {totalSteps}</span>
      </div>
    </div>
  );
};