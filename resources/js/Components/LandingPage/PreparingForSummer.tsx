import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PreparingForSummer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

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

        // Images animation
        if (imagesRef.current) {
            gsap.fromTo(imagesRef.current,
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
            className="py-6 md:py-10 lg:py-16 px-2 sm:px-4 lg:px-20 relative overflow-hidden"
        >
            {/* Yellow background shape - Responsive */}
            <div className="absolute top-1/2 left-0 w-full h-[80%] -translate-y-1/2 -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    {/* Text Content - Right Side */}
                    <div ref={contentRef} className="w-full md:w-[45%] text-center md:text-right">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-black mb-2 md:mb-4 leading-tight">
                            استعد لفصل الصيف
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-[#424242] mb-4 md:mb-6 max-w-xl mx-auto md:mx-0">
                            استمتع بالدفء مع أحبائك على الأرائك الفاخرة لدينا، وانعم باحتضان الأقمشة الجاهزة لفصل الشتاء. استمتع بأجواء الموسم مع أثاث غرفة معيشة أنيق وجذاب.
                        </p>
                        <Link
                            href="#"
                            className="inline-block bg-primary-yellow text-black border border-black border-[1px] py-1 px-4 md:px-6 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg"
                        >
                            تسوق الآن
                        </Link>
                    </div>
                    {/* Images Grid - Left Side */}
                    <div ref={imagesRef} className="w-full md:w-[45%] relative mt-6 md:mt-0">
                        {/* Yellow background shape - Maintained size on desktop */}
                        <div className="absolute left-0 md:left-2 bottom-0 w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-primary-yellow -z-10 rounded-2xl transition-all duration-1000 hover:scale-110"></div>

                        <div className="gap-3 md:gap-4 relative z-10 flex justify-center">
                            {/* First Image - Maintained design */}
                            <div className="w-1/2 max-w-[100px] md:max-w-[140px] relative group overflow-hidden bg-white rounded-2xl shadow-lg h-32 md:h-48 flex items-center justify-center md:mt-6 transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                                <div className="relative z-10 flex items-center justify-center">
                                    <img
                                        src="/images/shadow1.png"
                                        alt="أثاث صيفي"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Second Image - Maintained design */}
                            <div className="w-1/2 relative group overflow-hidden bg-white rounded-2xl shadow-lg h-32 md:h-48 flex items-center justify-center transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                                <div className="relative z-10 w-full h-full flex items-center justify-center">
                                    <img
                                        src="/images/shadow2.png"
                                        alt="أثاث صيفي"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreparingForSummer;