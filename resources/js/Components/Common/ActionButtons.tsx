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
    onQuickOrder?: () => void;
    inStock?: boolean;
    className?: string;
    showQuickOrder?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    buttons,
    onAddToCart,
    onQuickOrder,
    inStock = true,
    className = "",
    showQuickOrder = true
}) => {
    if (buttons) {
        return (
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
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
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
            <button
                onClick={onAddToCart}
                disabled={!inStock}
                className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors bg-yellow-400 hover:bg-yellow-500 text-gray-900 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {inStock ? 'أضف إلى السلة' : 'غير متوفر'}
            </button>

            {showQuickOrder && (
                <button
                    onClick={onQuickOrder}
                    disabled={!inStock}
                    className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 ${!inStock ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400' : ''}`}
                >
                    اطلب الآن
                </button>
            )}
        </div>
    );
};

export default ActionButtons; 