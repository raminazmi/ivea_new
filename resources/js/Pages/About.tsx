import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import SectionTitle from '@/Components/SectionTitle';
import ContactUs from '@/Components/LandingPage/ContactUs';

const About: React.FC = () => {
    return (
        <AppLayout>
            <Head title="من نحن" />

            <CoverSection
                imageUrl="/images/who_cover.png"
                title="في إيفيا فنشتر، الجمال يبدأ من التفاصيل."
                socialLinks={{
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                }}
            />
            <section className="py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
                        <div className="flex justify-end">
                            <div className="relative">
                                <img
                                    src="/images/curtain1.png"
                                    alt="ستائر أنيقة"
                                    className="w-full max-w-sm md:max-w-md max-h-80 md:max-h-96 rounded-lg shadow-lg"
                                />
                            </div>
                        </div>

                        <div className="text-start col-span-2 mt-8 lg:mt-10">
                            <SectionTitle
                                text="من نحن:"
                                size="3xl"
                                align="start"
                            />
                            <div className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 leading-relaxed space-y-3 md:space-y-4">
                                <p>
                                    نحن فريق متخصص في تصميم وتنفيذ الحلول الداخلية عالية الجودة،
                                    نقدم مجموعة متنوعة من الستائر والأثاث والديكورات الخشبية بأعلى معايير الجودة.
                                </p>
                                <p>
                                    نركز على التفاصيل لتحويل المساحات إلى تصاميم فنية تعكس ذوق العميل،
                                    ونلتزم بالاحترافية من التصميم إلى التركيب.
                                </p>
                                <p>
                                    نسعى لخلق بيئات داخلية تجمع بين الجمال والوظائف العملية،
                                    لتوفير تجربة فريدة لعملائنا الكرام.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10 md:py-12 lg:py-14 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        <div className="">
                            <div className="mt-6 md:mt-8 flex justify-center">
                                <img
                                    src="/images/pepole.png"
                                    alt="فريق العمل"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="text-right mt-6 md:mt-8">
                                <SectionTitle
                                    text="رسالتنا:"
                                    size="2xl"
                                    align="start"
                                />
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-3 md:mt-4">
                                    تقديم منتجات وخدمات مفصلة بأعلى معايير التصميم والتنفيذ،
                                    مع التركيز على جودة المواد المستخدمة والدقة في العمل.
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <div className="mt-6 md:mt-8 flex justify-center">
                                <img
                                    src="/images/chair.png"
                                    alt="أثاث أنيق"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="text-right mt-6 md:mt-8">
                                <SectionTitle
                                    text="رؤيتنا:"
                                    size="2xl"
                                    align="start"
                                />
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-3 md:mt-4">
                                    أن نكون الشريك الموثوق في تحويل المساحات إلى بيئات فريدة ومميزة،
                                    مع الحفاظ على أعلى معايير الجودة والابتكار في التصميم.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs />
        </AppLayout>
    );
};

export default About; 