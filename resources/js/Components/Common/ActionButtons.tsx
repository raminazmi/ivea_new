import React, { useState } from 'react';
import { HiShoppingCart, HiLightningBolt } from 'react-icons/hi';

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
    onRemoveFromCart?: () => void;
    inStock?: boolean;
    inCart?: boolean;
    className?: string;
    showQuickOrder?: boolean;
}


const ActionButtons: React.FC<ActionButtonsProps> = ({
    buttons,
    onAddToCart,
    onQuickOrder,
    onRemoveFromCart,
    inStock = true,
    inCart = false,
    className = "",
    showQuickOrder = true
}) => {
    const [added, setAdded] = useState(false);
    const [cartAnim, setCartAnim] = useState(false);

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

    const handleAddToCartClick = () => {
        if (added || inCart || !inStock) return;
        setCartAnim(true);
        if (onAddToCart) onAddToCart();
        setTimeout(() => setCartAnim(false), 700);
    };

    const handleRemoveFromCartClick = () => {
        setAdded(false);
        if (onRemoveFromCart) {
            onRemoveFromCart();
        }
    };

    return (
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
            {!added && !inCart ? (
                <button
                    onClick={handleAddToCartClick}
                    disabled={!inStock}
                    className={`group flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 active:scale-95 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ boxShadow: '0 2px 12px 0 rgba(255, 193, 7, 0.15)' }}
                >
                    <HiShoppingCart className={`text-xl ${cartAnim ? 'animate-bounce-cart' : ''}`} />
                    {inStock ? 'أضف إلى السلة' : 'غير متوفر'}
                </button>
            ) : (added || inCart) ? (
                <button
                    onClick={handleRemoveFromCartClick}
                    className="flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 bg-red-500 hover:bg-red-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    حذف من السلة
                </button>
            ) : null}

            {showQuickOrder && (
                <button
                    onClick={onQuickOrder}
                    disabled={!inStock}
                    className={`group flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-white shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 active:scale-95 ${!inStock ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400' : ''}`}
                >
                    <HiLightningBolt className="text-xl group-active:animate-pulse" />
                    اطلب الآن
                </button>
            )}
            <style>{`
                .animate-bounce-cart {
                    animation: bounce 0.7s cubic-bezier(.36,1.01,.32,1) 1;
                }
                .group-active\\:animate-pulse:active { animation: pulse 0.5s; }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-10px); }
                    50% { transform: translateY(-18px); }
                    70% { transform: translateY(-10px); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ActionButtons; 