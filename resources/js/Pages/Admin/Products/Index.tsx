import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiPlus, HiPencil, HiTrash, HiEye, HiStar, HiTag, HiFire, HiClock } from 'react-icons/hi';

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    discount?: number;
    image: string;
    rating: number;
    status: string;
    featured: boolean;
    is_offer: boolean;
    is_bestseller: boolean;
    sales_count: number;
    published_at?: string;
    category?: {
        id: number;
        name: string;
    };
}

interface ProductsProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const Products: React.FC<ProductsProps> = ({ products }) => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [tabStats, setTabStats] = useState<any>(null);

    useEffect(() => {
        fetchTabStats();
    }, []);

    const fetchTabStats = async () => {
        try {
            const response = await fetch('/admin/products/tab-statistics');
            if (response.ok) {
                const stats = await response.json();
                setTabStats(stats);
            }
        } catch (error) {
            console.error('Error fetching tab statistics:', error);
        }
    };

    const handleTabSettings = async (productId: number, field: string, value: boolean) => {
        try {
            const response = await fetch(`/admin/products/${productId}/tab-settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ [field]: value }),
            });

            if (response.ok) {
                router.reload();
            }
        } catch (error) {
            console.error('Error updating tab settings:', error);
        }
    };

    const handleBulkTabSettings = async (field: string, action: 'set' | 'unset') => {
        if (selectedProducts.length === 0) return;

        try {
            const response = await fetch('/admin/products/bulk-tab-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    product_ids: selectedProducts,
                    [field]: true,
                    action: action,
                }),
            });

            if (response.ok) {
                setSelectedProducts([]);
                router.reload();
            }
        } catch (error) {
            console.error('Error updating bulk tab settings:', error);
        }
    };

    const toggleProductSelection = (productId: number) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const toggleAllProducts = () => {
        if (selectedProducts.length === products.data.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products.data.map(p => p.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="إدارة المنتجات" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h2>
                                <Link
                                    href={route('admin.products.create')}
                                    className="bg-primary-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                                >
                                    <HiPlus className="w-5 h-5" />
                                    إضافة منتج جديد
                                </Link>
                            </div>

                            {/* Tab Statistics */}
                            {tabStats && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiStar className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold text-blue-900">المميزة</span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-900">{tabStats.featured}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiClock className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-900">الجديدة</span>
                                        </div>
                                        <p className="text-2xl font-bold text-green-900">{tabStats.new}</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiTag className="w-5 h-5 text-orange-600" />
                                            <span className="font-semibold text-orange-900">العروض</span>
                                        </div>
                                        <p className="text-2xl font-bold text-orange-900">{tabStats.offers}</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiFire className="w-5 h-5 text-red-600" />
                                            <span className="font-semibold text-red-900">الأكثر مبيعاً</span>
                                        </div>
                                        <p className="text-2xl font-bold text-red-900">{tabStats.bestsellers}</p>
                                    </div>
                                </div>
                            )}

                            {/* Bulk Actions */}
                            {selectedProducts.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <h3 className="font-semibold mb-3">إجراءات جماعية ({selectedProducts.length} منتج محدد)</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleBulkTabSettings('featured', 'set')}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                        >
                                            تعيين كمميزة
                                        </button>
                                        <button
                                            onClick={() => handleBulkTabSettings('featured', 'unset')}
                                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                        >
                                            إلغاء التميز
                                        </button>
                                        <button
                                            onClick={() => handleBulkTabSettings('is_offer', 'set')}
                                            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                                        >
                                            تعيين كعرض
                                        </button>
                                        <button
                                            onClick={() => handleBulkTabSettings('is_offer', 'unset')}
                                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                        >
                                            إلغاء العرض
                                        </button>
                                        <button
                                            onClick={() => handleBulkTabSettings('is_bestseller', 'set')}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                        >
                                            تعيين كأكثر مبيعاً
                                        </button>
                                        <button
                                            onClick={() => handleBulkTabSettings('is_bestseller', 'unset')}
                                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                        >
                                            إلغاء الأكثر مبيعاً
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Products Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.length === products.data.length}
                                                    onChange={toggleAllProducts}
                                                    className="rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow"
                                                    title="تحديد الكل"
                                                    aria-label="تحديد جميع المنتجات"
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                المنتج
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                السعر
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الحالة
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                التبويبات
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.data.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.includes(product.id)}
                                                        onChange={() => toggleProductSelection(product.id)}
                                                        className="rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow"
                                                        title="تحديد المنتج"
                                                        aria-label={`تحديد المنتج ${product.name}`}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-lg object-cover"
                                                                src={product.image || '/images/sofa3.png'}
                                                                alt={product.name}
                                                            />
                                                        </div>
                                                        <div className="mr-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {product.brand}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {product.price} ريال
                                                    </div>
                                                    {product.discount && (
                                                        <div className="text-sm text-green-600">
                                                            خصم {product.discount}%
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.status === 'active' ? 'نشط' : 'غير نشط'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleTabSettings(product.id, 'featured', !product.featured)}
                                                            className={`p-1 rounded ${product.featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                                            title="مميزة"
                                                        >
                                                            <HiStar className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleTabSettings(product.id, 'is_offer', !product.is_offer)}
                                                            className={`p-1 rounded ${product.is_offer ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                                                            title="عرض"
                                                        >
                                                            <HiTag className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleTabSettings(product.id, 'is_bestseller', !product.is_bestseller)}
                                                            className={`p-1 rounded ${product.is_bestseller ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                                                            title="أكثر مبيعاً"
                                                        >
                                                            <HiFire className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    {product.sales_count > 0 && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            مبيعات: {product.sales_count}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('admin.products.show', product.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            <HiEye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.products.edit', product.id)}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                                                                    router.delete(route('admin.products.destroy', product.id));
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900"
                                                            aria-label="حذف المنتج"
                                                        >
                                                            <HiTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Products;
