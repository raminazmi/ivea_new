import React from 'react';
import { usePage } from '@inertiajs/react';
import { isCsrfError, handleCsrfError } from '@/Utils/csrfHelper';

interface CsrfErrorBoundaryProps {
  children: React.ReactNode;
}

const CsrfErrorBoundary: React.FC<CsrfErrorBoundaryProps> = ({ children }) => {
  // Check if we're within an Inertia context
  let errors = null;
  try {
    const pageProps = usePage().props;
    errors = pageProps.errors;
  } catch (error) {
    // Not in Inertia context, skip CSRF error checking
    return <>{children}</>;
  }

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

// Higher-Order Component for wrapping pages
export const withCsrfErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => (
    <CsrfErrorBoundary>
      <Component {...props} />
    </CsrfErrorBoundary>
  );
};

export default CsrfErrorBoundary;
