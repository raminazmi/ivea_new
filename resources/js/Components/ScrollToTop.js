import { useEffect } from "react";
import { router } from "@inertiajs/react";
export default function ScrollToTop() {
    useEffect(() => {
        // دالة للتمرير إلى أعلى الصفحة
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });
        };
        // استماع لحدث navigate (بداية التنقل)
        const handleNavigate = () => {
            // تمرير فوري عند بداية التنقل
            scrollToTop();
        };
        // استماع لحدث finish (اكتمال التحميل)
        const handleFinish = () => {
            // تمرير إضافي بعد اكتمال التحميل للتأكد
            setTimeout(scrollToTop, 50);
        };
        // إضافة المستمعين
        router.on('navigate', handleNavigate);
        router.on('finish', handleFinish);
        // تنظيف المستمع عند إلغاء المكون
        return () => {
            // Inertia.js يتعامل مع تنظيف المستمعين تلقائياً
        };
    }, []);
    return null;
}
