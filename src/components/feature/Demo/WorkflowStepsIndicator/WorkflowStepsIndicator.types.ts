export interface Step {
  id: string;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  isReachable: boolean; // Can the user click to go to this step?
}

export interface WorkflowStepsIndicatorProps {
  steps: Step[];
  onStepClick?: (stepId: string) => void;
} 