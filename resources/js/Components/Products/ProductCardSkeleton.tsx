import React from 'react';

const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="group transition-all duration-300 hover:-translate-y-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:shadow-lg">
                {/* Product Image Skeleton */}
                <div className="relative h-32 sm:h-36 md:h-40 bg-gray-200 rounded-t-xl overflow-hidden animate-pulse">
                    {/* Discount Tag Skeleton */}
                    <div className="absolute top-2 right-2 bg-gray-300 rounded-full w-6 h-6 sm:w-7 sm:h-7 animate-pulse"></div>
                </div>

                {/* Product Info Skeleton */}
                <div className="p-3 sm:p-4 text-start">
                    {/* Title Skeleton */}
                    <div className="h-4 sm:h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>

                    {/* Brand Skeleton */}
                    <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse"></div>

                    {/* Category Skeleton */}
                    <div className="h-3 bg-gray-200 rounded mb-3 w-1/2 animate-pulse"></div>

                    {/* Color Options Skeleton */}
                    <div className="flex justify-start mt-2 mb-1">
                        {[1, 2, 3].map((idx) => (
                            <div
                                key={idx}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-200 mx-1 animate-pulse"
                            ></div>
                        ))}
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                        <div className='flex flex-col'>
                            {/* Price Label Skeleton */}
                            <div className="h-3 bg-gray-200 rounded mb-1 w-20 animate-pulse"></div>
                            {/* Price Skeleton */}
                            <div className="flex justify-start items-center gap-1 sm:gap-2">
                                <div className="h-4 sm:h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                        {/* Button Skeleton */}
                        <div className="bg-gray-200 rounded-full p-1 sm:p-1.5 md:p-2 animate-pulse">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton; 