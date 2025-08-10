import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import SectionTitle from '@/Components/SectionTitle';
import ProjectShowcase from '@/Components/LandingPage/ProjectShowcase';
import ContactUs from '@/Components/LandingPage/ContactUs';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { HiCheckCircle, HiUpload } from 'react-icons/hi';
import Toast from '@/Components/Common/Toast';

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
    const [activeSection, setActiveSection] = useState<'quiz' | 'calculator' | 'upload'>('quiz');
    const [quizStep, setQuizStep] = useState(1);
    const [showQuizResult, setShowQuizResult] = useState(false);
    const [costEstimate, setCostEstimate] = useState<any>(null);
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
        const costData = flashMessages?.costEstimate || flash?.costEstimate;

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

        if (costData) {
            setCostEstimate(costData);
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
        additional_notes: ''
    });

    const calculatorForm = useForm({
        rooms_count: 1,
        service_type: 'custom',
        material_type: 'economy',
        project_type: [] as string[]
    });

    const submissionForm = useForm({
        name: '',
        email: '',
        phone: '',
        product_type: '',
        description: '',
        images: [] as File[]
    });

    const handleCheckboxChange = (form: 'quiz' | 'calculator', field: string, value: string, checked: boolean) => {
        if (form === 'quiz') {
            const currentValues = quizForm.data[field as keyof typeof quizForm.data] as string[];
            if (checked) {
                quizForm.setData(field as any, [...currentValues, value]);
            } else {
                quizForm.setData(field as any, currentValues.filter(v => v !== value));
            }
        } else if (form === 'calculator') {
            const currentValues = calculatorForm.data[field as keyof typeof calculatorForm.data] as string[];
            if (checked) {
                calculatorForm.setData(field as any, [...currentValues, value]);
            } else {
                calculatorForm.setData(field as any, currentValues.filter(v => v !== value));
            }
        }
    };

    const handleQuizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        quizForm.post('/projects/quiz', {
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

    const calculateCost = () => {
        calculatorForm.post('/projects/calculate-cost', {
            onSuccess: (page: any) => {
                setCostEstimate(page.props.costEstimate);
                setToast({
                    isVisible: true,
                    message: 'تم حساب التكلفة التقديرية بنجاح!',
                    type: 'success',
                });
            },
            onError: () => {
                setToast({
                    isVisible: true,
                    message: 'حدث خطأ أثناء حساب التكلفة. يرجى المحاولة مرة أخرى.',
                    type: 'error',
                });
            },
        });
    };

    const handleProjectSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(submissionForm.data).forEach(key => {
            if (key === 'images') {
                submissionForm.data.images.forEach((file, index) => {
                    formData.append(`images[${index}]`, file);
                });
            } else {
                formData.append(key, (submissionForm.data as any)[key]);
            }
        });

        submissionForm.post('/projects/submit', {
            forceFormData: true,
            onSuccess: () => {
                setActiveSection('quiz');
                submissionForm.reset();
                setToast({
                    isVisible: true,
                    message: 'تم إرسال مشروعك بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.',
                    type: 'success',
                });
            },
            onError: () => {
                setToast({
                    isVisible: true,
                    message: 'حدث خطأ أثناء إرسال المشروع. يرجى المحاولة مرة أخرى.',
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
                                    لست متأكدًا مما إذا كان أسلوبك وهميًا أم فخمًا أم عصريًا؟ تساعدك اختباراتنا على اكتشاف أسلوبك الفريد في التصميم. بمجرد حصولك على نتائجك الشخصية، سيساعدك فريقنا الموهوب من المصممين في تصميم منزل تحب العيش فيه.
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
                                            اختبر ذوقك الآن
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('calculator')}
                                            className={`px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${activeSection === 'calculator'
                                                ? 'bg-primary-yellow text-gray-900 shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            احسب التكلفة
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('upload')}
                                            className={`px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${activeSection === 'upload'
                                                ? 'bg-primary-yellow text-gray-900 shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            ارفع صور مساحتك
                                        </button>
                                    </div>
                                </div>

                                {activeSection === 'quiz' && (
                                    <section className="py-20 bg-gray-50">
                                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="bg-white rounded-xl shadow-lg p-8">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">اختبر ذوقك</h2>
                                                    <SecondaryButton onClick={() => setActiveSection('quiz')}>
                                                        إغلاق الاختبار
                                                    </SecondaryButton>
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
                                                                    {Object.entries(spaceTypes || {}).map(([key, value]) => (
                                                                        <label key={key} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="ml-3 h-4 w-4 text-primary-yellow"
                                                                                checked={quizForm.data.space_types.includes(key)}
                                                                                onChange={(e) => handleCheckboxChange('quiz', 'space_types', key, e.target.checked)}
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
                                                                                onChange={(e) => handleCheckboxChange('quiz', 'product_needs', key, e.target.checked)}
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
                                                                                onChange={(e) => handleCheckboxChange('quiz', 'preferred_styles', key, e.target.checked)}
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
                                                                <h3 className="text-xl font-semibold mb-6">معلومات التواصل (اختيارية)</h3>
                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="الاسم"
                                                                        className="w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.name}
                                                                        onChange={(e) => quizForm.setData('name', e.target.value)}
                                                                    />
                                                                    <input
                                                                        type="email"
                                                                        placeholder="البريد الإلكتروني"
                                                                        className="w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.email}
                                                                        onChange={(e) => quizForm.setData('email', e.target.value)}
                                                                    />
                                                                    <input
                                                                        type="tel"
                                                                        placeholder="رقم الهاتف"
                                                                        className="w-full p-3 border rounded-lg"
                                                                        value={quizForm.data.phone}
                                                                        onChange={(e) => quizForm.setData('phone', e.target.value)}
                                                                    />
                                                                </div>
                                                                <textarea
                                                                    placeholder="ملاحظات إضافية"
                                                                    rows={4}
                                                                    className="mt-4 w-full p-3 border rounded-lg"
                                                                    value={quizForm.data.additional_notes}
                                                                    onChange={(e) => quizForm.setData('additional_notes', e.target.value)}
                                                                />
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
                                                                <PrimaryButton
                                                                    type="button"
                                                                    onClick={() => setQuizStep(quizStep + 1)}
                                                                    disabled={
                                                                        (quizStep === 1 && quizForm.data.space_types.length === 0) ||
                                                                        (quizStep === 2 && quizForm.data.product_needs.length === 0) ||
                                                                        (quizStep === 3 && quizForm.data.preferred_styles.length === 0)
                                                                    }
                                                                    className="mr-auto"
                                                                >
                                                                    التالي
                                                                </PrimaryButton>
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
                                                            <PrimaryButton onClick={() => setActiveSection('calculator')}>
                                                                احسب التكلفة الآن
                                                            </PrimaryButton>
                                                            <SecondaryButton onClick={() => setActiveSection('quiz')}>
                                                                إغلاق النتائج
                                                            </SecondaryButton>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {activeSection === 'calculator' && (
                                    <section className="py-20 bg-gray-50">
                                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="bg-white rounded-xl shadow-lg p-8">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">احسب تكلفة مشروعك</h2>
                                                    <SecondaryButton onClick={() => setActiveSection('calculator')}>
                                                        إغلاق الحاسبة
                                                    </SecondaryButton>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">عدد الغرف أو المكاتب</label>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max="20"
                                                                className="w-full p-3 border rounded-lg"
                                                                value={calculatorForm.data.rooms_count}
                                                                onChange={(e) => calculatorForm.setData('rooms_count', parseInt(e.target.value))}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخدمة</label>
                                                            <div className="space-y-2">
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="radio"
                                                                        className="ml-2"
                                                                        checked={calculatorForm.data.service_type === 'custom'}
                                                                        onChange={() => calculatorForm.setData('service_type', 'custom')}
                                                                    />
                                                                    تفصيل حسب الطلب
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="radio"
                                                                        className="ml-2"
                                                                        checked={calculatorForm.data.service_type === 'installation'}
                                                                        onChange={() => calculatorForm.setData('service_type', 'installation')}
                                                                    />
                                                                    تركيب فقط
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخامة</label>
                                                            <div className="space-y-2">
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="radio"
                                                                        className="ml-2"
                                                                        checked={calculatorForm.data.material_type === 'economy'}
                                                                        onChange={() => calculatorForm.setData('material_type', 'economy')}
                                                                    />
                                                                    اقتصادية
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="radio"
                                                                        className="ml-2"
                                                                        checked={calculatorForm.data.material_type === 'premium'}
                                                                        onChange={() => calculatorForm.setData('material_type', 'premium')}
                                                                    />
                                                                    فاخرة
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">نوع المشروع</label>
                                                        <div className="space-y-2">
                                                            {Object.entries({
                                                                curtains: 'ستائر',
                                                                furniture: 'كنب',
                                                                cabinets: 'خزائن',
                                                                woodwork: 'خشبيات',
                                                                finishes: 'تشطيبات'
                                                            }).map(([key, value]) => (
                                                                <label key={key} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="ml-3 h-4 w-4 text-primary-yellow"
                                                                        checked={calculatorForm.data.project_type.includes(key)}
                                                                        onChange={(e) => handleCheckboxChange('calculator', 'project_type', key, e.target.checked)}
                                                                    />
                                                                    <span>{value}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-8 text-center">
                                                    <PrimaryButton
                                                        onClick={calculateCost}
                                                        disabled={calculatorForm.processing || calculatorForm.data.project_type.length === 0}
                                                    >
                                                        احسب التكلفة
                                                    </PrimaryButton>
                                                </div>

                                                {costEstimate && (
                                                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                                                        <h3 className="text-xl font-bold text-blue-800 mb-4">التقدير التقريبي</h3>
                                                        <div className="space-y-2 text-blue-700">
                                                            <p>إجمالي التكلفة المقدرة: <span className="font-bold">{costEstimate.total} {costEstimate.currency}</span></p>
                                                            <p>التكلفة لكل غرفة: <span className="font-bold">{costEstimate.per_room} {costEstimate.currency}</span></p>
                                                            <p className="text-sm text-blue-600 mt-4">{costEstimate.note}</p>
                                                        </div>
                                                        <div className="mt-6 flex gap-4 justify-center">
                                                            <PrimaryButton onClick={() => setActiveSection('upload')}>
                                                                اطلب عرض سعر دقيق
                                                            </PrimaryButton>
                                                            <SecondaryButton onClick={() => setActiveSection('calculator')}>
                                                                إغلاق التقدير
                                                            </SecondaryButton>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {activeSection === 'upload' && (
                                    <section className="py-20 bg-gray-50">
                                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="bg-white rounded-xl shadow-lg p-8">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">ارفع صور مساحتك</h2>
                                                    <SecondaryButton onClick={() => setActiveSection('upload')}>
                                                        إغلاق النموذج
                                                    </SecondaryButton>
                                                </div>

                                                <form onSubmit={handleProjectSubmit} className="space-y-6">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <input
                                                            type="text"
                                                            placeholder="الاسم *"
                                                            required
                                                            className="w-full p-3 border rounded-lg"
                                                            value={submissionForm.data.name}
                                                            onChange={(e) => submissionForm.setData('name', e.target.value)}
                                                        />
                                                        <input
                                                            type="email"
                                                            placeholder="البريد الإلكتروني *"
                                                            required
                                                            className="w-full p-3 border rounded-lg"
                                                            value={submissionForm.data.email}
                                                            onChange={(e) => submissionForm.setData('email', e.target.value)}
                                                        />
                                                        <input
                                                            type="tel"
                                                            placeholder="رقم الهاتف *"
                                                            required
                                                            className="w-full p-3 border rounded-lg"
                                                            value={submissionForm.data.phone}
                                                            onChange={(e) => submissionForm.setData('phone', e.target.value)}
                                                        />
                                                        <select
                                                            required
                                                            className="w-full p-3 border rounded-lg"
                                                            value={submissionForm.data.product_type}
                                                            onChange={(e) => submissionForm.setData('product_type', e.target.value)}
                                                        >
                                                            <option value="">اختر نوع المنتج *</option>
                                                            {Object.entries(productTypes || {}).map(([key, value]) => (
                                                                <option key={key} value={key}>{value}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <textarea
                                                        placeholder="وصف المشروع (مثلاً: أحتاج ستائر بلون بيج تغطي الجدار بالكامل) *"
                                                        rows={4}
                                                        required
                                                        className="w-full p-3 border rounded-lg"
                                                        value={submissionForm.data.description}
                                                        onChange={(e) => submissionForm.setData('description', e.target.value)}
                                                    />

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            صور المساحة (1-5 صور) *
                                                        </label>
                                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-yellow transition-colors">
                                                            <HiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                            <input
                                                                type="file"
                                                                multiple
                                                                accept="image/*"
                                                                className="hidden"
                                                                id="images"
                                                                onChange={(e) => {
                                                                    const files = Array.from(e.target.files || []);
                                                                    submissionForm.setData('images', files.slice(0, 5) as File[]);
                                                                }}
                                                            />
                                                            <label htmlFor="images" className="cursor-pointer">
                                                                <span className="text-primary-yellow font-medium">اختر الصور</span>
                                                                <p className="text-sm text-gray-500 mt-2">JPG, PNG, GIF حتى 5MB لكل صورة</p>
                                                            </label>
                                                            {submissionForm.data.images.length > 0 && (
                                                                <p className="mt-2 text-sm text-green-600">
                                                                    تم اختيار {submissionForm.data.images.length} صورة
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 justify-center">
                                                        <PrimaryButton
                                                            type="submit"
                                                            disabled={submissionForm.processing}
                                                        >
                                                            {submissionForm.processing ? 'جاري الإرسال...' : 'ارسل مشروعك'}
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <ProjectShowcase />
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