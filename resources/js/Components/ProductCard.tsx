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
            <div className="bg-gray-200 border-2 border-dashed w-full h-48" />

            <div className="p-4">
                <h3 className="font-bold text-lg text-primary-black mb-1">
                    {product.name}
                </h3>
                
                <div className="mb-3">
                    <div className="flex items-center gap-2">
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
                    className="block w-full bg-primary-yellow text-primary-black text-center py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                    أضف إلى السلة
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;