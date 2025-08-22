import React, { useState, useEffect } from 'react';
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
        customizations?: Record<string, {
            type: string;
            label: string;
            value?: any;
            values?: any[];
            displayValue?: string;
            displayValues?: string[];
            width?: number;
            height?: number;
            length?: number;
            unit?: string;
            files?: Array<{
                name: string;
                size: number;
                uuid: string;
                path?: string;
                url?: string;
                type?: string;
            }>;
        }>;
        uploadedFiles?: Array<{
            name: string;
            path: string;
            url: string;
            size: number;
            type: string;
            uuid: string;
        }>;
        [key: string]: any;
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
        customizations: selectedOptions.customizations || {},
        uploaded_files: selectedOptions.uploadedFiles || [],
        quantity: selectedOptions.quantity || 1
    });

    useEffect(() => {
        setData(prev => ({
            ...prev,
            selected_options: selectedOptions,
            customizations: selectedOptions.customizations || {},
            uploaded_files: selectedOptions.uploadedFiles || [],
            quantity: selectedOptions.quantity || 1
        }));
    }, [selectedOptions]);

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
                                <p className="flex items-center gap-1 text-yellow-600 font-bold">
                                    <span>{product.price}</span>
                                    <img
                                        src="/images/sar-currency(black).svg"
                                        alt="ريال"
                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                    />
                                </p>
                            </div>
                        </div>

                        {(selectedOptions.color || Object.keys(selectedOptions.customizations || {}).length > 0 || selectedOptions.uploadedFiles?.length) && (
                            <div className="mt-3 bg-white rounded-lg shadow-sm p-3 border border-yellow-100 text-sm text-gray-700 space-y-2">
                                {selectedOptions.color && (
                                    <div>
                                        <span className="font-bold text-gray-900">اللون:</span>
                                        <span
                                            style={{ background: selectedOptions.color }}
                                            className="inline-block w-4 h-4 rounded-full border mr-1 align-middle"
                                        ></span>
                                        {selectedOptions.colorName || selectedOptions.color}
                                    </div>
                                )}

                                {Object.entries(selectedOptions.customizations || {}).map(([key, customization]) => (
                                    <div key={key}>
                                        <span className="font-bold text-gray-900">{customization.label}:</span>
                                        {customization.type === 'color_selector' && (
                                            <>
                                                <span
                                                    style={{ background: customization.value }}
                                                    className="inline-block w-4 h-4 rounded-full border mr-1 align-middle"
                                                ></span>
                                                {customization.displayValue || customization.value}
                                            </>
                                        )}
                                        {customization.type === 'checkbox_multiple' && (
                                            <span>{customization.displayValues?.join(', ') || ''}</span>
                                        )}
                                        {customization.type === 'dimensions' && (
                                            <span>
                                                {customization.width} × {customization.height} {customization.unit || 'سم'}
                                            </span>
                                        )}
                                        {customization.type === 'dimensions_3d' && (
                                            <span>
                                                {customization.width} × {customization.height} × {customization.length} {customization.unit || 'سم'}
                                            </span>
                                        )}
                                        {(customization.type === 'select' || customization.type === 'number') && (
                                            <span>{customization.displayValue || customization.value}</span>
                                        )}
                                        {customization.type === 'file_upload' && customization.files && (
                                            <div className="mt-1 space-y-1">
                                                {customization.files.map((file: any, index: number) => (
                                                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                                                        <a
                                                            href={`/download-file/${file.uuid}`}
                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {file.name}
                                                        </a>
                                                        <span className="text-gray-400">
                                                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {selectedOptions.uploadedFiles && selectedOptions.uploadedFiles.length > 0 && (
                                    <div>
                                        <span className="font-bold text-gray-900">الملفات المرفقة:</span>
                                        <div className="mt-1 space-y-1">
                                            {selectedOptions.uploadedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                                                    <a
                                                        href={`/download-file/${file.uuid}`}
                                                        className="text-blue-600 hover:text-blue-800 underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {file.name}
                                                    </a>
                                                    <span className="text-gray-400">
                                                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
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

                        <div className="grid grid-cols-2 gap-4">
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
                                <span className="flex items-center gap-1 font-bold text-lg text-blue-600">
                                    <span>{product.price.toFixed(2)}</span>
                                    <img
                                        src="/images/sar-currency(black).svg"
                                        alt="ريال"
                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                    />
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
