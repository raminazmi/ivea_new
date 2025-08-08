import React from 'react';

const ProductCardSkeleton: React.FC = () => (
    <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="h-32 sm:h-36 md:h-40 bg-gray-200 rounded-t-xl" />
        <div className="p-3 sm:p-4">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-1" />
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
            <div className="flex gap-2 mt-2 mb-1">
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
            </div>
            <div className="mt-2 flex justify-between items-center">
                <div>
                    <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
                    <div className="h-6 w-20 bg-gray-200 rounded" />
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
        </div>
    </div>
);

export default ProductCardSkeleton;