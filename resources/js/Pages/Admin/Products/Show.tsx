import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Product {
    id: number;
    name: string;
    brand?: string;
    collection?: string;
    description?: string;
    price: number;
    discount?: number;
    image?: string;
    images?: string[];
    rating?: number;
    status: string;
    tab: string;
    stock: number;
    sku?: string;
    colors?: string[];
    category?: {
        id: number;
        name: string;
    };
    base_price?: number;
    price_per_sqm?: number;
    pricing_method?: string;
    min_price?: number;
    max_price?: number;
    default_width?: number;
    default_height?: number;
    min_width?: number;
    max_width?: number;
    min_height?: number;
    max_height?: number;
}

interface ShowProps {
    product: Product;
}

const Show: React.FC<ShowProps> = ({ product }) => {
    return (
        <AdminLayout>
            <Head title={`عرض المنتج - ${product.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">عرض المنتج</h1>
                    <div className="flex gap-2">
                        <Link
                            href={route('admin.products.edit', product.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            تعديل
                        </Link>
                        <Link
                            href={route('admin.products.index')}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            رجوع
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">صور المنتج</h3>
                            {product.images && product.images.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {product.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            {index === 0 && (
                                                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                    رئيسية
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="mt-2">لا توجد صور</p>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل المنتج</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
                                        <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">العلامة التجارية</label>
                                        <p className="mt-1 text-sm text-gray-900">{product.brand || 'غير محدد'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">التشكيلة</label>
                                        <p className="mt-1 text-sm text-gray-900">{product.collection || 'غير محدد'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الوصف</label>
                                        <p className="mt-1 text-sm text-gray-900">{product.description || 'لا يوجد وصف'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">السعر</label>
                                            <p className="mt-1 text-sm text-gray-900">{product.price} ريال</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">الخصم</label>
                                            <p className="mt-1 text-sm text-gray-900">{product.discount || 0}%</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">التقييم</label>
                                            <p className="mt-1 text-sm text-gray-900">{product.rating || 0}/5</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">المخزون</label>
                                            <p className="mt-1 text-sm text-gray-900">{product.stock}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">رمز العنصر</label>
                                        <p className="mt-1 text-sm text-gray-900">{product.sku || 'غير محدد'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الحالة</label>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status === 'active' ? 'نشط' : 'غير نشط'}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">التبويب</label>
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.tab}
                                        </span>
                                    </div>

                                    {product.colors && product.colors.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">الألوان</label>
                                            <div className="mt-1 flex gap-2">
                                                {product.colors.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-6 h-6 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات التسعير الديناميكي</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">السعر الأساسي</h4>
                                <p className="text-2xl font-bold text-green-600">
                                    {product.base_price ? `${product.base_price} ريال` : 'غير محدد'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">للأبعاد الافتراضية</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">السعر لكل متر مربع</h4>
                                <p className="text-lg font-bold text-blue-600">
                                    {product.price_per_sqm ? `${product.price_per_sqm} ريال/م²` : 'غير محدد'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">سعر إضافي</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">طريقة التسعير</h4>
                                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${product.pricing_method === 'area_based' ? 'bg-green-100 text-green-800' :
                                    product.pricing_method === 'fixed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {product.pricing_method === 'area_based' ? 'حسب المساحة' :
                                        product.pricing_method === 'fixed' ? 'ثابت' :
                                            product.pricing_method === 'size_based' ? 'حسب الحجم' :
                                                product.pricing_method === 'custom' ? 'مخصص' : 'غير محدد'}
                                </span>
                            </div>

                            {product.min_price && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">الحد الأدنى للسعر</h4>
                                    <p className="text-lg font-bold text-red-600">{product.min_price} ريال</p>
                                </div>
                            )}

                            {product.max_price && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">الحد الأقصى للسعر</h4>
                                    <p className="text-lg font-bold text-red-600">{product.max_price} ريال</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات الأبعاد</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-md font-medium text-gray-700">الأبعاد الافتراضية</h4>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-sm text-gray-600">العرض</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {product.default_width || 100} سم
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">الارتفاع</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {product.default_height || 100} سم
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center mt-3 pt-3 border-t border-blue-200">
                                        <p className="text-sm text-blue-700">
                                            المساحة الأساسية: <span className="font-bold">
                                                {(((product.default_width || 100) * (product.default_height || 100)) / 10000).toFixed(2)} م²
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-md font-medium text-gray-700">الحدود المسموحة</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">العرض</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {product.min_width || 50} سم - {product.max_width || 500} سم
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">الارتفاع</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {product.min_height || 50} سم - {product.max_height || 400} سم
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default Show; 