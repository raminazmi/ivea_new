import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PreparingForSummerData {
    id: number;
    title_ar: string;
    description_ar: string;
    button_text_ar: string;
    button_url: string;
    image_1_path?: string;
    image_1_alt?: string;
    image_1_url?: string;
    image_2_path?: string;
    image_2_alt?: string;
    image_2_url?: string;
    is_active: boolean;
}

interface PreparingForSummerProps {
    data?: PreparingForSummerData;
}

const PreparingForSummer: React.FC<PreparingForSummerProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // إذا لم تكن هناك بيانات، لا تعرض السكشن
    if (!data || !data.is_active) {
        return null;
    }

    return (
        <section
            ref={sectionRef}
            className="py-6 md:py-10 lg:py-16 px-2 sm:px-4 lg:px-20 relative overflow-hidden"
        >
            <div className="absolute top-1/2 left-0 w-full h-[80%] -translate-y-1/2 -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    <div ref={contentRef} className="w-full md:w-[45%] text-center md:text-right">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-black mb-2 md:mb-4 leading-tight">
                            {data.title_ar}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-[#424242] mb-4 md:mb-6 max-w-xl mx-auto md:mx-0">
                            {data.description_ar}
                        </p>
                        <Link
                            href={data.button_url}
                            className="inline-block bg-primary-yellow text-black border border-black border-[1px] py-1 px-4 md:px-6 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg"
                        >
                            {data.button_text_ar}
                        </Link>
                    </div>
                    <div ref={imagesRef} className="w-full md:w-[45%] relative mt-6 md:mt-0">
                        <div className="absolute left-0 md:left-2 bottom-[-16px] md:bottom-0 w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-primary-yellow -z-10 rounded-2xl transition-all duration-1000 hover:scale-110"></div>
                        <div className="gap-3 md:gap-4 relative z-10 flex justify-center">
                            {data.image_1_path && (
                                <Link
                                    href={data.image_1_url || "/products"}
                                    className="w-[120px] md:w-[140px] relative group overflow-hidden bg-white rounded-2xl shadow-lg h-32 md:h-48 flex items-center justify-center md:mt-6 transition-all duration-1000 hover:scale-105 hover:shadow-xl block cursor-pointer flex-shrink-0"
                                >
                                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                                        <img
                                            src={`/storage/${data.image_1_path}`}
                                            alt={data.image_1_alt || "صورة صيفية"}
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </Link>
                            )}
                            {data.image_2_path && (
                                <Link
                                    href={data.image_2_url || "/products"}
                                    className="w-[140px] md:w-[280px] relative group overflow-hidden bg-white rounded-2xl shadow-lg h-32 md:h-48 flex items-center justify-center transition-all duration-1000 hover:scale-105 hover:shadow-xl block cursor-pointer flex-shrink-0"
                                >
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        <img
                                            src={`/storage/${data.image_2_path}`}
                                            alt={data.image_2_alt || "صورة صيفية"}
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreparingForSummer;