import React from 'react';
import { isCsrfError, handleCsrfError } from '@/Utils/csrfHelper';

interface CsrfErrorHandlerProps {
  children: React.ReactNode;
  errors?: Record<string, any>;
}

const CsrfErrorHandler: React.FC<CsrfErrorHandlerProps> = ({ children, errors }) => {
  React.useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      // Check if any error is a CSRF error
      const hasCsrfError = Object.values(errors).some((error: any) => 
        isCsrfError({ message: error })
      );

      if (hasCsrfError) {
        handleCsrfError({ message: 'CSRF token mismatch detected' });
      }
    }
  }, [errors]);

  return <>{children}</>;
};

export default CsrfErrorHandler;
