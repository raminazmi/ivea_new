<?php

namespace App\Services;

class SeoService
{
    protected array $defaultSeo = [
        'title' => 'ايڤيا - تصميم داخلي وديكور | خدمات تصميم احترافية',
        'description' => 'ايڤيا رائدة في تصميم الديكور الداخلي والخارجي. نقدم خدمات تصميم احترافية للمنازل والمكاتب والمحلات التجارية. احصل على تصميم مخصص يعكس شخصيتك.',
        'keywords' => 'تصميم داخلي, ديكور, تصميم منازل, تصميم مكاتب, تصميم محلات, ايڤيا, تصميم احترافي, ديكور حديث, تصميم عصري',
        'image' => '/images/og-image.jpg',
        'type' => 'website',
        'site_name' => 'ايڤيا - Ivea',
        'locale' => 'ar_SA',
        'url' => null
    ];

    protected array $pageConfigs = [
        'home' => [
            'title' => 'ايڤيا - الصفحة الرئيسية | تصميم داخلي وديكور احترافي',
            'description' => 'اكتشف عالم التصميم الداخلي مع ايڤيا. نحن نقدم خدمات تصميم احترافية للمنازل والمكاتب والمحلات التجارية بأحدث الطرق والتقنيات.',
            'keywords' => 'الصفحة الرئيسية, ايڤيا, تصميم داخلي, ديكور, خدمات تصميم',
        ],
        'products' => [
            'title' => 'منتجاتنا | ايڤيا - تصميم داخلي وديكور',
            'description' => 'استعرض مجموعة واسعة من منتجات التصميم الداخلي والديكور. أثاث عصري، إضاءة مميزة، وإكسسوارات فاخرة لتجميل مساحتك.',
            'keywords' => 'منتجات, أثاث, إضاءة, إكسسوارات, ديكور, تصميم داخلي',
        ],
        'projects' => [
            'title' => 'مشاريعنا | ايڤيا - أعمالنا في التصميم الداخلي',
            'description' => 'شاهد أحدث مشاريعنا في التصميم الداخلي والديكور. مشاريع منازل ومكاتب ومحلات تجارية منفذة بأعلى معايير الجودة.',
            'keywords' => 'مشاريع, أعمال, تصميم منازل, تصميم مكاتب, تصميم محلات',
        ],
        'articles' => [
            'title' => 'مقالات التصميم | ايڤيا - نصائح وأفكار الديكور',
            'description' => 'اقرأ أحدث مقالاتنا حول التصميم الداخلي والديكور. نصائح مفيدة وأفكار إبداعية لتجديد منزلك ومكتبك.',
            'keywords' => 'مقالات, نصائح ديكور, أفكار تصميم, تجديد منزل, ديكور حديث',
        ],
        'contact' => [
            'title' => 'تواصل معنا | ايڤيا - خدمة عملاء ممتازة',
            'description' => 'تواصل مع فريق ايڤيا للحصول على استشارة مجانية في التصميم الداخلي. نحن هنا لمساعدتك في تحقيق حلم التصميم المثالي.',
            'keywords' => 'تواصل, استشارة, خدمة عملاء, تصميم مجاني, ايڤيا',
        ]
    ];

    public function getSeoData(string $page, array $customData = []): array
    {
        $baseUrl = config('app.url');
        $pageConfig = $this->pageConfigs[$page] ?? [];

        $seoData = array_merge($this->defaultSeo, $pageConfig, $customData);
        if (!$seoData['url']) {
            $seoData['url'] = $page === 'home' ? $baseUrl : $baseUrl . '/' . $page;
        }

        return $seoData;
    }

    public function getProductSeo(object $product): array
    {
        return [
            'title' => $product->name . ' | ايڤيا - ' . ($product->category->name ?? 'منتجات التصميم'),
            'description' => $this->truncateDescription($product->description ?? 'منتج عالي الجودة من ايڤيا للتصميم الداخلي والديكور'),
            'keywords' => $product->name . ', ' . ($product->category->name ?? '') . ', ايڤيا, تصميم داخلي, ديكور',
            'image' => $product->images[0] ?? '/images/og-image.jpg',
            'type' => 'product',
            'price' => $product->price ?? null,
            'currency' => 'SAR',
            'availability' => $product->stock > 0 ? 'InStock' : 'OutOfStock',
        ];
    }

    public function getArticleSeo(object $article): array
    {
        return [
            'title' => $article->title . ' | ايڤيا - مقالات التصميم',
            'description' => $this->truncateDescription($article->excerpt ?? $article->content),
            'keywords' => $article->title . ', مقالات تصميم, ديكور, ايڤيا',
            'image' => $article->featured_image ?? '/images/og-image.jpg',
            'type' => 'article',
            'published_time' => $article->created_at->toISOString(),
            'modified_time' => $article->updated_at->toISOString(),
            'author' => 'ايڤيا',
        ];
    }

    public function getProjectSeo(object $project): array
    {
        return [
            'title' => $project->title . ' | ايڤيا - مشاريع التصميم',
            'description' => $this->truncateDescription($project->description ?? 'مشروع تصميم داخلي احترافي من ايڤيا'),
            'keywords' => $project->title . ', مشاريع تصميم, ' . ($project->category ?? '') . ', ايڤيا',
            'image' => $project->featured_image ?? '/images/og-image.jpg',
            'type' => 'article',
        ];
    }

    private function truncateDescription(string $text, int $length = 160): string
    {
        $text = strip_tags($text);
        return strlen($text) > $length ? substr($text, 0, $length) . '...' : $text;
    }

    public function generateStructuredData(array $seoData, string $type = 'website'): array
    {
        $baseStructuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'ايڤيا',
            'url' => config('app.url'),
            'logo' => config('app.url') . '/images/logo.png',
            'description' => $this->defaultSeo['description'],
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'SA',
                'addressLocality' => 'الرياض',
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => '+966-XX-XXX-XXXX',
                'contactType' => 'customer service',
                'availableLanguage' => ['Arabic', 'English']
            ],
            'sameAs' => [
                'https://www.facebook.com/ivea',
                'https://www.instagram.com/ivea',
                'https://www.linkedin.com/company/ivea'
            ]
        ];

        switch ($type) {
            case 'product':
                return $this->generateProductStructuredData($seoData);
            case 'article':
                return $this->generateArticleStructuredData($seoData);
            default:
                return $baseStructuredData;
        }
    }

    private function generateProductStructuredData(array $seoData): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => $seoData['title'],
            'description' => $seoData['description'],
            'image' => $seoData['image'],
            'brand' => [
                '@type' => 'Brand',
                'name' => 'ايڤيا'
            ],
            'offers' => [
                '@type' => 'Offer',
                'price' => $seoData['price'] ?? 0,
                'priceCurrency' => $seoData['currency'] ?? 'SAR',
                'availability' => 'https://schema.org/' . ($seoData['availability'] ?? 'InStock')
            ]
        ];
    }

    private function generateArticleStructuredData(array $seoData): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $seoData['title'],
            'description' => $seoData['description'],
            'image' => $seoData['image'],
            'author' => [
                '@type' => 'Organization',
                'name' => 'ايڤيا'
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'ايڤيا',
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => config('app.url') . '/images/logo.png'
                ]
            ],
            'datePublished' => $seoData['published_time'] ?? now()->toISOString(),
            'dateModified' => $seoData['modified_time'] ?? now()->toISOString()
        ];
    }
}
