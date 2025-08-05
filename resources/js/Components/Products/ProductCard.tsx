import React from 'react';
import { Link } from '@inertiajs/react';
import ColorSwatch from '@/Components/Common/ColorSwatch';

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // استخدام الألوان من المنتج أو الألوان الافتراضية
    const colors = product.colors || ['#F0F7FF', '#FFEDED', '#FFF7ED'];

    // تحديد السعر المعروض (السعر النهائي أو السعر العادي)
    const displayPrice = product.final_price || product.price;

    // تحديد الخصم المعروض
    const displayDiscount = product.discount || (product.has_discount ? Math.round(((product.price - (product.final_price || product.price)) / product.price) * 100) : null);

    return (
        <div className="group transition-all duration-300 hover:-translate-y-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:shadow-lg">
                {/* Product Image */}
                <Link href={`/products/${product.id}`} className="block">
                    <div className="relative h-32 sm:h-36 md:h-40 bg-white rounded-t-xl overflow-hidden">
                        <img
                            src={product.image || '/images/sofa3.png'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Discount Tag */}
                        {displayDiscount && (
                            <div className="absolute top-2 right-2 bg-primary-yellow text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs font-bold">
                                %{displayDiscount}
                            </div>
                        )}

                        {/* Stock Status */}
                        {product.in_stock === false && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                                نفذت
                            </div>
                        )}

                        {/* Hover Buttons */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex flex-col space-y-2">
                                <button
                                    className="bg-white text-gray-900 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm"
                                    onClick={() => window.location.href = `/products/${product.id}/options`}
                                >
                                    عرض الخيارات
                                </button>
                                <button className="bg-primary-yellow text-gray-900 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-xs sm:text-sm">
                                    عرض الخيارات
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Product Info */}
                <div className="p-3 sm:p-4 text-start">
                    <Link href={`/products/${product.id}`} className="block">
                        <h3 className="font-bold text-base sm:text-lg text-[#0D1F40] hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">{product.brand || 'Antartica'}</p>

                    {/* Category */}
                    {product.category && (
                        <p className="text-xs text-[#64748B] mt-1">{product.category.name}</p>
                    )}

                    {/* Color Options */}
                    <div className="flex justify-start mt-2 mb-1">
                        {colors.slice(0, 3).map((color, idx) => (
                            <ColorSwatch
                                key={idx}
                                color={color}
                                size="sm"
                                className="mx-1"
                            />
                        ))}
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                        <div className='flex flex-col'>
                            <span className="text-xs sm:text-sm text-[#64748B]">السعر يبدأ من</span>
                            <div className="flex justify-start items-center gap-1 sm:gap-2">
                                <p className="text-sm sm:text-base md:text-lg font-bold text-[#0D1F40]">{displayPrice}</p>
                                <img
                                    src="/images/sar-currency(black).svg"
                                    alt={product.name}
                                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                />
                            </div>
                        </div>
                        <button
                            className="bg-primary-yellow rounded-full p-1 sm:p-1.5 md:p-2 shadow-sm hover:bg-yellow-500 transition-colors"
                            title="عرض تفاصيل المنتج"
                            onClick={() => window.location.href = `/products/${product.id}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#0D1F40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 