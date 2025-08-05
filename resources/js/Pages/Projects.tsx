import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import SectionTitle from '@/Components/SectionTitle';
import ProjectShowcase from '@/Components/LandingPage/ProjectShowcase';
import ContactUs from '@/Components/LandingPage/ContactUs';
import { Link } from '@inertiajs/react';

const Projects: React.FC = () => {
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
                        </div>
                    </div>
                </div>
            </section>

            <ProjectShowcase />

            <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-primary-yellow mb-2">150+</div>
                            <div className="text-lg text-gray-700">مشروع منجز</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-primary-yellow mb-2">50+</div>
                            <div className="text-lg text-gray-700">عميل سعيد</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-primary-yellow mb-2">10+</div>
                            <div className="text-lg text-gray-700">سنوات خبرة</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-primary-yellow mb-2">100%</div>
                            <div className="text-lg text-gray-700">رضا العملاء</div>
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
            <ContactUs />
        </AppLayout>
    );
};

export default Projects; 