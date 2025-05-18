import { motion } from 'framer-motion';
import { KeyRound, Lock, Unlock, CheckCircle, ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { ProgressStepsProps } from './ProgressSteps.types';

const steps = [
  { icon: KeyRound, label: 'Generate Keys' },
  { icon: Lock, label: 'Encrypt Message' },
  { icon: Unlock, label: 'Decrypt Message' },
  { icon: CheckCircle, label: 'Verify Result' },
];

export const ProgressSteps: FC<ProgressStepsProps> = ({
  currentStep,
  keyPairGenerated,
  messageEncrypted,
  messageDecrypted,
  messageVerified,
}) => {
  // Calculate the status of each step
  const stepStatus = [
    keyPairGenerated ? 'completed' : currentStep === 0 ? 'current' : 'pending',
    messageEncrypted ? 'completed' : currentStep === 1 ? 'current' : 'pending',
    messageDecrypted ? 'completed' : currentStep === 2 ? 'current' : 'pending',
    messageVerified ? 'completed' : currentStep === 3 ? 'current' : 'pending',
  ];

  return (
    <div className="relative mb-16">
      {/* Line connecting the steps */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 z-0"></div>
      
      {/* Progress line that fills based on current step */}
      <div 
        className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-1 transition-all duration-500"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      ></div>
      
      {/* Step indicators */}
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const status = stepStatus[index];
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ 
                    scale: status === 'current' ? 1.1 : 1,
                    opacity: status === 'pending' ? 0.7 : 1
                  }}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center 
                    ${status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : status === 'current'
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300/30'
                        : 'bg-gray-700 text-gray-400'
                    } transition-colors duration-300`}
                >
                  <StepIcon className={`w-6 h-6 ${status === 'pending' ? 'opacity-70' : ''}`} />
                  
                  {status === 'completed' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -right-1 -top-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Arrow repositioned to the right, clearly visible */}
                {status === 'current' && index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 text-blue-400"
                  >
                    <div className="bg-gray-800 rounded-full p-1 border border-blue-500">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                )}
              </div>
              
              <p className={`mt-2 text-sm font-medium 
                ${status === 'completed' 
                  ? 'text-green-400' 
                  : status === 'current' 
                    ? 'text-blue-400' 
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps; 