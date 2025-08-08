import React from 'react';
import { Link } from '@inertiajs/react';

const CartButton = ({ productId }) => {
    return (
        <Link
            href={route('cart.store')}
            method="post"
            data={{ product_id: productId }}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
            إضافة إلى السلة
        </Link>
    );
};

export default CartButton;
