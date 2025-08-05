import React from 'react';

interface DiscountBadgeProps {
    discount: number;
    className?: string;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount, className = "" }) => {
    if (!discount || discount <= 0) {
        return null;
    }

    return (
        <div className={`inline-block bg-yellow-400 text-white text-sm font-bold w-12 h-12 rounded-full flex items-center justify-center ${className}`}>
            %{discount}
        </div>
    );
};

export default DiscountBadge; 