import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const mobileGridRef = useRef<HTMLDivElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);

    const projects = [
        {
            id: 1,
            title: "اختر أسلــوب العمــل للمكــاتب",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building2.png"
        },
        {
            id: 2,
            title: "اختر أسلــوب العمــل للمنــازل",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building1.png"
        },
        {
            id: 3,
            title: "اختر أسلــوب العمــل للمحــلات",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building3.png"
        },
        {
            id: 4,
            title: "اختر أسلــوب العمــل للفنــادق",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building4.png"
        }
    ];

    useEffect(() => {
        // Mobile grid animation
        if (mobileGridRef.current) {
            gsap.fromTo(mobileGridRef.current,
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

        // Desktop grid animation
        if (desktopGridRef.current) {
            gsap.fromTo(desktopGridRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.2,
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
        <div
            ref={sectionRef}
            className="py-4 md:pt-4 md:pb-16 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Mobile View (1 column) */}
                <div ref={mobileGridRef} className="grid grid-cols-1 gap-16 md:hidden">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-visible rounded-3xl overflow-hidden bg-primary-gray shadow-lg flex flex-col transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className='flex flex-col justify-center gap-2 py-4 px-4'>
                                <h3 className="text-sm font-bold mb-2">{project.title}</h3>
                                <p className="mb-4 text-xs">{project.subtitle}</p>
                                <button className="bg-white text-[#0D1F40] px-3 py-1 rounded-full font-bold text-sm transition-all duration-700 w-fit hover:bg-gray-100 hover:scale-105">
                                    {project.buttonText}
                                </button>
                            </div>
                            <div className={`relative overflow-visible flex justify-center 
                                ${project.image === "/images/building4.png" ? '-mt-8' : '-mt-6 -mb-1'}`}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`${project.image === "/images/building4.png" ? 'w-32' : 'w-48'} h-32 object-contain transition-transform duration-1000 group-hover:scale-110`}
                                    style={{ zIndex: 10 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View (4 columns - Original Design) */}
                <div ref={desktopGridRef} className="hidden md:grid grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-visible rounded-3xl overflow-hidden bg-primary-gray shadow-lg flex transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className='flex flex-col justify-center gap-2 py-2 p-4'>
                                <h3 className="text-sm font-bold mb-2">{project.title}</h3>
                                <p className="mb-4 text-xs">{project.subtitle}</p>
                                <button className="bg-white text-[#0D1F40] px-2 py-1 rounded-full font-bold text-sm transition-all duration-700 w-fit hover:bg-gray-100 hover:scale-105">
                                    {project.buttonText}
                                </button>
                            </div>
                            <div className={`${project.image == "/images/building4.png" ? '-mt-14' : '-mt-10 -mb-2'} relative overflow-visible`}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`${project.image == "/images/building4.png" ? 'w-40' : 'w-80'} h-[180px] object-contain transition-transform duration-1000 group-hover:scale-110`}
                                    style={{ zIndex: 10 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectShowcase;