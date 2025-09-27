import React from "react";

type ErrorMessageProps = {
  error: unknown;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">
        Error loading products: {(error as Error).message}
      </p>
    </div>
  );
};

export default ErrorMessage;
