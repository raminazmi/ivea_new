import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { HiCheck, HiArrowRight } from 'react-icons/hi';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';

const Success: React.FC = () => {
    return (
        <AppLayout>
            <Head title="تم إرسال الطلب بنجاح" />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 rounded-full p-3">
                                <HiCheck className="text-green-600 text-4xl" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            تم إرسال الطلب بنجاح!
                        </h1>

                        <p className="text-gray-600 mb-6">
                            شكراً لك على طلبك. سيتم التواصل معك قريباً من قبل فريق المبيعات لتأكيد التفاصيل.
                        </p>

                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-blue-900 mb-2">الخطوات التالية:</h3>
                            <ul className="text-sm text-blue-800 space-y-1 text-right">
                                <li>• مراجعة طلبك من قبل الفريق</li>
                                <li>• الاتصال بك خلال 24 ساعة</li>
                                <li>• تأكيد التفاصيل والأسعار</li>
                                <li>• ترتيب عملية التوصيل</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href="/products"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                            >
                                <HiArrowRight className="ml-2" />
                                متابعة التسوق
                            </Link>

                            <Link
                                href="/"
                                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors inline-block"
                            >
                                العودة للرئيسية
                            </Link>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                هل تحتاج مساعدة؟
                                <Link
                                    href="/contact"
                                    className="text-blue-600 hover:text-blue-800 mr-2"
                                >
                                    تواصل معنا
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Success;
