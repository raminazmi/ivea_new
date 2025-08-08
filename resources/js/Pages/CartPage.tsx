import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { HiX, HiArrowLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/features/cartSlice';

const CartPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15 : 0;
    const total = subtotal + shipping;

    const sendToWhatsApp = () => {
        const phone = '966501234567';
        const message = `السلام عليكم، أريد طلب المنتجات التالية:%0A%0A${cartItems.map(item => `- ${item.name} (${item.quantity}) = ${item.price * item.quantity} ر.س`).join('%0A')}%0A%0Aالمجموع: ${total} ر.س%0A%0Aشكراً`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        dispatch(clearCart());
    };

    return (
        <>
            <Head title="سلة التسوق" />
            <div className="py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">سلة التسوق</h1>
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 md:py-12">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 md:w-32 md:h-32 mx-auto" />
                            <h3 className="text-lg md:text-xl font-semibold mt-4 md:mt-6">سلة التسوق فارغة</h3>
                            <p className="text-gray-600 mt-2 mb-6 md:mb-8 text-sm md:text-base">أضف بعض المنتجات إلى سلة التسوق</p>
                            <Link href="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg inline-flex items-center text-sm md:text-base">تصفح المنتجات</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-2.5 md:py-3 px-3 md:px-4 text-right text-sm md:text-base">المنتج</th>
                                                <th className="py-2.5 md:py-3 px-3 md:px-4 text-sm md:text-base">السعر</th>
                                                <th className="py-2.5 md:py-3 px-3 md:px-4 text-sm md:text-base">الكمية</th>
                                                <th className="py-2.5 md:py-3 px-3 md:px-4 text-sm md:text-base">المجموع</th>
                                                <th className="py-2.5 md:py-3 px-3 md:px-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id} className="border-t">
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <div className="flex items-center">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name} className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
                                                            ) : (
                                                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
                                                            )}
                                                            <div className="mr-3 md:mr-4">
                                                                <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4 text-center text-sm md:text-base">{item.price} ر.س</td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                                                            className="w-14 md:w-16 border rounded p-1 text-center text-sm md:text-base"
                                                            placeholder="الكمية"
                                                            title="كمية المنتج"
                                                        />
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4 text-center text-sm md:text-base">{(item.price * item.quantity).toFixed(2)} ر.س</td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                                                        <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-700" title="حذف المنتج من السلة">
                                                            <HiX className="h-4 w-4 md:h-5 md:w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="lg:w-1/3">
                                <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                                    <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">ملخص الطلب</h2>
                                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                                        <div className="flex justify-between text-sm md:text-base">
                                            <span>المجموع الفرعي:</span>
                                            <span>{subtotal.toFixed(2)} ر.س</span>
                                        </div>
                                        <div className="flex justify-between text-sm md:text-base">
                                            <span>الشحن:</span>
                                            <span>{shipping} ر.س</span>
                                        </div>
                                        <div className="border-t pt-3 md:pt-4">
                                            <div className="flex justify-between font-semibold text-base md:text-lg">
                                                <span>المجموع الكلي:</span>
                                                <span>{total.toFixed(2)} ر.س</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        <button onClick={sendToWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base transition-colors">إرسال الطلب عبر واتساب</button>
                                        <button onClick={() => dispatch(clearCart())} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base transition-colors">تفريغ السلة</button>
                                        <Link href="/products" className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base transition-colors inline-block text-center">
                                            <HiArrowLeft className="inline ml-2" />
                                            متابعة التسوق
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartPage;