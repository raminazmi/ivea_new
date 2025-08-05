import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactForm from '@/Components/LandingPage/ContactForm';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import Breadcrumb from '@/Components/Common/Breadcrumb';

const Contact = () => {
    return (
        <AppLayout>
            <CoverSection
                imageUrl="/images/contact_cover.png"
                title="اتصل بنا:"
                subtitle="أرسل لنا رسالة، نحن دائما هنا المساعدة"
                description="للاستفسارات عبر البريد الإلكتروني"
                socialLinks={{
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10">
                <Breadcrumb
                    items={[
                        { name: 'الرئيسية', href: '/' },
                        { name: 'تواصل معنا' }
                    ]}
                />
            </div>
            <ContactForm />
        </AppLayout>
    );
};

export default Contact;