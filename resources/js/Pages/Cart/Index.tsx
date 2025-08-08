import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart, CartItem } from '@/store/features/cartSlice';
import { Link, Head } from '@inertiajs/react';
import { RootState } from '@/store';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';

const CartIndex: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    const [loading, setLoading] = useState(false);

    const handleSendWhatsapp = () => {
        const message = 'طلب جديد:\n' + items.map(i => {
            let details = `${i.name} - ${i.quantity} قطعة - ${i.price} ريال`;
            let options = [];
            if (i.colorName) options.push(`اللون: ${i.colorName}`);
            if (i.width && i.height && i.measurementUnit) options.push(`المقاس: ${i.width} × ${i.height} ${i.measurementUnit}`);
            if (i.openingMethod) options.push(`طريقة الفتح: ${i.openingMethod}`);
            if (i.trackType) options.push(`نوع المسار: ${i.trackType}`);
            if (i.liningOption) options.push(`البطانة: ${i.liningOption}`);
            if (options.length) details += '\n' + options.join(' | ');
            return details;
        }).join('\n') + `\nالمجموع: ${total} ريال`;
        window.open(`https://wa.me/970592867916?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <AppLayout>
            <Head title="سلة المشتريات" />
            <div className="max-w-3xl mx-auto py-10 px-2 sm:px-4">
                <h2 className="text-3xl font-bold mb-8 text-yellow-600 text-center">سلة المشتريات</h2>
                {items.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg py-12 rounded shadow bg-gray-50">سلتك فارغة</div>
                ) : (
                    <React.Fragment>
                        <ul className="divide-y">
                            {items.map((item: CartItem) => (
                                <li key={item.id} className="flex flex-col sm:flex-row items-center py-6  rounded-lg shadow mb-4 bg-gray-50">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6" />
                                    )}
                                    <div className="flex-1 w-full text-center sm:text-start px-4">
                                        <div className="font-semibold text-lg text-gray-800">{item.name}</div>
                                        <div className="text-yellow-600 font-bold mt-1">{item.price} ريال</div>
                                        {/* تفاصيل الخيارات */}
                                        {item.color || item.width || item.height || item.openingMethod || item.trackType || item.liningOption ? (
                                            <div className="mt-3 bg-white rounded-lg shadow-sm p-3 border border-yellow-100 text-sm text-gray-700 space-y-1">
                                                {item.color && (
                                                    <div><span className="font-bold text-gray-900">اللون:</span> <span style={{ background: item.color }} className="inline-block w-4 h-4 rounded-full border mr-1 align-middle"></span> {item.colorName}</div>
                                                )}
                                                {item.width && item.height && (
                                                    <div><span className="font-bold text-gray-900">المقاس:</span> {item.width} × {item.height} {item.measurementUnit}</div>
                                                )}
                                                {item.openingMethod && (
                                                    <div><span className="font-bold text-gray-900">طريقة الفتح:</span> {item.openingMethod}</div>
                                                )}
                                                {item.trackType && (
                                                    <div><span className="font-bold text-gray-900">نوع المسار:</span> {item.trackType}</div>
                                                )}
                                                {item.liningOption && (
                                                    <div><span className="font-bold text-gray-900">البطانة:</span> {item.liningOption}</div>
                                                )}
                                            </div>
                                        ) : null}
                                        <div className="flex items-center justify-center sm:justify-start mt-3">
                                            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1} className="px-3 py-1 bg-gray-200 rounded-r hover:bg-yellow-100 transition disabled:opacity-50">-</button>
                                            <span className="px-4 py-1 bg-gray-100 font-bold">{item.quantity}</span>
                                            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="px-3 py-1 bg-gray-200 rounded-l hover:bg-yellow-100 transition">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 ml-0 sm:ml-6 mt-4 sm:mt-0 font-bold hover:underline flex items-center justify-center">
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 text-2xl font-bold text-gray-800 text-center">المجموع: <span className="text-yellow-600">{total} ريال</span></div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleSendWhatsapp}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow flex items-center gap-3 font-bold transition"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                إرسال الطلب عبر واتساب
                            </button>
                            <button onClick={() => dispatch(clearCart())} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded shadow font-bold transition">إفراغ السلة</button>
                        </div>
                    </React.Fragment>
                )
                }
                <div className="mt-10 text-center">
                    <Link href="/products" className="text-yellow-600 hover:underline font-bold text-lg">تصفح المنتجات</Link>
                </div>
            </div >
        </AppLayout >
    );
};

export default CartIndex;
