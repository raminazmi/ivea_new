import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiUsers, HiShoppingBag, HiDocumentText, HiBriefcase, HiStar, HiTag, HiFire, HiClock } from 'react-icons/hi';

interface DashboardProps {
    stats: {
        totalProducts: number;
        totalCategories: number;
        totalArticles: number;
        totalJobs: number;
        totalApplications: number;
        totalContacts: number;
    };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
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

    return (
        <AdminLayout>
            <Head title="لوحة الإدارة" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">لوحة الإدارة</h2>

                            {/* Main Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiShoppingBag className="w-8 h-8 text-blue-600" />
                                        <div className="mr-4">
                                            <p className="text-sm font-medium text-blue-600">المنتجات</p>
                                            <p className="text-2xl font-bold text-blue-900">{stats.totalProducts}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiUsers className="w-8 h-8 text-green-600" />
                                        <div className="mr-4">
                                            <p className="text-sm font-medium text-green-600">الفئات</p>
                                            <p className="text-2xl font-bold text-green-900">{stats.totalCategories}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiDocumentText className="w-8 h-8 text-purple-600" />
                                        <div className="mr-4">
                                            <p className="text-sm font-medium text-purple-600">المقالات</p>
                                            <p className="text-2xl font-bold text-purple-900">{stats.totalArticles}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiBriefcase className="w-8 h-8 text-orange-600" />
                                        <div className="mr-4">
                                            <p className="text-sm font-medium text-orange-600">الوظائف</p>
                                            <p className="text-2xl font-bold text-orange-900">{stats.totalJobs}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiUsers className="w-8 h-8 text-red-600" />
                                        <div className="mr-4">
                                            <p className="text-sm font-medium text-red-600">الطلبات</p>
                                            <p className="text-2xl font-bold text-red-900">{stats.totalApplications}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiDocumentText className="w-8 h-8 text-indigo-600" />
                                        <div className="mr-4">
                                            <p className="text-sm font-medium text-indigo-600">الرسائل</p>
                                            <p className="text-2xl font-bold text-indigo-900">{stats.totalContacts}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tab Statistics */}
                            {tabStats && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">إحصائيات التبويبات</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <a
                                    href={route('admin.products.create')}
                                    className="bg-primary-yellow text-white p-4 rounded-lg hover:bg-yellow-600 transition-colors text-center"
                                >
                                    <HiShoppingBag className="w-6 h-6 mx-auto mb-2" />
                                    <span className="font-medium">إضافة منتج جديد</span>
                                </a>

                                <a
                                    href={route('admin.categories.create')}
                                    className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors text-center"
                                >
                                    <HiUsers className="w-6 h-6 mx-auto mb-2" />
                                    <span className="font-medium">إضافة فئة جديدة</span>
                                </a>

                                <a
                                    href={route('admin.articles.create')}
                                    className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors text-center"
                                >
                                    <HiDocumentText className="w-6 h-6 mx-auto mb-2" />
                                    <span className="font-medium">إضافة مقال جديد</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard; 