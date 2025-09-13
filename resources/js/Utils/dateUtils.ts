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

export const formatSimpleDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-CA');
};

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
