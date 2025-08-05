import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
    const [isVisible, setIsVisible] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

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

        // Image animation
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
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
        <div ref={sectionRef} className="relative bg-primary-yellow py-2 lg:py-4 rounded-3xl m-4">
            <div
                className="relative p-4 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-14 flex flex-col lg:flex-row gap-10 lg:gap-12">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 md:h-2/3 bg-gradient-to-b from-[#FFD972]/0 to-[#FFD972]"></div>
                <div ref={contentRef} className='relative z-12 flex justify-center items-center gap-4'>
                    <img
                        src="/images/messanger.png"
                        alt="messanger"
                        className="w-24 h-20"
                    />
                    <div className="text-start flex flex-col justify-center items-start">
                        <h2 className="text-4xl font-bold text-[#0D1D25] mb-4">
                            نسعد بتواصلكم
                        </h2>
                        <p className="text-lg text-[#424242] max-w-2xl mx-auto">
                            نسعد بتواصلكم على كافة الاستفسارات أو الشكاوي والملاحظات
                        </p>
                        <div className='mt-6'>
                            <Link
                                href="/contact"
                                className="bg-white text-[#0D1F40] px-4 py-1 rounded-full font-bold text-lg transition-all duration-300 w-fit">
                                ابـدأالآن
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 lg:w-1/2 lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
                    <img
                        src="/images/sofa2.png"
                        alt="Hero image"
                        className="lg:w-full rounded-3xl object-cover" />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;


