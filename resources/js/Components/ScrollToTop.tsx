import { useEffect } from "react";
import { router } from "@inertiajs/react";

export default function ScrollToTop() {
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });
        };

        const handleNavigate = () => {
            scrollToTop();
        };

        const handleFinish = () => {
            setTimeout(scrollToTop, 50);
        };

        router.on('navigate', handleNavigate);
        router.on('finish', handleFinish);

        return () => {
        };
    }, []);

    return null;
} 