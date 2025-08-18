import React from 'react';

interface ColorSwatchProps {
    color: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    title?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
    color,
    size = 'md',
    className = '',
    title
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    // تحديد ما إذا كان اللون فاتح أم غامق لتحديد لون الحدود
    const isLightColor = (hexColor: string) => {
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    };

    const getBorderClass = (hexColor: string) => {
        return isLightColor(hexColor) ? 'border-gray-300' : 'border-gray-600';
    };

    return (
        <div
            className={`${sizeClasses[size]} rounded-full border-2 ${getBorderClass(color)} ${className}`}
            title={title || `لون المنتج: ${color}`}
            style={{ backgroundColor: color }}
        />
    );
};

export default ColorSwatch; 