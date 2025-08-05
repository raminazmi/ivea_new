import React from 'react';

interface ActionButton {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

interface ActionButtonsProps {
    buttons?: ActionButton[];
    onAddToCart?: () => void;
    inStock?: boolean;
    className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
    buttons, 
    onAddToCart, 
    inStock = true, 
    className = "" 
}) => {
    if (buttons) {
        return (
            <div className={`flex gap-4 ${className}`}>
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors ${button.variant === 'primary'
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                            : 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
                            } ${button.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={`flex gap-4 ${className}`}>
            <button
                onClick={onAddToCart}
                disabled={!inStock}
                className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors bg-yellow-400 hover:bg-yellow-500 text-gray-900 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {inStock ? 'أضف إلى السلة' : 'غير متوفر'}
            </button>
        </div>
    );
};

export default ActionButtons; 