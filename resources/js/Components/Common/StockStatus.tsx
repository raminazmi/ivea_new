import React from 'react';

interface StockStatusProps {
    inStock: boolean;
    className?: string;
}

const StockStatus: React.FC<StockStatusProps> = ({ inStock, className = "" }) => {
    return (
        <div className={`inline-block text-sm px-3 py-1 rounded-full ${className}`}>
            {inStock ? (
                <span className="bg-green-100 text-green-800">
                    بضاعة متوفرة
                </span>
            ) : (
                <span className="bg-red-100 text-red-800">
                    نفذت الكمية
                </span>
            )}
        </div>
    );
};

export default StockStatus; 