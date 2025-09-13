import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NationalDayOfferData {
    id: number;
    title_ar: string;
    description_ar: string;
    button_text_ar: string;
    button_url: string;
    offer1_title: string;
    offer1_discount_percentage: number;
    offer1_category_slug: string;
    offer1_category_name: string;
    offer1_image_path?: string;
    offer1_link: string;
    offer2_title: string;
    offer2_discount_percentage: number;
    offer2_category_slug: string;
    offer2_category_name: string;
    offer2_image_path?: string;
    offer2_link: string;
    is_active: boolean;
}

interface NationalDayOfferProps {
    nationalDayOffer?: NationalDayOfferData;
}

const NationalDayOffer: React.FC<NationalDayOfferProps> = ({ nationalDayOffer }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const getOfferImage = (offer: any) => {
        if (offer.image_path) {
            return `/storage/${offer.image_path}`;
        }
                const categoryImages = {
            curtains: '/images/curtain.png',
            sofas: '/images/sofa.png',
            cabinets: '/images/treasury_new.png',
            wooden: '/images/door.png'
        };
        return categoryImages[offer.category_slug as keyof typeof categoryImages] || '/images/default-offer.png';
    };

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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    if (!nationalDayOffer || !nationalDayOffer.is_active) {
        return null;
    }

    const offer1 = {
        title: nationalDayOffer.offer1_title,
        discount_percentage: nationalDayOffer.offer1_discount_percentage,
        category_slug: nationalDayOffer.offer1_category_slug,
        category_name: nationalDayOffer.offer1_category_name,
        image_path: nationalDayOffer.offer1_image_path,
        link: nationalDayOffer.offer1_link
    };

    const offer2 = {
        title: nationalDayOffer.offer2_title,
        discount_percentage: nationalDayOffer.offer2_discount_percentage,
        category_slug: nationalDayOffer.offer2_category_slug,
        category_name: nationalDayOffer.offer2_category_name,
        image_path: nationalDayOffer.offer2_image_path,
        link: nationalDayOffer.offer2_link
    };

    return (
        <section
            ref={sectionRef}
            className="py-6 md:py-8 lg:py-12 px-2 sm:px-4 lg:px-20 bg-peach1"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    <div ref={contentRef} className="text-center lg:text-start w-full lg:w-1/2 mb-6 lg:mb-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D1D25] mb-2 md:mb-3">
                            {nationalDayOffer.title_ar}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-[#424242] max-w-2xl mx-auto lg:mx-0">
                            {nationalDayOffer.description_ar}
                        </p>
                        <div className='mt-4 flex justify-center lg:justify-start'>
                            <Link
                                href={nationalDayOffer.button_url}
                                className="bg-primary-yellow text-black border border-black py-1.5 px-4 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg"
                            >
                                {nationalDayOffer.button_text_ar}
                            </Link>
                        </div>
                    </div>

                    <div ref={cardsRef} className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {/* العرض الأول */}
                        <Link
                            href={offer1.link}
                            className="relative rounded-2xl overflow-hidden shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl cursor-pointer bg-gray-50"
                        >
                            <div className='flex flex-col justify-between gap-6 py-4 ps-6 pe-2'>
                                <div className='w-10 h-10 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                    <span className='text-base font-bold'>{offer1.discount_percentage}%</span>
                                </div>
                                <div><p className='font-bold text-base'>{offer1.category_name}</p></div>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src={getOfferImage(offer1)}
                                    alt={offer1.category_name}
                                    className="w-full object-contain transition-transform duration-1000 hover:scale-110 max-h-32 sm:max-h-40 md:max-h-48"
                                />
                            </div>
                        </Link>

                        {/* العرض الثاني */}
                        <Link
                            href={offer2.link}
                            className="relative rounded-2xl overflow-hidden shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl cursor-pointer bg-peach"
                        >
                            <div className='flex flex-col justify-between gap-6 py-4 ps-6 pe-2'>
                                <div className='w-10 h-10 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                    <span className='text-base font-bold'>{offer2.discount_percentage}%</span>
                                </div>
                                <div><p className='font-bold text-base'>{offer2.category_name}</p></div>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <img
                                    src={getOfferImage(offer2)}
                                    alt={offer2.category_name}
                                    className="w-full object-contain transition-transform duration-1000 hover:scale-110 max-h-32 sm:max-h-40 md:max-h-48"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NationalDayOffer;
