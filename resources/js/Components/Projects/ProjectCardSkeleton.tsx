import React from 'react';

const ProjectCardSkeleton: React.FC = () => (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center animate-pulse">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" />
        <div className="h-6 w-2/3 bg-gray-200 rounded mx-auto mb-3 md:mb-4" />
        <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto" />
    </div>
);

export default ProjectCardSkeleton;
