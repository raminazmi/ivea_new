/**
 * Date utility functions for consistent date formatting across the application
 */

/**
 * Format date to Gregorian calendar in Arabic locale
 * @param dateString - Date string to format
 * @param includeTime - Whether to include time in the output
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, includeTime: boolean = false): string => {
    const date = new Date(dateString);

    if (includeTime) {
        return date.toLocaleString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } else {
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
};

/**
 * Format date in simple format (YYYY-MM-DD)
 * @param dateString - Date string to format
 * @returns Simple date format
 */
export const formatSimpleDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-CA'); // YYYY-MM-DD format
};

/**
 * Format date with full details including time
 * @param dateString - Date string to format
 * @returns Detailed formatted date string
 */
export const formatDetailedDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
