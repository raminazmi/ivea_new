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
            className="py-12 md:py-16 bg-peach1"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* العنوان والوصف */}
                    <div ref={contentRef} className="text-center lg:text-start w-full lg:w-1/2 mb-8 lg:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0D1D25] mb-3 md:mb-4">
                            عــــرض اليوم
                        </h2>
                        <p className="text-base md:text-lg text-[#424242] max-w-2xl mx-auto lg:mx-0">
                            اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)
                        </p>
                        <div className='mt-6 flex justify-center lg:justify-start'>
                            <Link
                                href="#"
                                className="bg-primary-yellow text-black border border-black border-[1px] py-2 px-6 rounded-full text-base md:text-lg font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg"
                            >
                                افتح المتجر
                            </Link>
                        </div>
                    </div>

                    {/* بطاقات العروض */}
                    <div ref={cardsRef} className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="relative rounded-3xl overflow-hidden bg-light-blue shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className='flex flex-col justify-between gap-10 py-6 ps-10 pe-2'>
                                <div className='w-12 h-12 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                    <span className='tex-xl font-bold'>15%</span>
                                </div>
                                <div><p className='font-bold text-xl'>خـــزائن</p></div>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src="/images/treasury.png"
                                    alt="خزانة"
                                    className="w-full object-contain transition-transform duration-1000 hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden bg-peach shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className='flex flex-col justify-between gap-10 py-6 ps-10 pe-2'>
                                <div className='w-12 h-12 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                    <span className='tex-xl font-bold'>30%</span>
                                </div>
                                <div><p className='font-bold text-xl'>ستـــائر</p></div>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src="/images/curtain.png"
                                    alt="ستارة"
                                    className="w-full object-contain transition-transform duration-1000 hover:scale-110"
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