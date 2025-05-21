import { FC } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Zap, ChevronRight } from 'lucide-react'; 
import { WorkflowStepsIndicatorProps } from './WorkflowStepsIndicator.types';

export const WorkflowStepsIndicator: FC<WorkflowStepsIndicatorProps> = ({ steps, onStepClick }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full md:w-auto md:min-w-[280px] p-4 md:p-5 bg-gray-900/60 border border-gray-700/70 rounded-lg shadow-xl backdrop-blur-lg md:sticky md:top-28 self-start">
      <h3 className="text-xl font-semibold text-sky-400 mb-5 border-b border-gray-700 pb-3 flex items-center">
        <ChevronRight className="w-5 h-5 mr-2 text-sky-500/70"/>
        Progression
      </h3>
      <nav>
        <ul className="relative space-y-0">
          {/* Vertical line for desktop */} 
          <div className="hidden md:block absolute left-[13px] top-2 bottom-2 w-0.5 bg-gray-700/70 rounded-full z-0"></div>

          {steps.map((step, index) => {
            let Icon, textColor, iconColor, ringColor, borderColor;

            if (step.isCompleted) {
              Icon = CheckCircle;
              textColor = 'text-green-400';
              iconColor = 'text-green-500';
              borderColor = 'border-green-600';
              ringColor = 'ring-green-600/40';
            } else if (step.isActive) {
              Icon = Zap;
              textColor = 'text-sky-300';
              iconColor = 'text-sky-400';
              borderColor = 'border-sky-500';
              ringColor = 'ring-sky-500/50';
            } else {
              Icon = Circle;
              textColor = 'text-gray-400';
              iconColor = 'text-gray-500';
              borderColor = 'border-gray-600';
              ringColor = 'ring-gray-700';
            }

            const hoverEffect = step.isReachable && !step.isCompleted ? 'hover:bg-gray-700/40 cursor-pointer' : 'cursor-default';
            const itemPadding = step.isActive ? 'py-3 pl-3 pr-2 md:py-3 md:pl-2 md:pr-2' : 'py-3 pl-3 pr-2 md:py-3 md:pl-2 md:pr-2';

            return (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                onClick={() => step.isReachable && onStepClick && onStepClick(step.id)}
                className={`relative flex items-center rounded-md transition-all duration-200 ${hoverEffect} ${itemPadding} group z-10`}
              >
                <div className={`relative flex items-center justify-center w-7 h-7 rounded-full mr-3 md:mr-4 flex-shrink-0 
                  ${step.isCompleted || step.isActive ? 'bg-gray-700/50' : 'bg-gray-800/60'} 
                  border-2 ${borderColor} 
                  ring-2 ${ringColor} shadow-md transition-all duration-300`}>
                  <Icon className={`w-4 h-4 ${iconColor} ${step.isActive && !step.isCompleted ? 'animate-pulse' : ''} transition-colors duration-300`} />
                </div>
                <span className={`text-sm font-medium ${textColor} transition-colors duration-300 group-hover:text-sky-300`}>{step.label}</span>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default WorkflowStepsIndicator; 