/**
 * CSRF Helper utilities for handling CSRF token operations
 */

/**
 * Get the current CSRF token from Inertia page props
 */
export const getCsrfToken = (): string | null => {
  // Try to get from Inertia page props first
  if (typeof window !== 'undefined' && (window as any).__INERTIA_PROPS__) {
    return (window as any).__INERTIA_PROPS__.csrf_token || null;
  }
  
  // Fallback to meta tag if available
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  return token || null;
};

/**
 * Check if an error is a CSRF token mismatch error
 */
export const isCsrfError = (error: any): boolean => {
  return error?.response?.status === 419 || 
         error?.message?.includes('419') ||
         error?.message?.includes('CSRF') ||
         error?.message?.includes('Page Expired');
};

/**
 * Handle CSRF errors with appropriate user feedback
 */
export const handleCsrfError = (error: any, customMessage?: string): void => {
  // Log the error for debugging
  console.warn('CSRF Error detected:', error);
  
  // With the new exception handler, CSRF errors should be handled server-side
  // This function is kept for backward compatibility
  const message = customMessage || 'انتهت صلاحية الصفحة، يرجى المحاولة مرة أخرى.';
  
  // Show user-friendly error message
  alert(message);
};

/**
 * Create a FormData object with CSRF token included
 */
export const createFormDataWithCsrf = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  // Add CSRF token
  const token = getCsrfToken();
  if (token) {
    formData.append('_token', token);
  }
  
  // Add other data
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(`${key}[]`, item));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  
  return formData;
};

/**
 * Enhanced error handler for forms
 */
export const createFormErrorHandler = (setErrors: (errors: any) => void, setSubmitting: (loading: boolean) => void) => {
  return (errors: any) => {
    setSubmitting(false);
    
    if (isCsrfError(errors)) {
      handleCsrfError(errors);
      return;
    }
    
    setErrors(errors);
  };
};
