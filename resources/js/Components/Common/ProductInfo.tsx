import React from 'react';

interface ProductInfoProps {
    label: string;
    value: string | number;
    className?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ label, value, className = "" }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="text-sm text-gray-600">{label}</div>
            <div className="font-medium text-gray-900">{value}</div>
        </div>
    );
};

export default ProductInfo; 