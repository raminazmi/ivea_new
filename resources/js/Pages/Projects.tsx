import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import SectionTitle from '@/Components/SectionTitle';
import ContactUs from '@/Components/LandingPage/ContactUs';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { HiCheckCircle, HiUpload } from 'react-icons/hi';
import Toast from '@/Components/Common/Toast';
import PartnersCarousel from '@/Components/LandingPage/PartnersCarousel';

interface ProjectsPageProps {
    spaceTypes: Record<string, string>;
    productNeeds: Record<string, string>;
    preferredStyles: Record<string, string>;
    productTypes: Record<string, string>;
    flash?: {
        success?: string;
        error?: string;
        costEstimate?: any;
    };
}

const Projects: React.FC<ProjectsPageProps> = ({ spaceTypes, productNeeds, preferredStyles, productTypes, flash }) => {
    const { flash: flashMessages } = usePage().props as any;
    const [activeSection, setActiveSection] = useState<'quiz'>('quiz');
    const [quizStep, setQuizStep] = useState(1);
    const [showQuizResult, setShowQuizResult] = useState(false);
    const [toast, setToast] = useState<{
        isVisible: boolean;
        message: string;
        type: 'success' | 'error';
    }>({
        isVisible: false,
        message: '',
        type: 'success',
    });

    useEffect(() => {
        const successMessage = flashMessages?.success || flash?.success;
        const errorMessage = flashMessages?.error || flash?.error;

        if (successMessage) {
            setToast({
                isVisible: true,
                message: successMessage,
                type: 'success'
            });
        } else if (errorMessage) {
            setToast({
                isVisible: true,
                message: errorMessage,
                type: 'error'
            });
        }
    }, [flashMessages, flash]);

    const quizForm = useForm({
        space_types: [] as string[],
        space_type_other: '',
        product_needs: [] as string[],
        product_other: '',
        preferred_styles: [] as string[],
        style_other: '',
        name: '',
        email: '',
        phone: '',
        additional_notes: '',
        images: [] as File[]
    });

    const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
            const currentValues = quizForm.data[field as keyof typeof quizForm.data] as string[];
            if (checked) {
                quizForm.setData(field as any, [...currentValues, value]);
            } else {
                quizForm.setData(field as any, currentValues.filter(v => v !== value));
        }
    };

    const handleQuizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(quizForm.data).forEach(key => {
            if (key === 'images') {
                quizForm.data.images.forEach((file, index) => {
                    formData.append(`images[${index}]`, file);
                });
            } else {
                formData.append(key, (quizForm.data as any)[key]);
            }
        });

        quizForm.post('/projects/quiz', {
            forceFormData: true,
            onSuccess: () => {
                setShowQuizResult(true);
                setToast({
                    isVisible: true,
                    message: 'تم إرسال بياناتك بنجاح. سيتواصل معك فريقنا قريباً!',
                    type: 'success',
                });
            },
            onError: () => {
                setToast({
                    isVisible: true,
                    message: 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <AppLayout>
            <Head title="المشاريع" />

            <CoverSection
                imageUrl="/images/projects_cover.png"
                title="تصفح  المشاريــــــــع"
                subtitle="اكتشف إبداعاتنا في التصميم الداخلي"
                description="مجموعة متنوعة من المشاريع المنجزة"
                socialLinks={{
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                }}
            />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <section className="py-10 md:py-12 lg:py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 md:mb-16">
                            <SectionTitle
                                text="ما هو أسلوب التصميم الخاص بي؟"
                                size="3xl"
                                align="center"
                            />
                            <div className="mt-6 md:mt-8 max-w-4xl mx-auto">
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                    لست متأكدًا مما إذا كان أسلوبك وهميًا أم فخمًا أم عصريًا؟ يساعدك نموذجنا على اكتشاف أسلوبك الفريد في التصميم. بمجرد إرسال بياناتك، سيساعدك فريقنا الموهوب من المصممين في تصميم منزل تحب العيش فيه.
                                </p>
                                <div className="mt-8 flex flex-wrap justify-center gap-2">
                                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8">
                                        <button
                                            onClick={() => setActiveSection('quiz')}
                                            className={`px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${activeSection === 'quiz'
                                                ? 'bg-primary-yellow text-gray-900 shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            ما نوع مساحتك ؟
                                        </button>
                                    </div>
                                </div>

                                {activeSection === 'quiz' && (
                                    <section className="py-20 bg-gray-50">
                                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="bg-white rounded-xl shadow-lg p-8">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">ما نوع مساحتك ؟</h2>
                                                </div>
                                                <div className="text-center mb-8">
                                                    <div className="flex justify-center mb-6">
                                                        {[1, 2, 3, 4].map((step) => (
                                                            <div key={step} className={`w-8 h-8 rounded-full mx-2 flex items-center justify-center text-sm font-bold ${step <= quizStep ? 'bg-primary-yellow text-white' : 'bg-gray-200 text-gray-500'
                                                                }`}>
                                                                {step}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {!showQuizResult ? (
                                                    <form onSubmit={handleQuizSubmit} className="space-y-8">
                                                        {quizStep === 1 && (
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-6">ما نوع مساحتك؟</h3>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    {[
                                                                        { key: 'residential', value: 'المنازل السكنية' },
                                                                        { key: 'offices', value: 'المكاتب والشركات' },
                                                                        { key: 'shops', value: 'المحلات التجارية' },
                                                                        { key: 'hotels', value: 'الفنادق والمنتجعات' },
                                                                        { key: 'other', value: 'أخرى' },
                                                                    ].map(({ key, value }) => (
                                                                        <label key={key} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="ml-3 h-4 w-4 text-primary-yellow"
                                                                                checked={quizForm.data.space_types.includes(key)}
                                                                                onChange={(e) => handleCheckboxChange('space_types', key, e.target.checked)}
                                                                            />
                                                                            <span>{value}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                                {quizForm.data.space_types.includes('other') && (
                                                                    <input
                                                                        type="text"
                                                                        placeholder="حدد نوع المساحة"
                                                                        className="mt-4 w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.space_type_other}
                                                                        onChange={(e) => quizForm.setData('space_type_other', e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}

                                                        {quizStep === 2 && (
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-6">ما المنتجات التي تحتاجها؟</h3>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    {Object.entries(productNeeds || {}).map(([key, value]) => (
                                                                        <label key={key} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="ml-3 h-4 w-4 text-primary-yellow"
                                                                                checked={quizForm.data.product_needs.includes(key)}
                                                                                onChange={(e) => handleCheckboxChange('product_needs', key, e.target.checked)}
                                                                            />
                                                                            <span>{value}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                                {quizForm.data.product_needs.includes('other') && (
                                                                    <input
                                                                        type="text"
                                                                        placeholder="حدد المنتج المطلوب"
                                                                        className="mt-4 w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.product_other}
                                                                        onChange={(e) => quizForm.setData('product_other', e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}

                                                        {quizStep === 3 && (
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-6">ما الستايل المفضل لديك؟</h3>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    {Object.entries(preferredStyles || {}).map(([key, value]) => (
                                                                        <label key={key} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="ml-3 h-4 w-4 text-primary-yellow"
                                                                                checked={quizForm.data.preferred_styles.includes(key)}
                                                                                onChange={(e) => handleCheckboxChange('preferred_styles', key, e.target.checked)}
                                                                            />
                                                                            <span>{value}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                                {quizForm.data.preferred_styles.includes('other') && (
                                                                    <input
                                                                        type="text"
                                                                        placeholder="حدد الستايل المفضل"
                                                                        className="mt-4 w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.style_other}
                                                                        onChange={(e) => quizForm.setData('style_other', e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}

                                                        {quizStep === 4 && (
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-6">معلومات التواصل ورفع الصور</h3>
                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="الاسم"
                                                                        className="w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.name}
                                                                        onChange={(e) => quizForm.setData('name', e.target.value)}
                                                                        title="أدخل اسمك الكامل"
                                                                    />
                                                                    <input
                                                                        type="email"
                                                                        placeholder="البريد الإلكتروني"
                                                                        className="w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.email}
                                                                        onChange={(e) => quizForm.setData('email', e.target.value)}
                                                                        title="أدخل بريدك الإلكتروني"
                                                                    />
                                                                    <input
                                                                        type="tel"
                                                                        placeholder="رقم الهاتف"
                                                                        className="w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.phone}
                                                                        onChange={(e) => quizForm.setData('phone', e.target.value)}
                                                                        title="أدخل رقم هاتفك"
                                                                    />
                                                                </div>
                                                                <textarea
                                                                    placeholder="ملاحظات إضافية"
                                                                    rows={4}
                                                                    className="mt-4 w-full p-3 border rounded-lg"
                                                                    value={quizForm.data.additional_notes}
                                                                    onChange={(e) => quizForm.setData('additional_notes', e.target.value)}
                                                                    title="أضف أي ملاحظات إضافية حول مشروعك"
                                                                />
                                                                
                                                                <div className="mt-6">
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        صور المساحة (اختيارية - 1-5 صور)
                                                                    </label>
                                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-yellow transition-colors">
                                                                        <HiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                                        <input
                                                                            type="file"
                                                                            multiple
                                                                            accept="image/*"
                                                                            className="hidden"
                                                                            id="quiz-images"
                                                                            onChange={(e) => {
                                                                                const files = Array.from(e.target.files || []);
                                                                                quizForm.setData('images', files.slice(0, 5) as File[]);
                                                                            }}
                                                                            title="اختر صور مساحتك"
                                                                        />
                                                                        <label htmlFor="quiz-images" className="cursor-pointer">
                                                                            <span className="text-primary-yellow font-medium">اختر الصور</span>
                                                                            <p className="text-sm text-gray-500 mt-2">JPG, PNG, GIF حتى 5MB لكل صورة</p>
                                                                        </label>
                                                                        {quizForm.data.images.length > 0 && (
                                                                            <p className="mt-2 text-sm text-green-600">
                                                                                تم اختيار {quizForm.data.images.length} صورة
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex justify-between">
                                                            {quizStep > 1 && (
                                                                <SecondaryButton
                                                                    type="button"
                                                                    onClick={() => setQuizStep(quizStep - 1)}
                                                                >
                                                                    السابق
                                                                </SecondaryButton>
                                                            )}

                                                            {quizStep < 4 ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (
                                                                            (quizStep === 1 && quizForm.data.space_types.length === 0) ||
                                                                            (quizStep === 2 && quizForm.data.product_needs.length === 0) ||
                                                                            (quizStep === 3 && quizForm.data.preferred_styles.length === 0)
                                                                        ) return;
                                                                        setQuizStep(quizStep + 1);
                                                                    }}
                                                                    disabled={
                                                                        (quizStep === 1 && quizForm.data.space_types.length === 0) ||
                                                                        (quizStep === 2 && quizForm.data.product_needs.length === 0) ||
                                                                        (quizStep === 3 && quizForm.data.preferred_styles.length === 0)
                                                                    }
                                                                    className="mr-auto inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                                >
                                                                    التالي
                                                                </button>
                                                            ) : (
                                                                <PrimaryButton
                                                                    type="submit"
                                                                    disabled={quizForm.processing}
                                                                    className="mr-auto"
                                                                >
                                                                    {quizForm.processing ? 'جاري الإرسال...' : 'ابدأ مشروعك معنا'}
                                                                </PrimaryButton>
                                                            )}
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <div className="text-center py-12">
                                                        <HiCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">نحن نقدر ذوقك الرائع!</h3>
                                                        <p className="text-lg text-gray-600 mb-8">فريقنا جاهز لمساعدتك في تحقيق حلمك</p>
                                                        <div className="flex gap-4 justify-center">
                                                            <PrimaryButton onClick={() => {
                                                                setShowQuizResult(false);
                                                                setQuizStep(1);
                                                                quizForm.reset();
                                                            }}>
                                                                إرسال مشروع جديد
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                )}


                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="text-center mb-12 md:mb-16">
                        <SectionTitle
                            text="فئات المشاريع"
                            size="3xl"
                            align="center"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">المنازل السكنية</h3>
                            <p className="text-sm md:text-base text-gray-600">
                                تصميم وتنفيذ المنازل الفاخرة مع التركيز على الراحة والأناقة
                            </p>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">المكاتب والشركات</h3>
                            <p className="text-sm md:text-base text-gray-600">
                                بيئات عمل حديثة ومريحة تعزز الإنتاجية والإبداع
                            </p>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">المحلات التجارية</h3>
                            <p className="text-sm md:text-base text-gray-600">
                                تصميم متاجر جذابة تعكس هوية العلامة التجارية
                            </p>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">الفنادق والمنتجعات</h3>
                            <p className="text-sm md:text-base text-gray-600">
                                تجارب إقامة فريدة تجمع بين الفخامة والراحة
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <PartnersCarousel />
            <section>
                <div className="">
                    <div className="bg-peach1 text-center flex justify-center items-center">
                        <div className=" max-w-4xl p-12">
                            <SectionTitle
                                text="لا تفوت أي جديد!"
                                size="3xl"
                                align="center"
                            />
                            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                                اكتشف أحدث تصاميم الكتب، الخشبيات، الأبواب، والستائر المختارة بعناية لتضفي لمسة فاخرة على منزلك.
                                كن أول من يطلع على الاتجاهات الجديدة والمنتجات المميزة التي تجمع بين الأناقة والوظيفة.
                            </p>
                            <Link
                                href="/contact"
                                className="bg-primary-yellow text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors duration-300">
                                احجز استشاراتك الآن
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <ContactUs />
            </div>

            {toast.isVisible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
                />
            )}
        </AppLayout>
    );
};

export default Projects;