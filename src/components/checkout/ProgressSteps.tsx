import React from "react";

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            currentStep >= 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          1
        </div>
        <div
          className={`h-1 w-16 mx-2 ${
            currentStep >= 2 ? "bg-blue-500" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            currentStep >= 2
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          2
        </div>
      </div>
    </div>
  );
};
