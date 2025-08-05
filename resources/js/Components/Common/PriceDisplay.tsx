import React from 'react';

interface PriceDisplayProps {
    price: number | string;
    discount?: number;
    showLabel?: boolean;
    label?: string;
    className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
    price,
    discount,
    showLabel = true,
    label = "السعر يبدأ من",
    className = ""
}) => {
    // تحويل price إلى رقم
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    const finalPrice = discount ? numericPrice - (numericPrice * discount / 100) : numericPrice;

    return (
        <div className={`space-y-2 ${className}`}>
            {showLabel && (
                <div className="text-sm text-gray-600">{label}</div>
            )}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                    {finalPrice.toFixed(0)}
                </span>
                <img
                    src="/images/sar-currency(black).svg"
                    alt="SAR"
                    className="w-6 h-6"
                />
            </div>
            {discount && (
                <div className="text-sm text-gray-500 line-through">
                    {numericPrice.toFixed(0)} ر.س
                </div>
            )}
        </div>
    );
};

export default PriceDisplay; 