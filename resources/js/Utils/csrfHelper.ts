/**
 * CSRF Helper utilities for handling CSRF token operations
 */

/**
 * Get the current CSRF token from the meta tag
 */
export const getCsrfToken = (): string | null => {
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
  const message = customMessage || 'انتهت صلاحية الجلسة. يرجى تحديث الصفحة والمحاولة مرة أخرى.';
  
  // Log the error for debugging
  console.warn('CSRF Error detected:', error);
  
  // Show user-friendly error message
  alert(message);
  
  // Reload the page to get a fresh CSRF token
  setTimeout(() => {
    window.location.reload();
  }, 1000);
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
