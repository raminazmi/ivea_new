import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FeaturedOffers: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Content animation
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Cards animation
        if (cardsRef.current) {
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-6 md:py-8 lg:py-12 px-2 sm:px-4 lg:px-20 bg-peach1"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    {/* العنوان والوصف */}
                    <div ref={contentRef} className="text-center lg:text-start w-full lg:w-1/2 mb-6 lg:mb-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D1D25] mb-2 md:mb-3">
                            عــــرض اليوم
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-[#424242] max-w-2xl mx-auto lg:mx-0">
                            اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)
                        </p>
                        <div className='mt-4 flex justify-center lg:justify-start'>
                            <Link
                                href="#"
                                className="bg-primary-yellow text-black border border-black border-[1px] py-1.5 px-4 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg"
                            >
                                افتح المتجر
                            </Link>
                        </div>
                    </div>

                    {/* بطاقات العروض */}
                    <div ref={cardsRef} className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div className="relative rounded-2xl overflow-hidden bg-light-blue shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className='flex flex-col justify-between gap-6 py-4 ps-6 pe-2'>
                                <div className='w-10 h-10 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                    <span className='text-base font-bold'>15%</span>
                                </div>
                                <div><p className='font-bold text-base'>خـــزائن</p></div>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src="/images/treasury.png"
                                    alt="خزانة"
                                    className="w-full object-contain transition-transform duration-1000 hover:scale-110 max-h-32 sm:max-h-40 md:max-h-48"
                                />
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden bg-peach shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className='flex flex-col justify-between gap-6 py-4 ps-6 pe-2'>
                                <div className='w-10 h-10 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                    <span className='text-base font-bold'>30%</span>
                                </div>
                                <div><p className='font-bold text-base'>ستـــائر</p></div>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src="/images/curtain.png"
                                    alt="ستارة"
                                    className="w-full object-contain transition-transform duration-1000 hover:scale-110 max-h-32 sm:max-h-40 md:max-h-48"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedOffers;