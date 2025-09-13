import React from 'react';
import { isCsrfError, handleCsrfError } from '@/Utils/csrfHelper';

interface ErrorHandlerProps {
  children: React.ReactNode;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ children }) => {
  React.useEffect(() => {
    // Global error handler for unhandled errors
    const handleGlobalError = (event: ErrorEvent) => {
      if (isCsrfError({ message: event.message })) {
        handleCsrfError(event);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && isCsrfError(event.reason)) {
        handleCsrfError(event.reason);
      }
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};

export default ErrorHandler;
