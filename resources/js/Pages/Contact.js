import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactForm from '@/Components/LandingPage/ContactForm';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import Breadcrumb from '@/Components/Common/Breadcrumb';
const Contact = () => {
    return (_jsxs(AppLayout, { children: [_jsx(CoverSection, { imageUrl: "/images/contact_cover.png", title: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627:", subtitle: "\u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0631\u0633\u0627\u0644\u0629\u060C \u0646\u062D\u0646 \u062F\u0627\u0626\u0645\u0627 \u0647\u0646\u0627 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629", description: "\u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", socialLinks: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                } }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10", children: _jsx(Breadcrumb, { items: [
                        { name: 'الرئيسية', href: '/' },
                        { name: 'تواصل معنا' }
                    ] }) }), _jsx(ContactForm, {})] }));
};
export default Contact;
