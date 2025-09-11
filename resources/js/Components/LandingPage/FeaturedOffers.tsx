import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Offer {
    id: number;
    title: string;
    discount_percentage: number;
    category_slug: string;
    category_name: string;
}

interface OffersText {
    key: string;
    title: string;
    description: string;
}

interface FeaturedOffersProps {
    offers?: Offer[];
    offersTexts?: OffersText[];
}

const FeaturedOffers: React.FC<FeaturedOffersProps> = ({ offers = [], offersTexts = [] }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const getOffersText = (key: string, type: 'title' | 'description' = 'title') => {
        const text = offersTexts.find(t => t.key === key);
        if (!text) return '';
        return text[type] || '';
    };

    const getCategoryImage = (categorySlug: string) => {
        const categoryImages = {
            curtains: '/images/curtain.png',
            sofas: '/images/sofa.png',
            cabinets: '/images/treasury_new.png',
            wooden: '/images/door.png'
        };
        return categoryImages[categorySlug as keyof typeof categoryImages] || '/images/default-offer.png';
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

    // إخفاء السكشن بالكامل إذا لم توجد عروض
    if (offers.length === 0) {
        return null;
    }

    return (
        <section
            ref={sectionRef}
            className="py-6 md:py-8 lg:py-12 px-2 sm:px-4 lg:px-20 bg-peach1"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    <div ref={contentRef} className="text-center lg:text-start w-full lg:w-1/2 mb-6 lg:mb-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D1D25] mb-2 md:mb-3">
                            {getOffersText('main_title', 'title') || 'عــــرض اليوم الوطـنـي'}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-[#424242] max-w-2xl mx-auto lg:mx-0">
                            {getOffersText('main_title', 'description') || 'اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)'}
                        </p>
                        <div className='mt-4 flex justify-center lg:justify-start'>
                            <Link
                                href="/products"
                                className="bg-primary-yellow text-black border border-black py-1.5 px-4 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg"
                            >
                                افتح المتجر
                            </Link>
                        </div>
                    </div>

                    <div ref={cardsRef} className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {offers.slice(0, 2).map((offer, index) => (
                            <Link
                                key={offer.id}
                                href={`/products?main_category=${offer.category_slug}`}
                                className={`relative rounded-2xl overflow-hidden shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl cursor-pointer ${
                                    index === 0 ? 'bg-gray-50' : 'bg-peach'
                                }`}
                            >
                                <div className='flex flex-col justify-between gap-6 py-4 ps-6 pe-2'>
                                    <div className='w-10 h-10 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110'>
                                        <span className='text-base font-bold'>{offer.discount_percentage}%</span>
                                    </div>
                                    <div><p className='font-bold text-base'>{offer.category_name}</p></div>
                                </div>
                                <div className="flex-grow flex items-center justify-center">
                                    <img
                                        src={getCategoryImage(offer.category_slug)}
                                        alt={offer.category_name}
                                        className="w-full object-contain transition-transform duration-1000 hover:scale-110 max-h-32 sm:max-h-40 md:max-h-48"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedOffers;