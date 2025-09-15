import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ColorSwatch from '@/Components/Common/ColorSwatch';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/store/features/cartSlice';
import { HiShoppingCart, HiCheck } from 'react-icons/hi';
import { RootState } from '@/store';
import SofaPriceCalculator from './SofaPriceCalculator';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        brand: string;
        price: number;
        discount?: number;
        image: string;
        rating: number;
        category?: {
            id: number;
            name: string;
            slug: string;
        };
        final_price?: number;
        discount_amount?: number;
        in_stock?: boolean;
        has_discount?: boolean;
        colors?: string[];
        color_names?: string[];
        };
    dimensions?: { width: number; height: number };
    onDimensionChange?: (productId: number, price: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, dimensions, onDimensionChange }) => {
    const colors = product.colors || ['#F0F7FF', '#FFEDED', '#FFF7ED'];
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [priceChanged, setPriceChanged] = useState<boolean>(false);
    const [currentDimensions, setCurrentDimensions] = useState<{ width: number; height: number }>(
        dimensions || { width: 1, height: 1 }
    );

    const getDiscountedPrice = (price: number, discount?: number) => {
        if (!discount || discount <= 0) return originalPrice;
        return price - (price * discount / 100);
    };

    const calculatePrice = (width: number, height: number) => {
                const categoryName = product.category?.name?.toLowerCase();
        const isCurtainsOrCabinets = categoryName?.includes('ستا') || categoryName?.includes('خزا');
        
                if (!isCurtainsOrCabinets) {
            return getDiscountedPrice(product.price, product.discount);
        }
        
        const baseArea = 1;
                if (width === 1 && height === 1) {
            return getDiscountedPrice(product.price, product.discount);
        }

        const newArea = width * height;
        const additionalArea = newArea - baseArea;
        
        // استخدم نفس المعادلة في كلا الحالتين
        const discountedPrice = getDiscountedPrice(product.price, product.discount);
        const additionalCost = additionalArea * discountedPrice;
        return discountedPrice + additionalCost;
    };

    useEffect(() => {
        if (currentPrice === 0 && dimensions) {
            const initialPrice = calculatePrice(currentDimensions.width, currentDimensions.height);
            setCurrentPrice(initialPrice);
        }
    }, [product, currentDimensions, dimensions]);

    useEffect(() => {
        const newPrice = calculatePrice(currentDimensions.width, currentDimensions.height);

        if (currentPrice !== newPrice && currentPrice > 0) {
            setPriceChanged(true);
            setTimeout(() => setPriceChanged(false), 1000);
        }

        setCurrentPrice(newPrice);
        if (onDimensionChange) {
            onDimensionChange(product.id, newPrice);
        }
    }, [currentDimensions, product]);

    useEffect(() => {
        if (dimensions) {
            setCurrentDimensions(dimensions);
        }
    }, [dimensions]);

    const originalPrice = Number(product.price || 0);
        const discountedPrice = Number(product.final_price || getDiscountedPrice(product.price, product.discount));
        const finalPrice = currentPrice > 0 && currentPrice !== discountedPrice ? currentPrice : discountedPrice;
        const displayDiscount = product.discount || (product.has_discount ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : null);

    const getPriceDisplayText = () => {
        const categoryName = product.category?.name?.toLowerCase();
        const isCurtainsOrCabinets = categoryName?.includes('ستا') || categoryName?.includes('خزا');
        const isSofa = categoryName?.includes('كنب');
        
        if (currentPrice > 0 && currentPrice !== discountedPrice && dimensions && isCurtainsOrCabinets) {
            return 'السعر للأبعاد المحددة';
        }
        return 'السعر';
    };

    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);
    const inCart = items.some(item => item.id === product.id);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: finalPrice,
            image: product.image,
            selectedDimensions: currentDimensions,
            selectedPrice: currentPrice,
            quantity: 1
        }));
        setAdded(true);
        setTimeout(() => setAdded(false), 900);
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    return (
        <div className="group transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                <Link href={`/products/${product.id}/options`} className="block">
                    <div className="relative h-56 md:h-52 bg-white rounded-t-xl overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />

                        {displayDiscount && displayDiscount > 0 && (
                            <div className="absolute top-2 right-2 bg-primary-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                                %{displayDiscount}
                            </div>
                        )}

                        {product.in_stock === false && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                                نفذت
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href={`/products/${product.id}/options`}
                                    className="bg-primary-yellow text-primary-black px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-xs sm:text-sm text-center"
                                >
                                    خيارات المنتج
                                </Link>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="p-3 sm:p-4 text-start flex-1 flex flex-col">
                    <Link href={`/products/${product.id}/options`} className="block">
                        <h3 className="font-bold text-base sm:text-sm text-[#0D1F40] hover:text-[#0D1D25] transition-colors">
                            {product.name}
                        </h3>
                    </Link>

                    {product.category && (
                        <p className="text-xs text-[#64748B] mt-1">{product.category.name}</p>
                    )}

                    <div className="flex justify-start mt-2 mb-1 flex-wrap gap-1">
                        {colors.map((color, idx) => (
                            <ColorSwatch
                                key={idx}
                                color={color}
                                size="sm"
                                className=""
                            />
                        ))}
                    </div>

                    <div className="mt-2 flex justify-between items-center mt-auto">
                        <div className='flex flex-col'>
                            <span className="text-xs sm:text-sm text-[#64748B]">{getPriceDisplayText()}</span>
                            <div className="flex justify-start items-center gap-1 sm:gap-2">
                                {(() => {
                                    const categoryName = product.category?.name?.toLowerCase();
                                    const isCurtainsOrCabinets = categoryName?.includes('ستا') || categoryName?.includes('خزا');
                                    
                                    if (currentPrice > 0 && currentPrice !== discountedPrice && dimensions && isCurtainsOrCabinets) {
                                        return (
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="flex items-center gap-1">
                                                    <p className={`text-sm sm:text-base md:text-lg font-bold transition-all duration-300 text-green-600 ${priceChanged ? 'scale-105' : ''}`}>
                                                        {Number(currentPrice || 0).toFixed(2)}
                                                    </p>
                                                    <img
                                                        src="/images/sar-currency(black).svg"
                                                        alt="ريال"
                                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                                    />
                                                </div>
                                        <span className="text-xs text-gray-500 block font-normal">
                                                    (إضافة للأبعاد الإضافية)
                                        </span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="flex items-center gap-1">
                                                    <p className={`text-sm sm:text-base md:text-lg font-bold transition-all duration-300 ${priceChanged ? 'scale-105' : ''}`}>
                                                        {Number(discountedPrice || 0).toFixed(2)}
                                </p>
                                <img
                                    src="/images/sar-currency(black).svg"
                                                        alt="ريال"
                                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                />
                                                </div>
                                                
                                                {displayDiscount && displayDiscount > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[16px] sm:text-xs text-gray-500 line-through">
                                                            {Number(originalPrice || 0).toFixed(2)}
                                                    </span>
                                                    <img
                                                        src="/images/sar-currency(black).svg"
                                                        alt="ريال"
                                                        className="w-2 h-2 md:w-3 md:h-3 opacity-50"
                                                    />
                                                </div>
                                                )}
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        </div>
                        <button
                            className={`relative bg-primary-yellow rounded-full p-1 sm:p-1.5 md:p-2 shadow-sm flex items-center justify-center transition-all duration-300 overflow-hidden min-w-[40px] min-h-[40px]
                                ${added ? 'bg-green-500 scale-110 ring-2 ring-green-300' : inCart ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-yellow-500'}
                            `}
                            title={inCart ? 'حذف من السلة' : 'إضافة المنتج للسلة'}
                            onClick={inCart ? handleRemoveFromCart : handleAddToCart}
                        >
                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {inCart ? (
                                    <svg className="h-5 w-5 text-red-600 animate-cart-remove" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : added ? (
                                    <HiCheck className="h-6 w-6 text-white animate-cart-check" />
                                ) : (
                                    <HiShoppingCart className="h-5 w-5 text-[#0D1F40] group-hover:scale-110 transition-transform duration-300" />
                                )}
                            </span>
                            <style>{`
                                .animate-cart-check {
                                    animation: cartCheckPop 0.6s cubic-bezier(.36,1.01,.32,1) 1;
                                }
                                .animate-cart-remove {
                                    animation: cartRemoveShake 0.5s cubic-bezier(.36,1.01,.32,1) 1;
                                }
                                @keyframes cartCheckPop {
                                    0% { transform: scale(0.5) rotate(-20deg); opacity: 0; }
                                    60% { transform: scale(1.2) rotate(10deg); opacity: 1; }
                                    80% { transform: scale(0.95) rotate(-5deg); }
                                    100% { transform: scale(1) rotate(0deg); }
                                }
                                @keyframes cartRemoveShake {
                                    0% { transform: scale(1) rotate(0deg); }
                                    30% { transform: scale(1.1) rotate(-10deg); }
                                    60% { transform: scale(1.1) rotate(10deg); }
                                    100% { transform: scale(1) rotate(0deg); }
                                }
                            `}</style>
                        </button>
                    </div>
                </div>
                
                {/* مكون حساب السعر للكنب */}
                {product.category?.name?.toLowerCase().includes('كنب') && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                        <SofaPriceCalculator 
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                finalPrice: product.final_price || product.price,
                                category: product.category
                            }} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;