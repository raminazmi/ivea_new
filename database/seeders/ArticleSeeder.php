<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        // مقال 1: كيف تختار الستارة المثالية لمساحتك؟
        Article::create([
            'title' => 'كيف تختار الستارة المثالية لمساحتك؟',
            'slug' => 'كيف-تختار-الستارة-المثالية-لمساحتك؟',
            'excerpt' => 'دليل شامل لاختيار الستائر المثالية: أنواع الستائر، اختيار القماش، الألوان المناسبة، ونصائح من خبراء إيفيا',
            'content' => '<div class="max-w-4xl mx-auto">
                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-center">
                        الستائر ليست مجرد قطعة قماش تغطي النوافذ، بل هي عنصر أساسي يحدد جمالية المكان، يضيف الخصوصية، وينسجم مع ديكور المنزل ليمنحها لمسة من الأناقة والراحة. اختيار الستارة المناسبة يحتاج بعض التركيز حتى تجمع بين الذوق العملي والجمالي.
                    </p>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">1. أنواع الستائر الشائعة</h3>
                    <p class="text-lg text-gray-700 mb-4 text-right">لكل نوع ستارة طابع خاص وتأثير مختلف على المساحة:</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div class="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-lg">
                            <h4 class="text-xl font-semibold text-blue-800 mb-3 text-right">الستائر الويفي (Wavy)</h4>
                            <p class="text-gray-700 text-right">خيار عصري يمنح انسيابية وأناقة بسيطة.</p>
                        </div>
                        <div class="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-lg">
                            <h4 class="text-xl font-semibold text-green-800 mb-3 text-right">الستائر الأمريكية</h4>
                            <p class="text-gray-700 text-right">كلاسيكية وتضفي دفئًا على الغرفة.</p>
                        </div>
                        <div class="bg-gradient-to-r from-purple-50 to-violet-100 p-6 rounded-lg">
                            <h4 class="text-xl font-semibold text-purple-800 mb-3 text-right">الستائر الرول</h4>
                            <p class="text-gray-700 text-right">عملية وحديثة، مثالية للمكاتب أو المساحات الصغيرة.</p>
                        </div>
                        <div class="bg-gradient-to-r from-orange-50 to-amber-100 p-6 rounded-lg">
                            <h4 class="text-xl font-semibold text-orange-800 mb-3 text-right">الستائر الرومانية</h4>
                            <p class="text-gray-700 text-right">مزيج بين الموديل الكلاسيك والعملية، تعطي لمسة راقية ومميزة.</p>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">2. اختيار القماش المناسب</h3>
                    <p class="text-lg text-gray-700 mb-4 text-right">القماش هو العامل الأكبر في تحديد وظيفة الستارة:</p>
                    
                    <div class="space-y-4 mb-6">
                        <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div class="w-4 h-4 bg-blue-500 rounded-full ml-4"></div>
                            <div class="text-right">
                                <span class="font-semibold text-gray-800">خفيف وشفاف:</span>
                                <span class="text-gray-700 mr-2">يسمح بدخول الضوء الطبيعي ويمنح إحساسًا بالاتساع.</span>
                            </div>
                        </div>
                        <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div class="w-4 h-4 bg-green-500 rounded-full ml-4"></div>
                            <div class="text-right">
                                <span class="font-semibold text-gray-800">سميك:</span>
                                <span class="text-gray-700 mr-2">يوفر عزلًا أفضل للخصوصية ويعطي مظهرًا رسميًا أكثر.</span>
                            </div>
                        </div>
                        <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div class="w-4 h-4 bg-purple-500 rounded-full ml-4"></div>
                            <div class="text-right">
                                <span class="font-semibold text-gray-800">عازل للضوء (Blackout):</span>
                                <span class="text-gray-700 mr-2">مثالي لغرف النوم أو المجالس حيث يمنع دخول الضوء تمامًا.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">3. الألوان حسب أجواء الغرفة</h3>
                    <p class="text-lg text-gray-700 mb-4 text-right">الألوان قادرة على تغيير إحساسك بالمكان:</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2 text-right">الألوان الفاتحة</h4>
                            <p class="text-gray-700 text-right">تمنح اتساعًا وراحة بصرية، مناسبة للغرف الصغيرة.</p>
                        </div>
                        <div class="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2 text-right">الألوان الداكنة</h4>
                            <p class="text-gray-700 text-right">تضيف دفئًا وأناقة خاصة، وتُبرز تفاصيل الأثاث.</p>
                        </div>
                        <div class="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2 text-right">الألوان الترابية والهادئة</h4>
                            <p class="text-gray-700 text-right">تعزز الإحساس بالسكينة والاسترخاء.</p>
                        </div>
                        <div class="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2 text-right">الألوان الجريئة</h4>
                            <p class="text-gray-700 text-right">مثالية لإضافة لمسة حيوية وعصرية في الغرفة.</p>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-right mb-6">
                        الستارة المثالية ليست مجرد تفصيلة جمالية، بل هي انعكاس لذوقك وطبيعة مساحتك. المزج بين النوع، القماش، واللون هو ما يصنع الفرق. ومع تعدد الخيارات قد يكون القرار مربكًا، وهنا تأتي إيفيا لتجعل رحلتك أسهل وأمتع، لأنها ببساطة #تشاركك_ذوقك.
                    </p>
                    
                    <div class="p-6 rounded-lg text-center">
                        <p class="text-xl font-semibold mb-2">احجز استشارة تصميم مجانية</p>
                        <p class="text-lg">مع فريق إيفيا، ودع خبراءنا يساعدونك في اختيار الستارة المثالية التي تعكس أسلوبك وتناسب مساحتك.</p>
                    </div>
                </div>
            </div>',
            'category_id' => 1,
            'image' => '/images/article4.jpg',
            'date' => Carbon::now(),
            'read_time' => 10,
            'author' => 'فريق إيفيا',
            'author_image' => '/images/article4.jpg',
            'author_bio' => 'فريق متخصص في التصميم الداخلي والديكور، يقدم استشارات مجانية لمساعدة العملاء في اختيار أفضل الحلول لمساحاتهم.',
            'meta_description' => 'دليل شامل لاختيار الستائر المثالية: أنواع الستائر، اختيار القماش، الألوان المناسبة، ونصائح من خبراء إيفيا',
            'meta_keywords' => 'ستائر، ديكور، تصميم داخلي، إيفيا، نصائح تصميم',
            'is_published' => true,
            'featured' => true,
            'sort_order' => 1
        ]);

        // مقال 2: دليل قياس المساحات للستائر والخزائن
        Article::create([
            'title' => 'دليل قياس المساحات للستائر والخزائن',
            'slug' => 'دليل-قياس-المساحات-للستائر-والخزائن',
            'excerpt' => 'دليل شامل لقياس المساحات للستائر والخزائن: خطوات عملية، نصائح مفيدة، ومساعدة من خبراء إيفيا',
            'content' => '<div class="max-w-4xl mx-auto">
                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-center">
                        كثير من العملاء يواجهون صعوبة عند حساب المقاسات الدقيقة، سواء للستائر أو الخزائن، مما قد يؤثر على جمال وملاءمة التصميم. لذلك، جمعنا لك هذا الدليل المبسط لمساعدتك في أخذ القياسات بشكل صحيح وسهل لكل صنف على حدة.
                    </p>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">أولاً: كيفية قياس المساحات للستائر</h3>
                    <h4 class="text-xl font-semibold text-gray-700 mb-4 text-right">خطوات قياس العرض والارتفاع</h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div class="bg-gradient-to-r from-blue-50 to-cyan-100 p-6 rounded-lg">
                            <h5 class="text-lg font-semibold text-blue-800 mb-3 text-right">العرض</h5>
                            <p class="text-gray-700 text-right">قِس عرض الجدار من الحافة إلى الحافة، على كل جانب للحصول على تغطية كاملة ومظهر أنيق.</p>
                        </div>
                        <div class="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-lg">
                            <h5 class="text-lg font-semibold text-green-800 mb-3 text-right">الارتفاع</h5>
                            <p class="text-gray-700 text-right">قِس المسافة من أعلى نقطة (السقف أو أعلى النافذة) حتى الأرضية. إذا كنت تفضل أن تلامس الستارة الأرض فاعتمد القياس الدقيق، أما إذا رغبت أن تكون مرتفعة قليلًا فاجعلها بفارق 5–10 سم عن الأرض لتفادي تراكم الغبار وتسهيل عملية التنظيف، وهو الخيار الذي ننصح به.</p>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">ثانياً: كيفية قياس المساحات للخزائن</h3>
                    <h4 class="text-xl font-semibold text-gray-700 mb-4 text-right">خطوات القياس الأساسية</h4>
                    
                    <div class="space-y-4 mb-6">
                        <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div class="w-4 h-4 bg-blue-500 rounded-full ml-4"></div>
                            <div class="text-right">
                                <span class="font-semibold text-gray-800">العرض:</span>
                                <span class="text-gray-700 mr-2">قِس المسافة من الجدار إلى الجدار أو حسب المساحة المرغوبة حيث سيُثبت الخزانة.</span>
                            </div>
                        </div>
                        <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div class="w-4 h-4 bg-green-500 rounded-full ml-4"></div>
                            <div class="text-right">
                                <span class="font-semibold text-gray-800">الارتفاع:</span>
                                <span class="text-gray-700 mr-2">قِس من الأرض إلى السقف أو بإرتفاع يصل 2.73 سم.</span>
                            </div>
                        </div>
                        <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div class="w-4 h-4 bg-purple-500 rounded-full ml-4"></div>
                            <div class="text-right">
                                <span class="font-semibold text-gray-800">العمق:</span>
                                <span class="text-gray-700 mr-2">لا تنسَ قياس عمق المساحة، وهو ما يحدد مدى استيعاب الخزانة.</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-r from-yellow-50 to-amber-100 p-6 rounded-lg mb-6">
                        <h4 class="text-xl font-semibold text-amber-800 mb-4 text-right">حساب مساحة الخشب المطلوبة</h4>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-amber-500 rounded-full ml-3"></div>
                                <span class="text-gray-700">المساحة = الطول × العرض × العمق (بحسب التصميم).</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-amber-500 rounded-full ml-3"></div>
                                <span class="text-gray-700">أضف نسبة بسيطة (5 – 10%) كاحتياط في حال وجود تعديلات أو قص.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-right mb-6">
                        القياسات الدقيقة هي الأساس للحصول على ستائر متناسقة وخزائن عملية تناسب مساحتك وتلبي احتياجاتك. بدلاً من الحيرة أو الوقوع في أخطاء شائعة، دع خبراء إيفيا يساعدونك بخبرتهم في التصميم والتنفيذ.
                    </p>
                    
                    <div class="p-6 rounded-lg text-center">
                        <p class="text-xl font-semibold mb-2">احجز استشارة تصميم مجانية</p>
                        <p class="text-lg">مع فريق إيفيا اليوم، وابدأ مشروعك بثقة وأناقة.</p>
                    </div>
                </div>
            </div>',
            'category_id' => 2,
            'image' => '/images/article3.jpg',
            'date' => Carbon::now()->subDays(1),
            'read_time' => 8,
            'author' => 'فريق إيفيا',
            'author_image' => '/images/article3.jpg',
            'author_bio' => 'فريق متخصص في القياسات والتصميم، يقدم إرشادات دقيقة لضمان أفضل النتائج في مشاريع العملاء.',
            'meta_description' => 'دليل شامل لقياس المساحات للستائر والخزائن: خطوات عملية، نصائح مفيدة، ومساعدة من خبراء إيفيا',
            'meta_keywords' => 'قياسات، ستائر، خزائن، دليل، إيفيا، تصميم',
            'is_published' => true,
            'featured' => false,
            'sort_order' => 2
        ]);

        // مقال 3: كيف تفرق بين المودرن والكلاسيك والنيوكلاسيك؟
        Article::create([
            'title' => 'كيف تفرق بين المودرن والكلاسيك والنيوكلاسيك؟',
            'slug' => 'كيف-تفرق-بين-المودرن-والكلاسيك-والنيوكلاسيك؟',
            'excerpt' => 'دليل شامل للتمييز بين أنماط الأثاث: المودرن، الكلاسيك، والنيوكلاسيك. تعرف على مميزات كل نمط وأفضل استخداماته',
            'content' => '<div class="max-w-4xl mx-auto">
                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-center">
                        اختيار نمط الأثاث ليس مجرد قرار جمالي، بل هو انعكاس لشخصيتك وأسلوب حياتك. الأنماط الثلاثة الأكثر شيوعًا في عالم التصميم الداخلي هي: المودرن، الكلاسيك، والنيوكلاسيك. ولكل منها بصمته الخاصة التي تمنح المكان هوية مختلفة.
                    </p>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">1. الأثاث المودرن (Modern)</h3>
                    
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-lg mb-6">
                        <h4 class="text-xl font-semibold text-blue-800 mb-3 text-right">التعريف</h4>
                        <p class="text-gray-700 text-right mb-4">أسلوب عصري يتميز بالبساطة والخطوط المستقيمة والاعتماد على الألوان الحيادية.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white/50 p-4 rounded-lg">
                                <h5 class="font-semibold text-blue-800 mb-2 text-right">المميزات</h5>
                                <p class="text-gray-700 text-right">عملي، مريح، يعطي إحساسًا بالرحابة، مناسب للشقق والمساحات الحديثة.</p>
                            </div>
                            <div class="bg-white/50 p-4 rounded-lg">
                                <h5 class="font-semibold text-blue-800 mb-2 text-right">الأكثر استخدامًا</h5>
                                <p class="text-gray-700 text-right">الصالات العائلية، غرف المعيشة، والمكاتب المنزلية.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">2. الأثاث الكلاسيك (Classic)</h3>
                    
                    <div class="bg-gradient-to-r from-amber-50 to-yellow-100 p-6 rounded-lg mb-6">
                        <h4 class="text-xl font-semibold text-amber-800 mb-3 text-right">التعريف</h4>
                        <p class="text-gray-700 text-right mb-4">أسلوب فاخر تقليدي يعتمد على التفاصيل المزخرفة، الأخشاب الطبيعية، والألوان الغنية.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white/50 p-4 rounded-lg">
                                <h5 class="font-semibold text-amber-800 mb-2 text-right">المميزات</h5>
                                <p class="text-gray-700 text-right">يمنح المكان طابعًا ملكيًا، خالدًا لا يتأثر بالموضة.</p>
                            </div>
                            <div class="bg-white/50 p-4 rounded-lg">
                                <h5 class="font-semibold text-amber-800 mb-2 text-right">الأكثر استخدامًا</h5>
                                <p class="text-gray-700 text-right">المجالس الرسمية، غرف الاستقبال، والفلل ذات المساحات الواسعة.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">3. الأثاث النيوكلاسيك (Neo-Classic)</h3>
                    
                    <div class="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-lg mb-6">
                        <h4 class="text-xl font-semibold text-green-800 mb-3 text-right">التعريف</h4>
                        <p class="text-gray-700 text-right mb-4">مزيج بين البساطة العصرية وفخامة الكلاسيك، حيث يجمع بين الخطوط النظيفة واللمسات المزخرفة البسيطة.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white/50 p-4 rounded-lg">
                                <h5 class="font-semibold text-green-800 mb-2 text-right">المميزات</h5>
                                <p class="text-gray-700 text-right">توازن مثالي بين العملية والفخامة، يناسب البيوت العصرية والفيلات على حد سواء.</p>
                            </div>
                            <div class="bg-white/50 p-4 rounded-lg">
                                <h5 class="font-semibold text-green-800 mb-2 text-right">الأكثر استخدامًا</h5>
                                <p class="text-gray-700 text-right">الصالات الرئيسية، غرف الطعام، والمساحات التي تجمع العائلة والضيوف.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-right mb-6">
                        مهما كان ذوقك، ستجد في أنماط الأثاث ما يعكس شخصيتك ويمنح مساحتك هوية مميزة. وإذا ما زلت محتارًا بين المودرن، الكلاسيك، أو النيوكلاسيك، دع إيفيا تساعدك بخيارات متنوعة تجمع بين العملية والجمال.
                    </p>
                    
                    <div class="p-6 rounded-lg text-center">
                        <p class="text-xl font-semibold mb-2">اكتشف تشكيلات إيفيا من الكنب الآن</p>
                        <p class="text-lg">واختر ما يناسب ذوقك.</p>
                    </div>
                </div>
            </div>',
            'category_id' => 1,
            'image' => '/images/article1.jpg',
            'date' => Carbon::now()->subDays(2),
            'read_time' => 7,
            'author' => 'فريق إيفيا',
            'author_image' => '/images/article1.jpg',
            'author_bio' => 'فريق متخصص في التصميم الداخلي، يقدم إرشادات شاملة لمساعدة العملاء في اختيار أنماط الأثاث المناسبة لمساحاتهم.',
            'meta_description' => 'دليل شامل للتمييز بين أنماط الأثاث: المودرن، الكلاسيك، والنيوكلاسيك. تعرف على مميزات كل نمط وأفضل استخداماته',
            'meta_keywords' => 'أثاث، مودرن، كلاسيك، نيوكلاسيك، تصميم داخلي، إيفيا',
            'is_published' => true,
            'featured' => true,
            'sort_order' => 3
        ]);

        // مقال 4: خطوات تجهيز مشروعك مع إيفيا
        Article::create([
            'title' => 'خطوات تجهيز مشروعك مع إيفيا',
            'slug' => 'خطوات-تجهيز-مشروعك-مع-إيفيا',
            'excerpt' => 'خطوات واضحة ومنظمة لتجهيز مشروعك مع إيفيا: من تحديد المساحة إلى التنفيذ النهائي',
            'content' => '<div class="max-w-4xl mx-auto">
                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-center">
                        رحلة مشروعك تبدأ من فكرة، وتكتمل بخطوات واضحة تقودك إلى التنفيذ بكل سلاسة. في إيفيا نوفر لك تجربة منظمة من أول استشارة وحتى اللمسة النهائية لتصميم مساحتك.
                    </p>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">1. تحديد نوع المساحة</h3>
                    <div class="bg-gradient-to-r from-blue-50 to-cyan-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            هل هي منزل تحتاج فيه لراحة ودفء؟ أم مكتب يعكس الاحترافية؟ أو كافيه يركز على جذب العملاء بأجواء مميزة؟ تحديد نوع المساحة هو الخطوة الأولى لتصميم يناسب احتياجاتك.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">2. رفع المقاسات أو إرسال صور المساحة</h3>
                    <div class="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            لتكون البداية دقيقة، يمكنك رفع المقاسات مباشرة أو ببساطة إرسال صور لمساحتك. هذا يساعد فريقنا على فهم أبعاد المكان واقتراح أفضل الحلول.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">3. اختيار المنتج والستايل</h3>
                    <div class="bg-gradient-to-r from-purple-50 to-violet-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            من الستائر والكنب إلى الخزائن والديكورات الخشبية، لديك خيارات واسعة مع أنماط متعددة (مودرن، كلاسيك، نيوكلاسيك). اختر ما يعكس شخصيتك وذوقك.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">4. زيارة استشارية من فريق إيفيا</h3>
                    <div class="bg-gradient-to-r from-orange-50 to-amber-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            بعد تحديد التفاصيل، يقوم فريقنا بزيارة ميدانية للتأكد من القياسات، استعراض عينات الأقمشة والخامات، وتقديم نصائح تصميمية تساعدك على اتخاذ القرار النهائي.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-right mb-6">
                        مع إيفيا، مشروعك يسير بخطوات واضحة من الفكرة إلى التنفيذ، وبطريقة تضمن لك الراحة والنتيجة المثالية.
                    </p>
                    
                    <div class="p-6 rounded-lg text-center">
                        <p class="text-xl font-semibold mb-2">ابدأ مشروعك معنا الآن</p>
                        <p class="text-lg">من صفحة المشاريع وشاركنا تفاصيل مساحتك لنحوّلها معًا إلى تجربة استثنائية.</p>
                    </div>
                </div>
            </div>',
            'category_id' => 2,
            'image' => '/images/article2.jpg',
            'date' => Carbon::now()->subDays(3),
            'read_time' => 6,
            'author' => 'فريق إيفيا',
            'author_image' => '/images/article2.jpg',
            'author_bio' => 'فريق متخصص في إدارة المشاريع والتصميم، يقدم خطوات واضحة ومنظمة لضمان نجاح كل مشروع.',
            'meta_description' => 'خطوات واضحة ومنظمة لتجهيز مشروعك مع إيفيا: من تحديد المساحة إلى التنفيذ النهائي',
            'meta_keywords' => 'مشاريع، تصميم، إيفيا، خطوات، استشارات',
            'is_published' => true,
            'featured' => false,
            'sort_order' => 4
        ]);

        // مقال 5: لماذا إيفيا؟
        Article::create([
            'title' => 'لماذا إيفيا؟',
            'slug' => 'لماذا-إيفيا؟',
            'excerpt' => 'اكتشف لماذا تختار إيفيا: خبرة، جودة، تشكيلات واسعة، استشارات مجانية، وخدمات شاملة في التصميم والديكور',
            'content' => '<div class="max-w-4xl mx-auto">
                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700">
                        عندما يتعلق الأمر بالديكور والستايل، لا يكفي أن تختار منتجًا فقط، بل تحتاج إلى شريك يفهم ذوقك ويترجمه إلى واقع يليق بمساحتك. هنا يأتي دور إيفيا.
                    </p>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">1. خبرة تجمع بين الجمال والعملية</h3>
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            نحن لا نصمم فقط لنُبهر العين، بل نحرص أن يكون كل تفصيل عمليًا يناسب استخدامك اليومي ويعزز من راحتك.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">2. تشكيلات واسعة تناسب جميع الأذواق</h3>
                    <div class="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            من المودرن الجذاب إلى الكلاسيك الفخم، وصولًا إلى النيوكلاسيك المتوازن، إيفيا تقدم لك خيارات تلبي مختلف الأذواق والمساحات.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">3. خامات عالية الجودة</h3>
                    <div class="bg-gradient-to-r from-purple-50 to-violet-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            نختار بعناية الأقمشة، الأخشاب، والإكسسوارات من أفضل الموردين لنضمن لك منتجات تدوم وتُضفي لمسة فخامة على منزلك أو مكتبك.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">4. استشارات تصميم مجانية</h3>
                    <div class="bg-gradient-to-r from-orange-50 to-amber-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            فريقنا من المصممين موجود لخدمتك: نشاركك ذوقك، نقدم لك عينات، ونقترح حلولًا تناسب طبيعة مساحتك.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">5. خدمات قياس وتنفيذ دقيقة</h3>
                    <div class="bg-gradient-to-r from-red-50 to-pink-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            من رفع المقاسات إلى تركيب المنتجات، نتابع معك كل خطوة لنضمن أن النتيجة النهائية مطابقة لرؤيتك.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 text-right">6. تجربة عميل مختلفة</h3>
                    <div class="bg-gradient-to-r from-teal-50 to-cyan-100 p-6 rounded-lg">
                        <p class="text-lg text-gray-700 text-right">
                            إيفيا ليست مجرد متجر، بل منصة ترافقك من الفكرة إلى التنفيذ بخطوات واضحة، وتجعل رحلتك في تجهيز المساحات أكثر متعة وسلاسة.
                        </p>
                    </div>
                </div>

                <div class="mb-8">
                    <p class="text-lg leading-relaxed text-gray-700 text-right mb-6">
                        مع إيفيا، ستكتشف أن الديكور رحلة جميلة تبدأ بذوقك وتنتهي بمساحة تعكس شخصيتك.
                    </p>
                    
                    <div class="p-6 rounded-lg text-center">
                        <p class="text-xl font-semibold mb-2">اختر إيفيا اليوم</p>
                        <p class="text-lg">لأننا ببساطة #نشاركك_ذوقك</p>
                    </div>
                </div>
            </div>',
            'category_id' => 1,
            'image' => '/images/hero_ivea.png',
            'date' => Carbon::now()->subDays(4),
            'read_time' => 8,
            'author' => 'فريق إيفيا',
            'author_image' => '/images/hero_ivea.png',
            'author_bio' => 'فريق إيفيا المتخصص في التصميم والديكور، يقدم خدمات شاملة ومتميزة لتحويل مساحات العملاء إلى أماكن تعكس شخصيتهم وذوقهم.',
            'meta_description' => 'اكتشف لماذا تختار إيفيا: خبرة، جودة، تشكيلات واسعة، استشارات مجانية، وخدمات شاملة في التصميم والديكور',
            'meta_keywords' => 'إيفيا، تصميم، ديكور، خدمات، جودة، خبرة',
            'is_published' => true,
            'featured' => true,
            'sort_order' => 5
        ]);
    }
}
