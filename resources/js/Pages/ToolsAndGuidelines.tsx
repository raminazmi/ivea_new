import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { HiSearch, HiVolumeUp, HiShare } from 'react-icons/hi';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import ContactUs from '@/Components/LandingPage/ContactUs';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import { formatDate } from '@/Utils/dateUtils';

interface ToolsAndGuidelinesProps {
    tools: Array<{
        id: number;
        title: string;
        category: string;
        image: string;
        date: string;
        read_time: number;
        slug: string;
    }>;
    categories: Array<{ id: number; name: string }>;
    latestArticles: Array<{
        id: number;
        title: string;
        category: string;
        image: string;
        date: string;
        read_time: number;
        slug: string;
    }>;
    mainArticle: {
        id: number;
        title: string;
        content: string;
        category: string;
        image: string;
        date: string;
        read_time: number;
        author: string;
        author_image: string;
        author_bio: string;
        slug: string;
    } | null;
    selectedArticleId?: number;
}

const ToolsAndGuidelines: React.FC<ToolsAndGuidelinesProps> = ({
    tools = [],
    categories = [],
    latestArticles = [],
    mainArticle = null,
    selectedArticleId
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [fontSize, setFontSize] = useState(16);

    const handleFontSizeChange = (increment: boolean) => {
        if (increment && fontSize < 24) {
            setFontSize(prev => prev + 2);
        } else if (!increment && fontSize > 12) {
            setFontSize(prev => prev - 2);
        }
    };

    const handleArticleClick = (articleId: number) => {
        router.get('/tools-and-guidelines', { article: articleId }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const filteredTools = tools.filter(tool => {
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="أدوات وإرشادات - ايفيا" />
            <CoverSection
                imageUrl="/images/hero_ivea.png"
                title={mainArticle?.title || 'ايفيا والتطورات العالمية'}
                socialLinks={{
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                }}
            />
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <div className="bg-white min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                        <div className="mb-6 md:mb-8">
                            <Breadcrumb
                                items={[
                                    { name: 'الرئيسية', href: '/' },
                                    { name: 'أدوات وإرشادات' }
                                ]}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">

                            <div className="lg:col-span-3">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <button
                                            onClick={() => handleFontSizeChange(false)}
                                            className="px-3 md:px-4 py-2 font-semibold bg-primary-gray text-primary-black rounded-lg hover:bg-opacity-80 transition-all text-sm md:text-base"
                                        >
                                            تصغير الخط -
                                        </button>
                                        <button
                                            onClick={() => handleFontSizeChange(true)}
                                            className="px-3 md:px-4 py-2 font-semibold bg-primary-gray text-primary-black rounded-lg hover:bg-opacity-80 transition-all text-sm md:text-base"
                                        >
                                            تكبير الخط +
                                        </button>
                                    </div>
                                    {selectedArticleId && (
                                        <button
                                            onClick={() => router.get('/tools-and-guidelines')}
                                            className="px-3 md:px-4 py-2 font-semibold bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all text-sm md:text-base"
                                        >
                                            العودة للمقالة الأولى
                                        </button>
                                    )}
                                </div>
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6 md:mb-8">
                                    <div
                                        className="prose prose-lg max-w-none text-justify"
                                        style={{ fontSize: `${fontSize}px` }}
                                    >
                                        {mainArticle ? (
                                            <div dangerouslySetInnerHTML={{ __html: mainArticle.content }} />
                                        ) : (
                                            <>
                                                <p className="mb-4 md:mb-6 leading-relaxed">
                                                    نحن في شركة ايفيا نتميز بخبرة واسعة في مجال البناء والعقارات، حيث نقدم خدمات شاملة ومتكاملة تلبي جميع احتياجات عملائنا. نؤمن بأهمية الجودة والدقة في كل مشروع نقوم به، ونحرص على تقديم أفضل الحلول المبتكرة التي تضمن رضا العملاء وتحقيق أهدافهم.
                                                </p>

                                                <p className="mb-4 md:mb-6 leading-relaxed">
                                                    فلسفتنا تقوم على أساس الثقة والشفافية في التعامل مع العملاء، حيث نعتبر كل مشروع تحدياً جديداً نتطلع إليه بكل حماس وإبداع. نحرص على بناء علاقات طويلة الأمد مع عملائنا من خلال تقديم خدمات متميزة ودعم مستمر.
                                                </p>

                                                <div className="my-6 md:my-8 flex justify-center relative">
                                                    <img
                                                        src="/images/pepole.png"
                                                        alt="فريق العمل"
                                                    />
                                                </div>

                                                <p className="mb-4 md:mb-6 leading-relaxed">
                                                    تجمع متكامل لكفاءات وطنية وخبرات ممتدة من بيوت الخبرة والصناعة العقارية في المملكة. جاءت صفا للاستثمار لتكون نموذجًا وطنيًا رائدًا ومواكبًا لآخر الهندسات في عالم البناء وأحدث إبداعات التقنية وتقديمها بأبهى منتج يستحقه العميل وجودة لا تجارى.
                                                    تنطلق شركة صفا للاستثمار من فلسفة خاصة بالإنشاءات والتطوير العقاري، إننا نعي تمامًا التأثير العميق للمباني التي نراها من حولها على نوعية حياتنا ومخزوننا البصري والجمالي، وقد كّرسنا أنفسنا لتحسين محيطنا، نفسيًا واجتماعيًا وجماليًا.ومنذ تأسيسنا، عملنا على توفير بيئة عمل جذابة وملهمة في نفس الوقت، إيمانًا منا بأهمية الثقافة الإيجابية في تحقيق التفوق المؤسسي وتحقيق مكانة رائدة في السوق المحلي.إن قوة علامتنا التجارية بنيت على ثقافتنا المؤسسية وأصولها الثابتة من اهتمام بالغ بعملائنا ورفعنا لمسؤوليتنا الاجتماعية على رأس قائمة اهتماماتنا، إلى جانب المنظومة الداخلية للمنشأة من فريق عمل لديه خبرات عريقة إلى جانب الثوابتالأخلاقية والمهنية لكل فرد فيه.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <img
                                            src={mainArticle?.author_image || "/images/pepole.png"}
                                            alt={mainArticle?.author || "سمية الحسن"}
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                                                {mainArticle?.author || "سمية الحسن"}
                                            </h3>
                                            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">كاتبة وباحثة</p>
                                            <p className="text-xs md:text-sm text-gray-700 mb-3 md:mb-4 leading-relaxed">
                                                {mainArticle?.author_bio || "كاتبة وباحثة متخصصة في مجال البناء والعقارات، لها العديد من المؤلفات والدراسات المنشورة في المجلات المتخصصة. حاصلة على جوائز عديدة في مجال الكتابة والبحث العلمي."}
                                            </p>
                                            <div className="flex gap-2 md:gap-3">
                                                <button className="px-3 md:px-4 py-1.5 md:py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-xs md:text-sm">
                                                    صفحة الكاتب
                                                </button>
                                                <button className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs md:text-sm">
                                                    كاتبة وباحثة
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {tools && tools.length > 0 && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mt-6 md:mt-8">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">مقالات أخرى</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                            {tools.filter(tool => tool.id !== mainArticle?.id).map((tool) => (
                                                <div
                                                    key={tool.id}
                                                    className="bg-gray-50 rounded-lg p-3 md:p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                                    onClick={() => handleArticleClick(tool.id)}
                                                >
                                                    <img
                                                        src={tool.image}
                                                        alt={tool.title}
                                                        className="w-full h-24 md:h-32 object-cover rounded-lg mb-2 md:mb-3"
                                                    />
                                                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                                                        {tool.title}
                                                    </h3>
                                                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                                                        <span>{tool.category}</span>
                                                        <span>{tool.read_time} دقائق</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="lg:col-span-1 space-y-6 md:space-y-8">
                                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                                    <div className="flex items-center mb-3 md:mb-4">
                                        <div className="w-1 h-4 md:h-6 bg-yellow-400 rounded-full me-2 md:me-3"></div>
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">البحث السريع</h3>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="اكتب اسم المنتج الذي تبحث عنه"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full ps-10 pe-2 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                                        />
                                        <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                                    <div className="flex items-center mb-4 md:mb-6">
                                        <div className="w-1 h-4 md:h-6 bg-yellow-400 rounded-full me-2 md:me-3"></div>
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">أحدث المقالات</h3>
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        {latestArticles && latestArticles.length > 0 ? (
                                            latestArticles.map((article) => (
                                                <div
                                                    key={article.id}
                                                    className="flex gap-2 md:gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                                                    onClick={() => handleArticleClick(article.id)}
                                                >
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs md:text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                                            {article.title}
                                                        </h4>
                                                        <div className="flex items-center justify-between gap-1 text-xs text-gray-500">
                                                            <span>{formatDate(article.date)} . {article.read_time} دقائق للقراءة</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 text-sm">
                                                لا توجد مقالات حديثة
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                                    <div className="flex items-center mb-4 md:mb-6">
                                        <div className="w-1 h-4 md:h-6 bg-yellow-400 rounded-full ml-2 md:ml-3"></div>
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">الأقسام</h3>
                                    </div>
                                    <div className="space-y-2 md:space-y-3 space-x-2 md:space-x-3">
                                        <button
                                            onClick={() => setSelectedCategory('all')}
                                            className={`w-fit text-right py-1 px-2 me-2 md:me-3 text-xs md:text-sm rounded-lg transition-colors ${selectedCategory === 'all'
                                                ? 'bg-yellow-400 text-gray-900'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            جميع الأقسام
                                        </button>
                                        {categories && categories.length > 0 ? (
                                            categories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onClick={() => setSelectedCategory(category.name)}
                                                    className={`w-fit text-right py-1 px-2 text-xs md:text-sm rounded-lg transition-colors ${selectedCategory === category.name
                                                        ? 'bg-yellow-400 text-gray-900'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {category.name}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 text-sm">
                                                لا توجد فئات متاحة
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactUs />
            </div>
        </AppLayout>
    );
};

export default ToolsAndGuidelines;