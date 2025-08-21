import React from 'react';
import DiscountBadge from './DiscountBadge';

interface PriceDisplayProps {
    price: number | string;
    finalPrice?: number;
    hasDiscount?: boolean;
    discount?: number;
    showLabel?: boolean;
    label?: string;
    className?: string;
    pricesFrom?: number;
    priceRange?: {
        min: number;
        max: number;
    };
    pricingMethod?: 'fixed' | 'area_based' | 'size_based' | 'custom';
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
    price,
    finalPrice: propFinalPrice,
    hasDiscount,
    discount,
    showLabel = true,
    label = "سعر المتر المربع يبدأ من",
    className = "",
    pricesFrom,
    priceRange,
    pricingMethod
}) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    const finalPrice = propFinalPrice || (discount ? numericPrice - (numericPrice * discount / 100) : numericPrice);
    const displayPrice = Number(pricesFrom || finalPrice || 0);
    const dynamicLabel = (() => {
        if (pricesFrom && pricingMethod !== 'fixed') {
            if (priceRange && priceRange.max > priceRange.min) {
                return 'تبدأ الأسعار من';
            }
            return 'تبدأ الأسعار من';
        }
        return label;
    })();

    return (
        <div className={`space-y-2 ${className}`}>
            {showLabel && (
                <div className="text-sm text-gray-600">{dynamicLabel}</div>
            )}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-600">
                    {displayPrice.toFixed(2)}
                    {priceRange && priceRange.max > priceRange.min && (
                        <span className="text-sm text-gray-500 ml-2">
                            - {Number(priceRange.max).toFixed(2)}
                        </span>
                    )}
                </span>
                <img
                    src="/images/sar-currency(black).svg"
                    alt="SAR"
                    className="w-6 h-6"
                />
                {(discount || hasDiscount) && (
                    <DiscountBadge discount={discount || 0} />
                )}
            </div>
            {(discount || hasDiscount) && !pricesFrom && (
                <div className="text-sm text-gray-500 line-through">
                    {numericPrice.toFixed(2)} ر.س
                </div>
            )}
        </div>
    );
};

export default PriceDisplay; 