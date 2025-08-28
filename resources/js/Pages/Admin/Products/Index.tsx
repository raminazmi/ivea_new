import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiStar, HiTag, HiFire, HiClock, HiSearch, HiFilter } from 'react-icons/hi';

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

interface Category {
    id: number;
    name: string;
    parent_id?: number;
    children?: Category[];
}

interface ProductsProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        total: number;
    };
    categories: Category[];
    filters: any;
}

const Products: React.FC<ProductsProps> = ({ products, categories, filters }) => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [tabStats, setTabStats] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || 'all');
    const [tabFilter, setTabFilter] = useState(filters.tab || 'all');
    const [showFilters, setShowFilters] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'success',
        isVisible: false
    });

    useEffect(() => {
        fetchTabStats();
    }, []);

    const fetchTabStats = async () => {
        try {
            const response = await fetch('/admin/products/tab-statistics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin'
            });
            if (response.ok) {
                const stats = await response.json();
                setTabStats(stats);
            }
        } catch (error) {
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

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (productToDelete) {
            router.delete(route('admin.products.destroy', productToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                    setToast({
                        message: 'تم حذف المنتج بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف المنتج',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
        }
    };

    const handleSearch = () => {
        router.get(route('admin.products.index'), {
            search: searchTerm,
            status: statusFilter,
            category: categoryFilter,
            tab: tabFilter,
        });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setCategoryFilter('all');
        setTabFilter('all');
        router.get(route('admin.products.index'));
    };

    const handleBulkDelete = () => {
        if (selectedProducts.length === 0) return;
        if (confirm(`هل أنت متأكد من حذف ${selectedProducts.length} منتج محدد؟`)) {
        }
    };

    return (
        <AdminLayout>
            <Head title="إدارة المنتجات">
                <style>{`
                    .table-container {
                        width:100%;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: thin;
                        scrollbar-color: #d1d5db #f9fafb;
                    }
                    .table-container::-webkit-scrollbar {
                        height: 8px;
                    }
                    .table-container::-webkit-scrollbar-track {
                        background: #f9fafb;
                        border-radius: 4px;
                    }
                    .table-container::-webkit-scrollbar-thumb {
                        background: #d1d5db;
                        border-radius: 4px;
                    }
                    .table-container::-webkit-scrollbar-thumb:hover {
                        background: #9ca3af;
                    }
                    .products-table {
                        width: 100%;
                        min-width: 1000px; /* Ensures table is wide enough to trigger scroll on smaller screens */
                    }
                    @media (max-width: 640px) {
                        .products-table {
                            min-width: 800px; /* Adjust for smaller screens */
                        }
                    }
                `}</style>
            </Head>

            <div className="py-6">
                <div className="max-w-5xl sm:px-6 lg:px-8">
                    <div className="w-[100%] bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة المنتجات</h2>
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <Link
                                        href={route('admin.products.create')}
                                        className="bg-primary-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <HiPlus className="w-4 h-4" />
                                        إضافة منتج جديد
                                    </Link>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <HiFilter className="w-4 h-4" />
                                        الفلاتر
                                    </button>
                                </div>
                            </div>

                            {showFilters && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                                            <div className="relative">
                                                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    placeholder="اسم المنتج، العلامة التجارية، رمز العنصر..."
                                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                                title="فلتر الحالة"
                                                aria-label="فلتر الحالة"
                                            >
                                                <option value="all">الكل</option>
                                                <option value="active">نشط</option>
                                                <option value="inactive">غير نشط</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                                            <select
                                                value={categoryFilter}
                                                onChange={(e) => setCategoryFilter(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                                title="فلتر الفئة"
                                                aria-label="فلتر الفئة"
                                            >
                                                <option value="all">الكل</option>
                                                {categories.map((mainCategory) => (
                                                    <optgroup key={`group-${mainCategory.id}`} label={mainCategory.name}>
                                                        {mainCategory.children && mainCategory.children.map((subCategory) => (
                                                            <option key={`sub-${subCategory.id}`} value={subCategory.id}>
                                                                {subCategory.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">التبويب</label>
                                            <select
                                                value={tabFilter}
                                                onChange={(e) => setTabFilter(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                                title="فلتر التبويب"
                                                aria-label="فلتر التبويب"
                                            >
                                                <option value="all">الكل</option>
                                                <option value="featured">مميز</option>
                                                <option value="new">جديد</option>
                                                <option value="bestsellers">الأكثر مبيعاً</option>
                                                <option value="offers">عروض</option>
                                            </select>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <button
                                                onClick={handleSearch}
                                                className="flex-1 bg-primary-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                                            >
                                                تطبيق الفلاتر
                                            </button>
                                            <button
                                                onClick={handleClearFilters}
                                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                                title="مسح الفلاتر"
                                            >
                                                مسح
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tabStats && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiStar className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold text-blue-900 text-sm">المميزة</span>
                                        </div>
                                        <p className="text-xl font-bold text-blue-900">{tabStats.featured}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiClock className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-900 text-sm">الجديدة</span>
                                        </div>
                                        <p className="text-xl font-bold text-green-900">{tabStats.new}</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiTag className="w-5 h-5 text-orange-600" />
                                            <span className="font-semibold text-orange-900 text-sm">العروض</span>
                                        </div>
                                        <p className="text-xl font-bold text-orange-900">{tabStats.offers}</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <HiFire className="w-5 h-5 text-red-600" />
                                            <span className="font-semibold text-red-900 text-sm">الأكثر مبيعاً</span>
                                        </div>
                                        <p className="text-xl font-bold text-red-900">{tabStats.bestsellers}</p>
                                    </div>
                                </div>
                            )}

                            {selectedProducts.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <h3 className="font-semibold text-gray-900">
                                            إجراءات جماعية ({selectedProducts.length} منتج محدد)
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleBulkTabSettings('featured', 'set')}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                                            >
                                                تعيين كمميزة
                                            </button>
                                            <button
                                                onClick={() => handleBulkTabSettings('featured', 'unset')}
                                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                                            >
                                                إلغاء التميز
                                            </button>
                                            <button
                                                onClick={() => handleBulkTabSettings('is_offer', 'set')}
                                                className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                                            >
                                                تعيين كعرض
                                            </button>
                                            <button
                                                onClick={() => handleBulkTabSettings('is_offer', 'unset')}
                                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                                            >
                                                إلغاء العرض
                                            </button>
                                            <button
                                                onClick={() => handleBulkTabSettings('is_bestseller', 'set')}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                            >
                                                تعيين كأكثر مبيعاً
                                            </button>
                                            <button
                                                onClick={() => handleBulkTabSettings('is_bestseller', 'unset')}
                                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                                            >
                                                إلغاء الأكثر مبيعاً
                                            </button>
                                            <button
                                                onClick={handleBulkDelete}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                            >
                                                حذف المحدد
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="table-container border border-gray-200 rounded-lg">
                                <table className="products-table divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.length === products.data.length}
                                                    onChange={toggleAllProducts}
                                                    className="rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow"
                                                    title="تحديد الكل"
                                                    aria-label="تحديد جميع المنتجات"
                                                />
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                                                المنتج
                                            </th>
                                            <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                                الفئة
                                            </th>
                                            <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                                السعر
                                            </th>
                                            <th className="hidden xl:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                                                الحالة
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                                التبويبات
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.data.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.includes(product.id)}
                                                        onChange={() => toggleProductSelection(product.id)}
                                                        className="rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow"
                                                        title="تحديد المنتج"
                                                        aria-label={`تحديد المنتج ${product.name}`}
                                                    />
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap w-48">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-lg object-cover"
                                                                src={product.image || '/images/sofa3.png'}
                                                                alt={product.name}
                                                            />
                                                        </div>
                                                        <div className="mr-3 sm:mr-4 min-w-0 flex-1">
                                                            <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-40 md:max-w-48" title={product.name}>
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 truncate max-w-32 sm:max-w-40 md:max-w-48" title={product.brand}>
                                                                {product.brand}
                                                            </div>
                                                            <div className="md:hidden text-sm text-gray-500 truncate max-w-32 sm:max-w-40" title={product.category?.name || 'غير محدد'}>
                                                                {product.category?.name || 'غير محدد'}
                                                            </div>
                                                            <div className="lg:hidden text-sm text-gray-900">
                                                                {product.price} ريال
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap w-32">
                                                    <div className="text-sm text-gray-900 truncate" title={product.category?.name || 'غير محدد'}>
                                                        {product.category?.name || 'غير محدد'}
                                                    </div>
                                                </td>
                                                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap w-24">
                                                    <div className="text-sm text-gray-900 truncate">
                                                        {product.price} ريال
                                                    </div>
                                                    {product.discount && (
                                                        <div className="text-sm text-green-600 truncate">
                                                            خصم {product.discount}%
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap w-20">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.status === 'active' ? 'نشط' : 'غير نشط'}
                                                    </span>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap w-32">
                                                    <div className="flex gap-1 sm:gap-2 min-w-0">
                                                        <button
                                                            onClick={() => handleTabSettings(product.id, 'featured', !product.featured)}
                                                            className={`p-1 rounded flex-shrink-0 ${product.featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                                            title="مميزة"
                                                        >
                                                            <HiStar className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleTabSettings(product.id, 'is_offer', !product.is_offer)}
                                                            className={`p-1 rounded flex-shrink-0 ${product.is_offer ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                                                            title="عرض"
                                                        >
                                                            <HiTag className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleTabSettings(product.id, 'is_bestseller', !product.is_bestseller)}
                                                            className={`p-1 rounded flex-shrink-0 ${product.is_bestseller ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                                                            title="أكثر مبيعاً"
                                                        >
                                                            <HiFire className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    {product.sales_count > 0 && (
                                                        <div className="text-xs text-gray-500 mt-1 truncate max-w-20">
                                                            مبيعات: {product.sales_count}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium w-24">
                                                    <div className="flex gap-1 sm:gap-2 min-w-0">
                                                        <Link
                                                            href={route('admin.products.show', product.id)}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 flex-shrink-0"
                                                            title="عرض"
                                                        >
                                                            <HiEye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.products.edit', product.id)}
                                                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 flex-shrink-0"
                                                            title="تعديل"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(product)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 flex-shrink-0"
                                                            title="حذف"
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

                            {products.last_page > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex space-x-2 rtl:space-x-reverse">
                                        {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => router.get(route('admin.products.index'), {
                                                    page,
                                                    search: searchTerm,
                                                    status: statusFilter,
                                                    category: categoryFilter,
                                                    tab: tabFilter,
                                                })}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${page === products.current_page
                                                    ? 'bg-primary-yellow text-gray-900'
                                                    : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف المنتج "${productToDelete?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                cancelText="إلغاء"
                type="danger"
            />

            {toast.isVisible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
                />
            )}
        </AdminLayout>
    );
};

export default Products;