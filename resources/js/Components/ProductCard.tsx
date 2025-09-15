import React from 'react';
import { Link } from '@inertiajs/react';
import PriceDisplay from '@/Components/Common/PriceDisplay';
import DiscountBadge from '@/Components/Common/DiscountBadge';

interface Product {
    id: number;
    name: string;
    price: number;
    finalPrice?: number;
    discount?: number;
    hasDiscount?: boolean;
    image: string;
}

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-3 sm:p-4 md:p-5">
                <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-primary-black mb-2 sm:mb-3 line-clamp-2">
                    {product.name}
                </h3>
                
                <div className="mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <PriceDisplay
                            price={product.price}
                            finalPrice={product.finalPrice}
                            hasDiscount={product.hasDiscount}
                        />
                        {product.hasDiscount && product.discount && (
                            <DiscountBadge discount={product.discount} />
                        )}
                    </div>
                </div>
                
                <Link
                    href={`/products/${product.id}`}
                    className="block w-full bg-primary-yellow text-primary-black text-center py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition text-sm sm:text-base font-medium"
                >
                    أضف إلى السلة
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;