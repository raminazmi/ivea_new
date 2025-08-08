import React from 'react';

const JobCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-4 mx-auto" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2 mx-auto" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-4 mx-auto" />
            <div className="h-8 w-24 bg-gray-200 rounded mb-4 mx-auto" />
            <div className="h-4 w-1/3 bg-gray-200 rounded mx-auto" />
        </div>
    );
};

export default JobCardSkeleton;
