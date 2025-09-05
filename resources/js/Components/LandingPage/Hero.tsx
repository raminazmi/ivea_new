import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { FaWhatsapp, FaCouch, FaComments, FaTruck } from 'react-icons/fa';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    products_count?: number;
}

interface HeroCategoryItem {
    name: string;
    image: string;
    subtitle: string;
    bgColor: string;
    slug: string;
}

interface HeroProps {
    categories?: Category[];
}

const Hero: React.FC<HeroProps> = ({ categories: dbCategories = [] }) => {
    // Removed local slider state, using Swiper instead

    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const brandsRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const featuresContainerRef = useRef<HTMLDivElement>(null);
    const brandsContainerRef = useRef<HTMLDivElement>(null);
    const categoriesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroContentRef.current && heroImageRef.current) {
            gsap.fromTo(heroContentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(heroImageRef.current,
                { opacity: 0, scale: 0.9, x: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (featuresContainerRef.current) {
            gsap.fromTo(featuresContainerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: featuresRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (brandsContainerRef.current) {
            gsap.fromTo(brandsContainerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.7,
                    scrollTrigger: {
                        trigger: brandsRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (categoriesContainerRef.current) {
            gsap.fromTo(categoriesContainerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.9,
                    scrollTrigger: {
                        trigger: categoriesRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const heroImages = [
        {
            src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            alt: 'إيفيا # تشاركك_ذوقك'
        },
        {
            src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            alt: 'تفاصيل تلامس حواسك'
        },
        {
            src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            alt: 'عروض اليوم الوطني بدأت'
        }
    ];

    const features = [
        {
            icon: <FaCouch className="text-primary-yellow text-lg sm:text-xl md:text-2xl" />,
            title: 'راحة استثنائية',
            description: 'مكان جلوس مربح',
            containerBg: 'bg-white',
            borderColor: 'border-0'
        },
        {
            icon: <FaTruck className="text-primary-yellow text-lg sm:text-xl md:text-2xl" />,
            title: 'شحن مجاني',
            description: 'توصيل بدون تكلفة',
            containerBg: 'bg-white',
            borderColor: 'border-0'
        },
        {
            icon: <FaComments className="text-primary-yellow text-lg sm:text-xl md:text-2xl" />,
            title: 'استشارات مجانية',
            description: 'استشارات مجانية',
            containerBg: 'bg-white',
            borderColor: 'border-0'
        }
    ];

    const brands = [
        // { name: '3M', image: '/images/3m.png' },
        // { name: 'ARMANI/CASA', image: '/images/armani.png' },
        // { name: 'York Weave', image: '/images/york.png' },
        // { name: 'SOMFY', image: '/images/somfy.png' },
        // { name: 'MISSONI HOME', image: '/images/missoni.png' },
        { name: 'Classen', image: '/images/brans/classen.png' },
        { name: 'Kronospan', image: '/images/brans/kronospan.png' },
        { name: 'Guangdong A-OK', image: '/images/brans/guangdong_a_ok_technology_grand_development_co_ltd_logo.png' },
        { name: 'مجموعة القثمي', image: '/images/brans/مجموعة-القثمي-للأقمشة.png' },
    ];

    const getCategoryLink = (categorySlug: string) => {
        const mainCategory = dbCategories.find((cat: Category) => cat.slug === categorySlug && !cat.parent_id);

        if (mainCategory) {
            const subcategoryIds = dbCategories
                .filter((cat: Category) => cat.parent_id === mainCategory.id)
                .map((cat: Category) => cat.id);

            if (subcategoryIds.length > 0) {
                const subcategoryParams = subcategoryIds.map((id: number, index: number) => `subcategory_ids[${index}]=${id}`).join('&');
                return `/products?main_category=${categorySlug}&${subcategoryParams}`;
            }
        }
        return `/products?main_category=${categorySlug}`;
    };

    const categories: HeroCategoryItem[] = [
        {
            name: 'ستــائر',
            image: '/images/curtain.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]',
            slug: 'curtains'
        },
        {
            name: 'كــنب',
            image: '/images/sofa.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]',
            slug: 'sofas'
        },
        {
            name: 'خــزائن',
            image: '/images/treasury.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]',
            slug: 'cabinets'
        },
        {
            name: 'خشبيات',
            image: '/images/door.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]',
            slug: 'wooden'
        }
    ];

    return (
        <section className="bg-white py-4 sm:py-6 md:py-8 lg:pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={heroRef}
                    data-section="hero"
                    className="flex flex-col lg:flex-row-reverse items-center gap-4 sm:gap-6 lg:gap-10 xl:gap-14"
                >
                    <div ref={heroImageRef} className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg w-full" style={{
                            aspectRatio: '1/1.2',
                            maxHeight: '340px',
                            minHeight: '220px'
                        }}>
                            <Swiper
                                slidesPerView={1}
                                loop
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true, el: '.hero-swiper-pagination' }}
                                navigation={{ nextEl: '.hero-swiper-next', prevEl: '.hero-swiper-prev' }}
                                modules={[Pagination, Autoplay, Navigation]}
                                className="w-full h-full"
                            >
                                {heroImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="absolute inset-0 w-full h-full transition-all duration-1500 ease-in-out opacity-100 scale-100 translate-x-0">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            
                                            {/* النص الذي يظهر على الصورة */}
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 text-center text-white shadow-lg border border-white/10">
                                                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold drop-shadow-lg">
                                                        {image.alt}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-[#0D1D25] p-1.5 sm:p-2 md:p-2 rounded-lg z-10">
                                <img
                                    src="/images/logo_white.png"
                                    alt="إيفيا"
                                    className="h-5 sm:h-6 md:h-8 w-auto object-contain"
                                />
                            </div>

                            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 flex gap-1.5 sm:gap-2 z-10">
                                <button
                                    className="hero-swiper-prev bg-white/90 hover:bg-white text-[#0D1D25] p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-500 hover:scale-110 hover:shadow-lg"
                                    title="السابق"
                                >
                                    <HiChevronRight className="text-base sm:text-lg md:text-xl" />
                                </button>
                                <button
                                    className="hero-swiper-next bg-white/90 hover:bg-white text-[#0D1D25] p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-500 hover:scale-110 hover:shadow-lg"
                                    title="التالي"
                                >
                                    <HiChevronLeft className="text-base sm:text-lg md:text-xl" />
                                </button>
                            </div>

                            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 flex gap-1.5 sm:gap-2 z-10 hero-swiper-pagination"></div>
                        </div>
                    </div>

                    <div ref={heroContentRef} className="w-full lg:w-1/2 text-center lg:text-right pr-0 lg:pr-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0D1D25] mb-2 md:mb-3 leading-tight">
                            الانسجام المثالي..
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#424242] mb-3 sm:mb-4 md:mb-6 font-medium">
                            راحة وأناقة في كل تفاصيل التصميم
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <Link
                                href="/products?tab=offers"
                                className="text-[#0D1D25] px-3 sm:px-4 md:px-5 py-1.5 md:py-2 rounded-full transition-all duration-500 hover:bg-opacity-90 text-xs sm:text-sm md:text-base font-medium w-full sm:w-auto text-center border border-[#0D1D25] hover:scale-105 hover:shadow-md hover:bg-[#0D1D25] hover:text-white block"
                            >
                                استكشف عروضنا
                            </Link>
                            <a
                                href="https://wa.me/966541444066?text=مرحباً، أود الحصول على استشارة مجانية"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-[#616161] font-medium transition-all duration-500 hover:scale-105"
                            >
                                <FaWhatsapp className="text-xl sm:text-2xl md:text-3xl text-white bg-[#4CAF50] hover:bg-[#3d8b40] rounded-full p-1 sm:p-1.5 md:p-2 transition-all duration-500 hover:scale-110" />
                                <span className="text-xs sm:text-sm md:text-base">للتواصل والإستشارات</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    ref={featuresRef}
                    data-section="features"
                    className="relative"
                >
                    <div ref={featuresContainerRef} className="relative mt-6 sm:mt-8 md:mt-12 lg:absolute lg:bottom-[-30px] lg:right-[5%] lg:w-[80%] xl:w-[75%] bg-white shadow rounded-xl md:rounded-full py-2 px-3 sm:px-4 md:px-6 flex flex-col md:flex-row items-center gap-3 sm:gap-4">
                        <div className='flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3 md:gap-4 w-full'>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`${feature.containerBg} ${feature.borderColor} rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 text-center transition-all duration-700 flex items-center gap-2 sm:gap-2.5 md:gap-3`}
                                >
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700`}>
                                        {feature.icon}
                                    </div>
                                    <div className='text-start'>
                                        <h4 className="font-bold text-[#212121] text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">{feature.title}</h4>
                                        <p className="text-xs sm:text-sm text-[#616161]">{feature.description}</p>
                                    </div>
                                    {index < features.length - 1 && (
                                        <div className='h-8 sm:h-10 w-[1px] bg-[#616161] ms-2 sm:ms-3 md:ms-4 hidden md:block'></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/products"
                            className="border border-[2px] border-black bg-white text-[#0D1D25] px-3 sm:px-4 md:px-6 py-1 md:py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm lg:text-base hover:bg-gray-50 transition-all duration-500 whitespace-nowrap mt-2 md:mt-0 hover:scale-105 hover:shadow-xl block text-center"
                        >
                            عرض المزيد
                        </Link>
                    </div>
                </div>

                <div
                    ref={brandsRef}
                    data-section="brands"
                    className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 mb-12 sm:mb-16 md:mb-20 lg:mb-24 -mx-4 sm:-mx-6 lg:-mx-16">
                    <div ref={brandsContainerRef} className="relative overflow-hidden">
                        <Swiper
                            slidesPerView={3}
                            breakpoints={{
                                200: { slidesPerView: 3},
                                640: { slidesPerView: 5 }
                            }}
                            spaceBetween={0}
                            loop={true}
                            freeMode={{
                                enabled: true,
                                momentum: false,
                                sticky: false,
                                minimumVelocity: 0.05
                            }}
                            speed={8000}
                            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
                            allowTouchMove={false}
                            modules={[Autoplay]}
                            className="px-4 sm:px-6 lg:px-8"
                        >
                            {[...brands, ...brands, ...brands].map((brand, index) => (
                                <SwiperSlide key={`brand-${index}`}>
                                    <div className="flex flex-col items-center opacity-70 transition-all duration-700">
                                        <div className="p-1.5 sm:p-2 md:p-1 transition-all duration-700">
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="h-8 sm:h-10 md:h-12 lg:h-24 w-auto max-w-[120px] object-contain"
                                                style={{
                                                    filter: 'grayscale(100%)',
                                                    opacity: 0.8,
                                                    maxHeight: '60px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div
                    ref={categoriesRef}
                    data-section="categories"
                    className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 sm:gap-8 lg:gap-6 px-2 sm:px-4 mt-32">
                    <div ref={categoriesContainerRef} className="contents">
                        {categories.map((category: HeroCategoryItem, index: number) => (
                            <Link
                                key={index}
                                href={getCategoryLink(category.slug)}
                                className="group relative overflow-visible rounded-xl sm:rounded-2xl transition-all duration-1000 cursor-pointer hover:scale-105 block"
                            >
                                <div className={`${category.bgColor} flex justify-between items-center gap-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 pb-2 transition-all duration-700 group-hover:shadow-xl`}>
                                    <div className="text-center w-28 sm:w-32 md:w-36 flex flex-col gap-2 sm:gap-3 w-fit text-center">
                                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#0D1D25] transition-all duration-700 group-hover:text-[#0D1D25]/80">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#616161] mt-1 bg-white rounded-full py-1.5 sm:py-2 px-3 sm:px-4 transition-all duration-700 group-hover:bg-gray-50 hover:bg-primary-yellow hover:text-white">
                                            {category.subtitle}
                                        </p>
                                    </div>
                                    <div className="relative -mt-14 sm:-mt-16 md:-mt-18 -mb-2 sm:-mb-3 -me-2 sm:-me-3 overflow-visible">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className={`h-[160px] sm:h-[180px] md:h-[200px] ${category.image == '/images/treasury.png' ? 'w-32 sm:w-36 md:w-48' :'w-28 sm:w-32 md:w-36' } object-contain transition-all duration-1000 group-hover:scale-110 transform -rotate-12 group-hover:rotate-1`}
                                            style={{ zIndex: 10 }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scrollBrands {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                
                .animate-scroll-brands {
                    animation: scrollBrands 40s linear infinite;
                }
                
                .animate-scroll-brands:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Hero;