import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@inertiajs/react';
import { RootState } from '@/store';
import { HiShoppingCart } from 'react-icons/hi';

const HeaderCartIcon: React.FC = () => {
    const count = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

    return (
        <Link href="/cart" className="relative bg-[#0D1D25] text-white hover:bg-opacity-90 transition flex items-center p-2 rounded-full font-medium text-sm whitespace-nowrap">
            <HiShoppingCart className="text-lg" />
            {count > 0 && (
                <span className="absolute -top-2 right-5 bg-red-500 text-white rounded-full w-4 h-4 text-center text-xs">{count}</span>
            )}
        </Link>
    );
};

export default HeaderCartIcon;
