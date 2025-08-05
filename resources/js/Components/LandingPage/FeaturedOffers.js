import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const FeaturedOffers = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cardsRef = useRef(null);
    useEffect(() => {
        // Content animation
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 50 }, {
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
            });
        }
        // Cards animation
        if (cardsRef.current) {
            gsap.fromTo(cardsRef.current, { opacity: 0, y: 30 }, {
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
            });
        }
        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    return (_jsx("section", { ref: sectionRef, className: "py-12 md:py-16 bg-peach1", children: _jsx("div", { className: "container mx-auto px-4 md:px-6 lg:px-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12", children: [_jsxs("div", { ref: contentRef, className: "text-center lg:text-start w-full lg:w-1/2 mb-8 lg:mb-0", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#0D1D25] mb-3 md:mb-4", children: "\u0639\u0640\u0640\u0640\u0640\u0631\u0636 \u0627\u0644\u064A\u0648\u0645" }), _jsx("p", { className: "text-base md:text-lg text-[#424242] max-w-2xl mx-auto lg:mx-0", children: "\u0627\u0637\u0644\u0639 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636\u0646\u0627 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u062C\u0645\u0639 \u0628\u064A\u0646 \u062E\u0635\u0648\u0645\u0627\u062A \u0643\u0628\u064A\u0631\u0629 \u0639\u0644\u0649 \u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0645\u0646\u0632\u0644. \u0627\u0644\u0639\u0631\u0648\u0636 \u0642\u062F \u062A\u062A\u063A\u064A\u0631 \u064A\u0648\u0645\u064A\u0627\u060C \u0641\u0644\u0627 \u062A\u0641\u0648\u062A \u0627\u0644\u0641\u0631\u0635\u0629 :)" }), _jsx("div", { className: 'mt-6 flex justify-center lg:justify-start', children: _jsx(Link, { href: "#", className: "bg-primary-yellow text-black border border-black border-[1px] py-2 px-6 rounded-full text-base md:text-lg font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg", children: "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u062A\u062C\u0631" }) })] }), _jsxs("div", { ref: cardsRef, className: "w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6", children: [_jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-light-blue shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl", children: [_jsxs("div", { className: 'flex flex-col justify-between gap-10 py-6 ps-10 pe-2', children: [_jsx("div", { className: 'w-12 h-12 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110', children: _jsx("span", { className: 'tex-xl font-bold', children: "15%" }) }), _jsx("div", { children: _jsx("p", { className: 'font-bold text-xl', children: "\u062E\u0640\u0640\u0640\u0632\u0627\u0626\u0646" }) })] }), _jsx("div", { className: "flex-grow flex items-center justify-center", children: _jsx("img", { src: "/images/treasury.png", alt: "\u062E\u0632\u0627\u0646\u0629", className: "w-full object-contain transition-transform duration-1000 hover:scale-110" }) })] }), _jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-peach shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl", children: [_jsxs("div", { className: 'flex flex-col justify-between gap-10 py-6 ps-10 pe-2', children: [_jsx("div", { className: 'w-12 h-12 bg-primary-yellow rounded-full flex justify-center items-center transition-all duration-700 hover:scale-110', children: _jsx("span", { className: 'tex-xl font-bold', children: "30%" }) }), _jsx("div", { children: _jsx("p", { className: 'font-bold text-xl', children: "\u0633\u062A\u0640\u0640\u0640\u0627\u0626\u0631" }) })] }), _jsx("div", { className: "flex-grow flex items-center justify-center", children: _jsx("img", { src: "/images/curtain.png", alt: "\u0633\u062A\u0627\u0631\u0629", className: "w-full object-contain transition-transform duration-1000 hover:scale-110" }) })] })] })] }) }) }));
};
export default FeaturedOffers;
