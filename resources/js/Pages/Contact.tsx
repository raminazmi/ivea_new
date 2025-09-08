import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactForm from '@/Components/LandingPage/ContactForm';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import Breadcrumb from '@/Components/Common/Breadcrumb';

const Contact = () => {
    return (
        <AppLayout>
            <CoverSection
                imageUrl="/images/contact.jpg"
                title="اتصل بنا:"
                subtitle="أرسل لنا رسالة، نحن دائما هنا المساعدة"
                description="للاستفسارات عبر البريد الإلكتروني"
                socialLinks={{
                    instagram: 'https://www.instagram.com/ivea.sa',
                    snapchat: 'https://www.snapchat.com/add/ivea_sa?share_id=ws9Bef6xzOc&locale=ar-AE',
                    tiktok: 'https://www.tiktok.com/@ivea_sa',
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