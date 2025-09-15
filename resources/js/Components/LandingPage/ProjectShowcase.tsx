import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { router } from '@inertiajs/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const mobileGridRef = useRef<HTMLDivElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const handleStartQuiz = () => {
        router.visit('/projects');
    };

    const projects = [
        {
            id: 1,
            title: "تصـميم وتنـفيذ المنازل السكنية",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building1.png"
        },
        {
            id: 2,
            title: "تصـميم وتنـفيذ المحلات التجارية",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building3.png"
        },
        {
            id: 3,
            title: "تصـميم وتنـفيذ المكاتب الإدارية",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building2.png"
        },
        {
            id: 4,
            title: "تصـميم وتنـفيذ الفنادق والمنتجعات",
            subtitle: "ابحث عن اسلوبك",
            buttonText: "إبدأ الإختيار",
            image: "/images/building4.png"
        }
    ];

    useEffect(() => {
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="py-6 md:py-10 lg:py-16 px-2 sm:px-0"
        >
            <div className="container mx-auto">
                <div ref={mobileGridRef} className="grid grid-cols-1 gap-8 md:hidden">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-visible rounded-2xl overflow-hidden bg-primary-gray shadow-lg flex flex-col transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className={`relative overflow-visible flex justify-center 
                                ${project.image === "/images/building4.png" ? '-mt-6' : '-mt-4 -mb-1'}`}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`${project.image === "/images/building4.png" ? 'w-24' : 'w-36'} h-20 object-contain transition-transform duration-1000 group-hover:scale-110`}
                                    style={{ zIndex: 10 }}
                                />
                            </div>
                            <div className='flex flex-col justify-center gap-2 py-3 px-3'>
                                <p className="text-sm font-bold mb-1">{project.title}</p>
                                <p className="mb-2 text-xs">{project.subtitle}</p>
                                <button
                                    onClick={handleStartQuiz}
                                    className="border border-1 border-black bg-primary-yellow text-black px-4 py-1 rounded-full font-medium text-sm transition-all duration-700 w-fit hover:scale-105">
                                    {project.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={desktopGridRef} className="hidden md:grid grid-cols-4 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative p-4 pe-2 overflow-visible rounded-2xl overflow-hidden bg-primary-gray shadow-lg flex flex-col justify-center transition-all duration-1000 hover:scale-105 hover:shadow-xl">
                            <div className="grid grid-cols-2 gap-1">
                                <div className='flex flex-col justify-center gap-2 '>
                                    <h3 className="text-[14px] font-bold mb-1">{project.title}</h3>
                                    <p className="mb-2 text-[12px]">{project.subtitle}</p>

                                </div>
                                <div className={`${project.image == "/images/building4.png" ? '-mt-10' : '-mt-6 -mb-2'} relative overflow-visible`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`${project.image == "/images/building4.png" ? 'w-32' : 'w-56'} h-[100px] object-contain transition-transform duration-1000 group-hover:scale-110`}
                                        style={{ zIndex: 10 }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleStartQuiz}
                                className="border border-1 border-black bg-primary-yellow text-black px-4 py-1 rounded-full font-medium text-sm transition-all duration-700 w-fit hover:scale-105">
                                {project.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectShowcase;