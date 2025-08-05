import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const PreparingForSummer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imagesRef = useRef(null);
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
        // Images animation
        if (imagesRef.current) {
            gsap.fromTo(imagesRef.current, { opacity: 0, y: 30 }, {
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
    return (_jsxs("section", { ref: sectionRef, className: "py-12 md:py-20 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-1/2 left-0 w-full h-[80%] -translate-y-1/2 -z-10" }), _jsx("div", { className: "container mx-auto px-4 relative", children: _jsxs("div", { className: "flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12", children: [_jsxs("div", { ref: contentRef, className: "w-full md:w-[45%] text-center md:text-right", children: [_jsx("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black mb-4 md:mb-6 leading-tight", children: "\u0627\u0633\u062A\u0639\u062F \u0644\u0641\u0635\u0644 \u0627\u0644\u0635\u064A\u0641" }), _jsx("p", { className: "text-base md:text-lg text-[#424242] mb-6 md:mb-8 max-w-xl mx-auto md:mx-0", children: "\u0627\u0633\u062A\u0645\u062A\u0639 \u0628\u0627\u0644\u062F\u0641\u0621 \u0645\u0639 \u0623\u062D\u0628\u0627\u0626\u0643 \u0639\u0644\u0649 \u0627\u0644\u0623\u0631\u0627\u0626\u0643 \u0627\u0644\u0641\u0627\u062E\u0631\u0629 \u0644\u062F\u064A\u0646\u0627\u060C \u0648\u0627\u0646\u0639\u0645 \u0628\u0627\u062D\u062A\u0636\u0627\u0646 \u0627\u0644\u0623\u0642\u0645\u0634\u0629 \u0627\u0644\u062C\u0627\u0647\u0632\u0629 \u0644\u0641\u0635\u0644 \u0627\u0644\u0634\u062A\u0627\u0621. \u0627\u0633\u062A\u0645\u062A\u0639 \u0628\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u0645\u0648\u0633\u0645 \u0645\u0639 \u0623\u062B\u0627\u062B \u063A\u0631\u0641\u0629 \u0645\u0639\u064A\u0634\u0629 \u0623\u0646\u064A\u0642 \u0648\u062C\u0630\u0627\u0628." }), _jsx(Link, { href: "#", className: "inline-block bg-primary-yellow text-black border border-black border-[1px] py-2 px-6 md:px-8 rounded-full text-base md:text-lg font-bold hover:bg-[#ffd54f] transition-all duration-700 hover:scale-105 hover:shadow-lg", children: "\u062A\u0633\u0648\u0642 \u0627\u0644\u0622\u0646" })] }), _jsxs("div", { ref: imagesRef, className: "w-full md:w-[45%] relative mt-8 md:mt-0", children: [_jsx("div", { className: "absolute left-0 md:left-2 bottom-0 w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-primary-yellow -z-10 rounded-2xl transition-all duration-1000 hover:scale-110" }), _jsxs("div", { className: "gap-4 md:gap-6 relative z-10 flex justify-center", children: [_jsx("div", { className: "w-1/2 max-w-[140px] md:max-w-[160px] relative group overflow-hidden bg-white rounded-2xl shadow-lg h-48 md:h-64 flex items-center justify-center md:mt-8 transition-all duration-1000 hover:scale-105 hover:shadow-xl", children: _jsx("div", { className: "relative z-10 flex items-center justify-center", children: _jsx("img", { src: "/images/shadow1.png", alt: "\u0623\u062B\u0627\u062B \u0635\u064A\u0641\u064A", className: "h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" }) }) }), _jsx("div", { className: "w-1/2 relative group overflow-hidden bg-white rounded-2xl shadow-lg h-48 md:h-64 flex items-center justify-center transition-all duration-1000 hover:scale-105 hover:shadow-xl", children: _jsx("div", { className: "relative z-10 w-full h-full flex items-center justify-center", children: _jsx("img", { src: "/images/shadow2.png", alt: "\u0623\u062B\u0627\u062B \u0635\u064A\u0641\u064A", className: "h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" }) }) })] })] })] }) })] }));
};
export default PreparingForSummer;
