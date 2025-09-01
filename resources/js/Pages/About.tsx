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
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
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
                                    text="من نحن"
                                    size="3xl"
                                    align="start"
                                />
                                <div className="mt-2 md:mt-2 text-base md:text-lg text-gray-700 leading-relaxed space-y-3 md:space-y-4">
                                    <p>
                                        في إيفيا، نؤمن أن كل مساحة تستحق أن تُصمم بروح مختلفة ولمسة خاصة تترك أثرها. لسنا مجرد مزوّد حلول تصميم وتأثيث، بل شريكك الذي يرافقك في رحلة تحويل المساحات إلى أماكن تنبض بالحياة وتعكس جمالها.
                                    </p>
                                    <p>
                                        نقدّم مجموعة متكاملة من الستائر، الكنب، الخزائن، والخشبيات، مصممة بعناية وبدقة عالية، ومنفذة وفق أرقى معايير الجودة، لتجمع بين الأصالة والحداثة بروح مبتكرة.
                                    </p>
                                    <p>
                                        رحلتنا معك تبدأ من الاستماع لرغباتك وتطلعاتك، وتنتهي بتحويلها إلى واقع حيّ يعبر عنك، ليصبح منزلك، مكتبك أو أي مساحة انعكاسًا صادقًا لذوقك وشخصيتك.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="py-10 md:py-12 lg:py-14 px-2 sm:px-4 lg:px-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
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
                                    text="رسالتنا"
                                    size="2xl"
                                    align="start"
                                />
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">
                                    نصمم وننفّذ حلولاً داخلية توازن بين الجمال، الجودة، والوظائف العملية، لنمنح عملاءنا مساحات مريحة تُعبّر عنهم وتُلبي احتياجاتهم اليومية.
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
                                    text="رؤيتنا"
                                    size="2xl"
                                    align="start"
                                />
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">
                                    أن نصبح الوجهة الأولى في المملكة والمنطقة للتصميم والتأثيث، من خلال حلول مبتكرة ومستدامة تضع العميل في قلب الاهتمام، وتجمع بين الراحة والجمال بجودة تدوم طويلاً، لتجعل من إيفيا رمزًا للثقة، الإبداع، والنمو المستمر.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default About; 