import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { FaWhatsapp, FaCouch, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState({
        hero: false,
        features: false,
        brands: false,
        categories: false
    });
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const brandsRef = useRef(null);
    const categoriesRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroImageRef = useRef(null);
    const featuresContainerRef = useRef(null);
    const brandsContainerRef = useRef(null);
    const categoriesContainerRef = useRef(null);
    useEffect(() => {
        // Hero section animation
        if (heroContentRef.current && heroImageRef.current) {
            gsap.fromTo(heroContentRef.current, { opacity: 0, y: 50 }, {
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
            });
            gsap.fromTo(heroImageRef.current, { opacity: 0, scale: 0.9, x: 30 }, {
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
            });
        }
        // Features section animation
        if (featuresContainerRef.current) {
            gsap.fromTo(featuresContainerRef.current, { opacity: 0, y: 30 }, {
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
            });
        }
        // Brands section animation
        if (brandsContainerRef.current) {
            gsap.fromTo(brandsContainerRef.current, { opacity: 0, y: 30 }, {
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
            });
        }
        // Categories section animation
        if (categoriesContainerRef.current) {
            gsap.fromTo(categoriesContainerRef.current, { opacity: 0, y: 30 }, {
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
            });
        }
        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    const heroImages = [
        {
            src: '/images/hero_ivea.png',
            alt: 'إيفيا - التصميم العصري'
        },
        {
            src: '/images/building1.png',
            alt: 'إيفيا - المباني الحديثة'
        },
        {
            src: '/images/building2.png',
            alt: 'إيفيا - التصميم الفاخر'
        },
        {
            src: '/images/building3.png',
            alt: 'إيفيا - اللمسات النهائية'
        },
        {
            src: '/images/building4.png',
            alt: 'إيفيا - التفاصيل المميزة'
        }
    ];
    const features = [
        {
            icon: _jsx(FaCouch, { className: "text-primary-yellow text-lg sm:text-xl md:text-2xl" }),
            title: 'راحة استثنائية',
            description: 'مكان جلوس مربح',
            containerBg: 'bg-white',
            borderColor: 'border-0'
        },
        {
            icon: _jsx(FaTruck, { className: "text-primary-yellow text-lg sm:text-xl md:text-2xl" }),
            title: 'شحن مجاني',
            description: 'توصيل بدون تكلفة',
            containerBg: 'bg-white',
            borderColor: 'border-0'
        },
        {
            icon: _jsx(FaShieldAlt, { className: "text-primary-yellow text-lg sm:text-xl md:text-2xl" }),
            title: 'مدفوعات آمنة',
            description: 'مدفوعات آمنة',
            containerBg: 'bg-white',
            borderColor: 'border-0'
        }
    ];
    const brands = [
        { name: '3M', image: '/images/3m.png' },
        { name: 'ARMANI/CASA', image: '/images/armani.png' },
        { name: 'York Weave', image: '/images/york.png' },
        { name: 'IKEA', image: '/images/ikea.png' },
        { name: 'SOMFY', image: '/images/somfy.png' },
        { name: 'MISSONI HOME', image: '/images/missoni.png' },
    ];
    const categories = [
        {
            name: 'ستــائر',
            image: '/images/curtain.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]'
        },
        {
            name: 'خشبيات',
            image: '/images/door.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]'
        },
        {
            name: 'كــنب',
            image: '/images/sofa.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]'
        },
        {
            name: 'خــزائن',
            image: '/images/treasury.png',
            subtitle: 'عرض المزيد',
            bgColor: 'bg-[#F5F5F5]'
        }
    ];
    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };
    return (_jsxs("section", { className: "bg-white py-6 sm:py-8 md:py-12 lg:py-16", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { ref: heroRef, "data-section": "hero", className: "flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16", children: [_jsx("div", { ref: heroImageRef, className: "w-full lg:w-1/2 relative", children: _jsxs("div", { className: "relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg w-full", style: {
                                        aspectRatio: '1/1.2',
                                        maxHeight: '400px',
                                        minHeight: '300px'
                                    }, children: [_jsx("div", { className: "relative w-full h-full overflow-hidden", children: heroImages.map((image, index) => (_jsxs("div", { className: `absolute inset-0 w-full h-full transition-all duration-1500 ease-in-out ${index === currentSlide
                                                    ? 'opacity-100 scale-100 translate-x-0'
                                                    : 'opacity-0 scale-95 translate-x-4'}`, children: [_jsx("img", { src: image.src, alt: image.alt, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" })] }, index))) }), _jsx("div", { className: "absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-[#0D1D25] p-1.5 sm:p-2 md:p-2 rounded-lg z-10", children: _jsx("img", { src: "/images/logo_white.png", alt: "\u0625\u064A\u0641\u064A\u0627", className: "h-5 sm:h-6 md:h-8 w-auto object-contain" }) }), _jsxs("div", { className: "absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 flex gap-1.5 sm:gap-2 z-10", children: [_jsx("button", { onClick: prevSlide, className: "bg-white/90 hover:bg-white text-[#0D1D25] p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-500 hover:scale-110 hover:shadow-lg", title: "\u0627\u0644\u0633\u0627\u0628\u0642", children: _jsx(HiChevronRight, { className: "text-base sm:text-lg md:text-xl" }) }), _jsx("button", { onClick: nextSlide, className: "bg-white/90 hover:bg-white text-[#0D1D25] p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-500 hover:scale-110 hover:shadow-lg", title: "\u0627\u0644\u062A\u0627\u0644\u064A", children: _jsx(HiChevronLeft, { className: "text-base sm:text-lg md:text-xl" }) })] }), _jsx("div", { className: "absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 flex gap-1.5 sm:gap-2 z-10", children: heroImages.map((_, index) => (_jsx("button", { onClick: () => goToSlide(index), className: `w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-500 ${index === currentSlide
                                                    ? 'bg-white scale-125'
                                                    : 'bg-white/50 hover:bg-white/75'}`, title: `انتقل إلى الصورة ${index + 1}` }, index))) })] }) }), _jsxs("div", { ref: heroContentRef, className: "w-full lg:w-1/2 text-center lg:text-right pr-0 lg:pr-4", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0D1D25] mb-3 md:mb-4 leading-tight", children: "\u0627\u0644\u0627\u0646\u0633\u062C\u0627\u0645 \u0627\u0644\u0645\u062B\u0627\u0644\u064A.." }), _jsx("p", { className: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#424242] mb-4 sm:mb-6 md:mb-8 font-medium", children: "\u0631\u0627\u062D\u0629 \u0648\u0623\u0646\u0627\u0642\u0629 \u0641\u064A \u0643\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8", children: [_jsx("span", { className: "text-[#0D1D25] px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-500 hover:bg-opacity-90 text-sm sm:text-base md:text-lg font-medium w-full sm:w-auto text-center border border-[#0D1D25] hover:scale-105 hover:shadow-md", children: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0639\u0631\u0648\u0636\u0646\u0627" }), _jsxs(Link, { href: "#", className: "flex items-center justify-center gap-2 text-[#616161] font-medium transition-all duration-500 hover:scale-105", children: [_jsx(FaWhatsapp, { className: "text-2xl sm:text-3xl md:text-4xl text-white bg-[#4CAF50] hover:bg-[#3d8b40] rounded-full p-1 sm:p-1.5 md:p-2 transition-all duration-500 hover:scale-110" }), _jsx("span", { className: "text-xs sm:text-sm md:text-base", children: "\u0644\u0644\u0625\u0633\u062A\u0634\u0627\u0631\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629" })] })] })] })] }), _jsx("div", { ref: featuresRef, "data-section": "features", className: "relative", children: _jsxs("div", { ref: featuresContainerRef, className: "relative mt-6 sm:mt-8 md:mt-12 lg:absolute lg:bottom-[-30px] lg:right-[5%] lg:w-[80%] xl:w-[70%] bg-white shadow rounded-xl md:rounded-full py-2 px-3 sm:px-4 md:px-6 flex flex-col md:flex-row items-center gap-3 sm:gap-4", children: [_jsx("div", { className: 'flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3 md:gap-4 w-full', children: features.map((feature, index) => (_jsxs("div", { className: `${feature.containerBg} ${feature.borderColor} rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 text-center transition-all duration-700 flex items-center gap-2 sm:gap-2.5 md:gap-3`, children: [_jsx("div", { className: `w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700`, children: feature.icon }), _jsxs("div", { className: 'text-start', children: [_jsx("h4", { className: "font-bold text-[#212121] text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1", children: feature.title }), _jsx("p", { className: "text-xs sm:text-sm text-[#616161]", children: feature.description })] }), index < features.length - 1 && (_jsx("div", { className: 'h-8 sm:h-10 w-[1px] bg-[#616161] ms-2 sm:ms-3 md:ms-4 hidden md:block' }))] }, index))) }), _jsx("button", { className: "border border-[2px] border-black bg-white text-[#0D1D25] px-3 sm:px-4 md:px-6 py-1 md:py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm lg:text-base hover:bg-gray-50 transition-all duration-500 whitespace-nowrap mt-2 md:mt-0 hover:scale-105 hover:shadow-xl", children: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F" })] }) }), _jsx("div", { ref: brandsRef, "data-section": "brands", className: "mt-16 sm:mt-20 md:mt-24 lg:mt-32 mb-12 sm:mb-16 md:mb-20 lg:mb-24 -mx-4 sm:-mx-6 lg:-mx-8", children: _jsx("div", { ref: brandsContainerRef, className: "relative overflow-hidden", children: _jsx("div", { className: "flex animate-scroll-brands", children: _jsx("div", { className: "flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8", children: brands.map((brand, index) => (_jsx("div", { className: "flex flex-col items-center opacity-70 transition-all duration-700", children: _jsxs("div", { className: "p-1.5 sm:p-2 md:p-1 transition-all duration-700", children: ["                                            ", _jsx("img", { src: brand.image, alt: brand.name, className: "h-4 sm:h-5 md:h-6 lg:h-8 min-w-[100px] object-contain", style: {
                                                        filter: 'grayscale(100%)',
                                                        opacity: 0.8
                                                    } })] }) }, `first-${index}`))) }) }) }) }), _jsx("div", { ref: categoriesRef, "data-section": "categories", className: "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 px-2 sm:px-4 mt-32", children: _jsx("div", { ref: categoriesContainerRef, className: "contents", children: categories.map((category, index) => (_jsx("div", { className: "group relative overflow-visible rounded-xl sm:rounded-2xl transition-all duration-1000 cursor-pointer hover:scale-105", children: _jsxs("div", { className: `${category.bgColor} flex justify-between items-center gap-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 pb-2 transition-all duration-700 group-hover:shadow-xl`, children: [_jsxs("div", { className: "text-center w-28 sm:w-32 md:w-36 flex flex-col gap-2 sm:gap-3 w-fit text-center", children: [_jsx("h3", { className: "font-bold text-sm sm:text-base md:text-lg text-[#0D1D25] transition-all duration-700 group-hover:text-[#0D1D25]/80", children: category.name }), _jsx("p", { className: "text-xs sm:text-sm text-[#616161] mt-1 bg-white rounded-full py-1.5 sm:py-2 px-3 sm:px-4 transition-all duration-700 group-hover:bg-gray-50", children: category.subtitle })] }), _jsx("div", { className: "relative -mt-14 sm:-mt-16 md:-mt-18 -mb-2 sm:-mb-3 -me-2 sm:-me-3 overflow-visible", children: _jsx("img", { src: category.image, alt: category.name, className: "w-28 sm:w-32 md:w-36 h-[160px] sm:h-[180px] md:h-[200px] object-contain transition-all duration-1000 group-hover:scale-110 transform -rotate-12 group-hover:rotate-1", style: { zIndex: 10 } }) })] }) }, index))) }) })] }), _jsx("style", { children: `
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
            ` })] }));
};
export default Hero;
