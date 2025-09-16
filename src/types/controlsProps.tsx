export interface ControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentStep: number;
  totalSteps: number;
  speed: number;
  setSpeed: (speed: number) => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  isAnimating: boolean;
}