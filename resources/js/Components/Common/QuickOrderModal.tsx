import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

interface QuickOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: number;
        name: string;
        price: number;
        image?: string;
    };
    selectedOptions?: {
        color?: string;
        colorName?: string;
        width?: number;
        height?: number;
        measurementUnit?: string;
        openingMethod?: string;
        trackType?: string;
        liningOption?: string;
        quantity?: number;
        [key: string]: any; // للسماح بخصائص إضافية
    };
}

const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
    isOpen,
    onClose,
    product,
    selectedOptions = {}
}) => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        notes: '',
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        selected_options: selectedOptions,
        quantity: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/quick-order', {
            onSuccess: () => {
                onClose();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">اطلب الآن</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {/* عرض المنتج */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{product.name}</h4>
                                <p className="text-yellow-600 font-bold">{product.price} ر.س</p>
                            </div>
                        </div>

                        {(selectedOptions.color || selectedOptions.width || selectedOptions.openingMethod || selectedOptions.trackType || selectedOptions.liningOption) && (
                            <div className="mt-3 bg-white rounded-lg shadow-sm p-3 border border-yellow-100 text-sm text-gray-700 space-y-1">
                                {selectedOptions.color && (
                                    <div>
                                        <span className="font-bold text-gray-900">اللون:</span>
                                        <span
                                            style={{ background: selectedOptions.color }}
                                            className="inline-block w-4 h-4 rounded-full border mr-1 align-middle"
                                        ></span>
                                        {selectedOptions.colorName}
                                    </div>
                                )}
                                {selectedOptions.width && selectedOptions.height && (
                                    <div>
                                        <span className="font-bold text-gray-900">المقاس:</span>
                                        {selectedOptions.width} × {selectedOptions.height} {selectedOptions.measurementUnit}
                                    </div>
                                )}
                                {selectedOptions.openingMethod && (
                                    <div>
                                        <span className="font-bold text-gray-900">طريقة الفتح:</span>
                                        {selectedOptions.openingMethod}
                                    </div>
                                )}
                                {selectedOptions.trackType && (
                                    <div>
                                        <span className="font-bold text-gray-900">نوع المسار:</span>
                                        {selectedOptions.trackType}
                                    </div>
                                )}
                                {selectedOptions.liningOption && (
                                    <div>
                                        <span className="font-bold text-gray-900">البطانة:</span>
                                        {selectedOptions.liningOption}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    الاسم الأول *
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    الاسم الأخير *
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                البريد الإلكتروني *
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                رقم الهاتف *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    المدينة *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                    الكمية *
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                العنوان التفصيلي *
                            </label>
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                                placeholder="أي ملاحظات خاصة بالطلب..."
                            ></textarea>
                            {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-600">إجمالي الطلب:</span>
                                <span className="font-bold text-lg text-blue-600">
                                    {(product.price * data.quantity).toFixed(2)} ر.س
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
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
    );
};

export default QuickOrderModal;
