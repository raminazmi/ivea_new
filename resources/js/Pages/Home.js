import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from '@/Components/LandingPage/Hero';
import FeaturedOffers from '@/Components/LandingPage/FeaturedOffers';
import PreparingForSummer from '@/Components/LandingPage/PreparingForSummer';
import CategoryShowcase from '@/Components/LandingPage/CategoryShowcase';
import ProjectShowcase from '@/Components/LandingPage/ProjectShowcase';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactUs from '@/Components/LandingPage/ContactUs';
import SectionTitle from '@/Components/SectionTitle';
const Home = ({ featuredProducts, categories }) => {
    return (_jsxs(AppLayout, { children: [_jsx(Hero, {}), _jsx(FeaturedOffers, {}), _jsx(PreparingForSummer, {}), _jsx(CategoryShowcase, { featuredProducts: featuredProducts }), _jsx(SectionTitle, { text: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639" }), _jsx(ProjectShowcase, {}), _jsx(ContactUs, {})] }));
};
export default Home;
