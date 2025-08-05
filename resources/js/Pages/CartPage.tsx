import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CartItem } from '@/types';

interface CartPageProps {
    auth: {
        user: any;
    };
    cartItems: CartItem[];
    total: number;
}

export default function CartPage({ auth, cartItems, total }: CartPageProps) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">عربة التسوق</h2>}
        >
            <Head title="عربة التسوق" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-lg mb-4">عربة التسوق فارغة</p>
                                    <a
                                        href="/products"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        تصفح المنتجات
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center space-x-4 space-x-reverse">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                                    <p className="text-gray-600">الكمية: {item.quantity}</p>
                                                    <p className="text-blue-600 font-semibold">{item.price} ريال</p>
                                                </div>
                                            </div>
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                title="حذف المنتج"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-900">المجموع:</span>
                                            <span className="text-xl font-bold text-blue-600">{total} ريال</span>
                                        </div>
                                        <button className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                                            إتمام الطلب
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}