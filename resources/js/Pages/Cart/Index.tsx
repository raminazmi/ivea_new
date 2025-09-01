import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart, CartItem, syncCartData } from '@/store/features/cartSlice';
import { Link, Head, useForm } from '@inertiajs/react';
import { RootState } from '@/store';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';

const CartIndex: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const getActualQuantity = (item: CartItem): number => {
        if (item.customizations?.quantity?.value) {
            return Number(item.customizations.quantity.value) || item.quantity;
        }
        return item.quantity;
    };

    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * getActualQuantity(item), 0);
    const [loading, setLoading] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        notes: '',
        total_amount: total,
        total_items: items.reduce((sum: number, item: CartItem) => sum + getActualQuantity(item), 0),
        cart_items: items as any
    });

    useEffect(() => {
        syncCartData();
        const newTotalItems = items.reduce((sum: number, item: CartItem) => sum + getActualQuantity(item), 0);
        setData(prevData => ({
            ...prevData,
            total_amount: total,
            total_items: newTotalItems,
            cart_items: items as any
        }));
    }, [items, total]);

    const handleSendWhatsapp = () => {
        const message = 'طلب جديد:\n' + items.map(i => {
            const actualQuantity = getActualQuantity(i);
            let details = `${i.name} - ${actualQuantity} قطعة - ${i.price} ريال`;
            let options = [];
            if (i.colorName) options.push(`اللون: ${i.colorName}`);
            if (i.width && i.height && i.measurementUnit) options.push(`المقاس: ${i.width} × ${i.height} ${i.measurementUnit}`);
            if (i.openingMethod) options.push(`طريقة الفتح: ${i.openingMethod}`);
            if (i.trackType) options.push(`نوع المسار: ${i.trackType}`);
            if (i.liningOption) options.push(`البطانة: ${i.liningOption}`);
            if (i.customizations) {
                Object.entries(i.customizations).forEach(([fieldName, customization]) => {
                    const custom = customization as any;
                    if (custom && custom.label && fieldName !== 'quantity') {
                        if (custom.type === 'checkbox_multiple' && custom.displayValues?.length > 0) {
                            options.push(`${custom.label}: ${custom.displayValues.join(', ')}`);
                        } else if (custom.displayValue) {
                            options.push(`${custom.label}: ${custom.displayValue}`);
                        } else if (custom.value) {
                            options.push(`${custom.label}: ${custom.value}`);
                        }
                    }
                });
            }
            if (i.uploadedFiles && i.uploadedFiles.length > 0) {
                const fileNames = i.uploadedFiles.map((file: any) => file.name || file).join(', ');
                options.push(`ملفات مرفقة: ${fileNames}`);
            }

            if (options.length) details += '\n' + options.join(' | ');
            return details;
        }).join('\n') + `\nالمجموع: ${total} ريال`;
        window.open(`https://wa.me/970592867916?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders', {
            onSuccess: () => {
                dispatch(clearCart());
                setShowOrderForm(false);
            }
        });
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
                                        <div className="flex items-center gap-1 mt-1 text-xl font-bold text-gray-800 text-center">
                                               <span className="text-yellow-600">{item.price}</span>
                                            <img
                                                src="/images/sar-currency(black).svg"
                                                alt="ريال"
                                                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                            />
                                        </div>
                                        {(item.color || item.width || item.height || item.openingMethod || item.trackType || item.liningOption || item.customizations) ? (
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
                                                {item.customizations && Object.entries(item.customizations).map(([fieldName, customization]) => {
                                                    const custom = customization as any;
                                                    if (!custom || !custom.label) return null;
                                                    if (fieldName === 'quantity') return null;
                                                    return (
                                                        <div key={fieldName}>
                                                            <span className="font-bold text-gray-900">{custom.label}:</span>
                                                            {' '}
                                                            {custom.type === 'checkbox_multiple' && custom.displayValues ? (
                                                                <span>{custom.displayValues.join(', ')}</span>
                                                            ) : custom.type === 'select' && custom.displayValue ? (
                                                                <span>{custom.displayValue}</span>
                                                            ) : custom.type === 'dimensions' && custom.displayValue ? (
                                                                <span>{custom.displayValue}</span>
                                                            ) : custom.type === 'dimensions_3d' && custom.displayValue ? (
                                                                <span>{custom.displayValue}</span>
                                                            ) : custom.type === 'number' && custom.displayValue ? (
                                                                <span>{custom.displayValue}</span>
                                                            ) : custom.displayValue ? (
                                                                <span>{custom.displayValue}</span>
                                                            ) : (
                                                                <span>{custom.value}</span>
                                                            )}
                                                        </div>
                                                    );
                                                })}

                                                {item.uploadedFiles && item.uploadedFiles.length > 0 && (
                                                    <div>
                                                        <span className="font-bold text-gray-900">الملفات المرفوعة:</span>
                                                        <div className="mt-1 space-y-1">
                                                            {item.uploadedFiles.map((file: any, index: number) => (
                                                                <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center justify-between">
                                                                    {file.uuid ? (
                                                                        <a
                                                                            href={`/download-file/${file.uuid}`}
                                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            📎 {file.name}
                                                                        </a>
                                                                    ) : (
                                                                        <span>📎 {file.name || file}</span>
                                                                    )}
                                                                    {file.size && (
                                                                        <span className="text-gray-400 text-xs">
                                                                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : null}
                                        <div className="flex items-center justify-center sm:justify-start mt-3">
                                            <button
                                                onClick={() => {
                                                    const actualQuantity = getActualQuantity(item);
                                                    const newQuantity = actualQuantity - 1;
                                                    if (newQuantity >= 1) {
                                                        dispatch(updateQuantity({ id: item.cartId || item.id, quantity: newQuantity }));
                                                    }
                                                }}
                                                disabled={getActualQuantity(item) <= 1}
                                                className="px-3 py-1 bg-gray-200 rounded-r hover:bg-yellow-100 transition disabled:opacity-50"
                                            >-</button>
                                            <span className="px-4 py-1 bg-gray-100 font-bold">{getActualQuantity(item)}</span>
                                            <button
                                                onClick={() => {
                                                    const actualQuantity = getActualQuantity(item);
                                                    dispatch(updateQuantity({ id: item.cartId || item.id, quantity: actualQuantity + 1 }));
                                                }}
                                                className="px-3 py-1 bg-gray-200 rounded-l hover:bg-yellow-100 transition"
                                            >+</button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.cartId || item.id))}
                                        className="text-red-500 ml-0 sm:ml-6 mt-4 sm:mt-0 font-bold hover:underline flex items-center justify-center"
                                        title="حذف المنتج من السلة"
                                        aria-label="حذف المنتج من السلة"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                            <div className="flex items-center gap-1 mt-8 text-2xl font-bold text-gray-800 text-center">
                                    <p>
                                        المجموع : <span className="text-yellow-600">{total.toFixed(2)}</span>
                                    </p>
                                    <img
                                        src="/images/sar-currency(black).svg"
                                        alt="ريال"
                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                    />
                            </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => setShowOrderForm(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow flex items-center gap-3 font-bold transition"
                            >
                                إرسال طلب شراء
                            </button>
                            {/* <button
                                onClick={handleSendWhatsapp}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow flex items-center gap-3 font-bold transition"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                إرسال الطلب عبر واتساب
                            </button> */}
                            <button onClick={() => dispatch(clearCart())} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded shadow font-bold transition">إفراغ السلة</button>
                        </div>
                    </React.Fragment>
                )
                }
                <div className="mt-10 text-center">
                    <Link href="/products" className="text-yellow-600 hover:underline font-bold text-lg">تصفح المنتجات</Link>
                </div>

                {showOrderForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">معلومات الطلب</h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowOrderForm(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitOrder} className="space-y-4">
                                    <div>
                                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                                            الاسم الأول <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            title="أدخل الاسم الأول"
                                            aria-label="الاسم الأول"
                                            placeholder="أدخل الاسم الأول"
                                        />
                                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                            الاسم الأخير <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            title="أدخل الاسم الأخير"
                                            aria-label="الاسم الأخير"
                                            placeholder="أدخل الاسم الأخير"
                                        />
                                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            البريد الإلكتروني
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            title="أدخل البريد الإلكتروني (اختياري)"
                                            aria-label="البريد الإلكتروني (اختياري)"
                                            placeholder="أدخل البريد الإلكتروني (اختياري)"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            رقم الهاتف <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            title="أدخل رقم الهاتف"
                                            aria-label="رقم الهاتف"
                                            placeholder="أدخل رقم الهاتف"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            المدينة <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            title="أدخل المدينة"
                                            aria-label="المدينة"
                                            placeholder="أدخل المدينة"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                            العنوان التفصيلي <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            title="أدخل العنوان التفصيلي"
                                            aria-label="العنوان التفصيلي (اسم الحي، اسم الشارع)"
                                            placeholder="العنوان التفصيلي (اسم الحي، اسم الشارع)"
                                        ></textarea>
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                            ملاحظات إضافية
                                        </label>
                                        <textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={2}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            title="أدخل ملاحظات إضافية"
                                            aria-label="ملاحظات إضافية"
                                            placeholder="أدخل ملاحظات إضافية (اختياري)"
                                        ></textarea>
                                        {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-gray-600">إجمالي الطلب:</span>
                                            <span className="font-bold text-lg text-blue-600">{total.toFixed(1)} ريال</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowOrderForm(false)}
                                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                                            >
                                                إلغاء
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                                            >
                                                {processing ? 'جاري الإرسال...' : 'تأكيد الطلب'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </AppLayout >
    );
};

export default CartIndex;
