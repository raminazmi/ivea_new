import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ColorSwatch from '@/Components/Common/ColorSwatch';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/store/features/cartSlice';
import { HiShoppingCart, HiCheck } from 'react-icons/hi';
import { RootState } from '@/store';
import { calculateDynamicPrice, formatPriceFrom, getDefaultDimensions, Dimensions } from '@/Utils/priceCalculator';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        brand: string;
        price: number;
        base_price: number;
        price_per_sqm?: number;
        pricing_method?: 'fixed' | 'per_sqm' | 'tiered';
        min_price?: number;
        max_price?: number;
        default_width?: number;
        default_height?: number;
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
        pricesFrom?: number;
        priceRange?: {
            min: number;
            max: number;
        };
        pricingMethod?: 'fixed' | 'area_based' | 'size_based' | 'custom';
    };
    dimensions?: Dimensions;
    onDimensionChange?: (productId: number, price: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, dimensions, onDimensionChange }) => {
    const colors = product.colors || ['#F0F7FF', '#FFEDED', '#FFF7ED'];
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [priceChanged, setPriceChanged] = useState<boolean>(false);
    const [currentDimensions, setCurrentDimensions] = useState<Dimensions>(
        dimensions || getDefaultDimensions(product)
    );

    useEffect(() => {
        if (currentPrice === 0) {
            const initialPrice = calculateDynamicPrice(product, currentDimensions);
            setCurrentPrice(initialPrice);
        }
    }, [product, currentDimensions, currentPrice]);

    useEffect(() => {
        const newPrice = calculateDynamicPrice(product, currentDimensions);

        if (currentPrice !== newPrice && currentPrice > 0) {
            setPriceChanged(true);
            setTimeout(() => setPriceChanged(false), 1000);
        }

        setCurrentPrice(newPrice);
        if (onDimensionChange) {
            onDimensionChange(product.id, newPrice);
        }
    }, [currentDimensions, product, onDimensionChange]);

    useEffect(() => {
        if (dimensions) {
            setCurrentDimensions(dimensions);
        }
    }, [dimensions]);
    const originalPrice = Number(product.final_price || product.price || product.base_price || 0);
    const displayPrice = currentPrice > originalPrice ? currentPrice : originalPrice;
    const displayDiscount = product.discount || (product.has_discount ? Math.round(((product.price - (product.final_price || product.price)) / product.price) * 100) : null);

    const getPriceDisplayText = () => {
        if (currentPrice > originalPrice) {
            return 'السعر للأبعاد المحددة';
        }
        if (product.pricing_method && product.pricing_method !== 'fixed') {
            return 'تبدأ الأسعار من';
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
            price: displayPrice,
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
        <div className="group transition-all duration-300 hover:-translate-y-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Link href={`/products/${product.id}`} className="block">
                    <div className="relative h-32 sm:h-36 md:h-40 bg-white rounded-t-xl overflow-hidden">
                        <img
                            src={product.image || '/images/sofa3.png'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {displayDiscount && (
                            <div className="absolute top-2 right-2 bg-primary-yellow text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs font-bold">
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
                                    className="bg-white text-gray-900 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm text-center"
                                >
                                    خيارات المنتج
                                </Link>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="p-3 sm:p-4 text-start">
                    <Link href={`/products/${product.id}`} className="block">
                        <h3 className="font-bold text-base sm:text-md text-[#0D1F40] hover:text-[#0D1D25] transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">{product.brand || 'Antartica'}</p>

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

                    <div className="mt-2 flex justify-between items-center">
                        <div className='flex flex-col'>
                            <span className="text-xs sm:text-sm text-[#64748B]">{getPriceDisplayText()}</span>
                            <div className="flex justify-start items-center gap-1 sm:gap-2">
                                <p className={`text-sm sm:text-base md:text-lg font-bold transition-all duration-300 ${currentPrice > originalPrice
                                    ? 'text-green-600'
                                    : 'text-[#0D1F40]'
                                    } ${priceChanged ? 'scale-105' : ''}`}>
                                    {displayPrice.toFixed(2)}
                                    {currentPrice > originalPrice && (
                                        <span className="text-xs text-gray-500 block font-normal">
                                            (الأساسي: {originalPrice.toFixed(2)})
                                        </span>
                                    )}
                                    {product.priceRange && product.priceRange.max > product.priceRange.min && (
                                        <span className="text-xs text-[#64748B] ml-1">
                                            - {Number(product.priceRange.max).toFixed(2)}
                                        </span>
                                    )}
                                </p>
                                <img
                                    src="/images/sar-currency(black).svg"
                                    alt={product.name}
                                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                />
                            </div>
                        </div>
                        <button
                            className={`relative bg-primary-yellow rounded-full p-1 sm:p-1.5 md:p-2 shadow-sm flex items-center justify-center transition-all duration-300 overflow-hidden
                                ${added ? 'bg-green-500 scale-110 ring-2 ring-green-300' : inCart ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-yellow-500'}
                            `}
                            title={inCart ? 'حذف من السلة' : 'إضافة المنتج للسلة'}
                            onClick={inCart ? handleRemoveFromCart : handleAddToCart}
                            style={{ minWidth: 40, minHeight: 40 }}
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
            </div>
        </div>
    );
};

export default ProductCard;