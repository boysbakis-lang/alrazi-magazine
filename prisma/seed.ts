import { PrismaClient, Role, ArticleStatus } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'school-news' }, update: {}, create: { name: 'أخبار المدرسة', slug: 'school-news', icon: '📰', color: '#0A3D7A', order: 1 } }),
    prisma.category.upsert({ where: { slug: 'achievements' }, update: {}, create: { name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 } }),
    prisma.category.upsert({ where: { slug: 'events' }, update: {}, create: { name: 'الفعاليات والأنشطة', slug: 'events', icon: '🎉', color: '#2E7D32', order: 3 } }),
    prisma.category.upsert({ where: { slug: 'national-identity' }, update: {}, create: { name: 'الهوية الوطنية', slug: 'national-identity', icon: '🇦🇪', color: '#EF3340', order: 4 } }),
    prisma.category.upsert({ where: { slug: 'stem' }, update: {}, create: { name: 'STEM والتقنية', slug: 'stem', icon: '🔬', color: '#1565C0', order: 5 } }),
    prisma.category.upsert({ where: { slug: 'sports' }, update: {}, create: { name: 'الرياضة والصحة', slug: 'sports', icon: '⚽', color: '#00838F', order: 6 } }),
    prisma.category.upsert({ where: { slug: 'culture' }, update: {}, create: { name: 'الثقافة والأدب', slug: 'culture', icon: '📚', color: '#6A1B9A', order: 7 } }),
    prisma.category.upsert({ where: { slug: 'teachers' }, update: {}, create: { name: 'مقالات المعلمين', slug: 'teachers', icon: '👨‍🏫', color: '#37474F', order: 8 } }),
  ])

  // Users
  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'hany.aboueldahab@moe.sch.ae' },
    update: {},
    create: { name: 'هاني أبو الدهب', email: 'hany.aboueldahab@moe.sch.ae', password: hashedPassword, role: Role.ADMIN, bio: 'مدير مدرسة الرازي بنين - الحلقة الثانية' },
  })

  const teacher1 = await prisma.user.upsert({
    where: { email: 'ahmed@alrazi.ae' },
    update: {},
    create: { name: 'أحمد السعيد', email: 'ahmed@alrazi.ae', password: hashedPassword, role: Role.TEACHER, bio: 'منسق التعليم التقني', grade: 'الحلقة الثانية' },
  })

  const teacher2 = await prisma.user.upsert({
    where: { email: 'saeed@alrazi.ae' },
    update: {},
    create: { name: 'سعيد الرشيد', email: 'saeed@alrazi.ae', password: hashedPassword, role: Role.TEACHER, bio: 'مشرف الروبوتيكس والذكاء الاصطناعي' },
  })

  const student1 = await prisma.user.upsert({
    where: { email: 'abdullah@alrazi.ae' },
    update: {},
    create: { name: 'عبدالله محمد', email: 'abdullah@alrazi.ae', password: hashedPassword, role: Role.STUDENT, grade: 'الصف الثامن' },
  })

  const editor = await prisma.user.upsert({
    where: { email: 'editor@alrazi.ae' },
    update: {},
    create: { name: 'فاطمة النعيمي', email: 'editor@alrazi.ae', password: hashedPassword, role: Role.EDITOR, bio: 'محررة المجلة المدرسية' },
  })

  // Articles
  const articlesData = [
    {
      title: 'طلاب الرازي يحصدون المركز الأول في مسابقة الروبوتيكس على مستوى إمارة دبي',
      slug: 'razi-robotics-championship-2026',
      excerpt: 'حقق طلاب مدرسة الرازي بنين إنجازاً باهراً بفوزهم بالمركز الأول في مسابقة الروبوتيكس والذكاء الاصطناعي التي أقيمت في مركز دبي للذكاء الاصطناعي',
      content: `<h2>إنجاز يفخر به أبناء الرازي</h2><p>في مشهد احتفالي بهيج، رفع طلاب مدرسة الرازي بنين للحلقة الثانية كأس الفوز في مسابقة الروبوتيكس والذكاء الاصطناعي على مستوى إمارة دبي، محققين بذلك إنجازاً لافتاً يضاف إلى سجل المدرسة الحافل بالنجاحات والإنجازات المتميزة.</p><h2>تفاصيل المشروع الفائز</h2><p>شارك في المسابقة فريق من أربعة طلاب من الصف الثامن، قضوا أشهراً طويلة في التدريب المكثف تحت إشراف المعلم المتميز سعيد الرشيد، مشرف نادي الروبوتيكس بالمدرسة. قدّم الفريق مشروعاً مبتكراً لروبوت ذكي يساعد ذوي الاحتياجات الخاصة في التنقل داخل المباني الكبيرة باستخدام تقنيات الذكاء الاصطناعي والتعلم الآلي.</p><h2>كلمة المدير</h2><p>قال مدير المدرسة الأستاذ محمد العامري: "هذا الإنجاز الرائع يعكس المستوى التعليمي المتميز الذي تقدمه مدرستنا، ويؤكد التزامنا الراسخ بإعداد جيل إماراتي قادر على المنافسة في عصر الذكاء الاصطناعي والتقنية المتقدمة. نحن فخورون بأبنائنا الطلاب وبمعلمينا الذين يبذلون جهوداً كبيرة في سبيل تطوير مهاراتهم."</p><h2>الفريق الفائز</h2><p>يتكون الفريق الفائز من: عبدالله محمد كقائد للفريق، وخالد أحمد كمهندس برمجيات، ومحمد ناصر كمصمم ميكانيكا، وسلطان يوسف كمختبر للنظام. وقد أثنت لجنة التحكيم المكونة من خبراء في مجال الذكاء الاصطناعي على مستوى الابتكار وقدرة الفريق على حل مشكلات حقيقية تمس فئات المجتمع.</p>`,
      status: ArticleStatus.PUBLISHED,
      featured: true,
      views: 423,
      readTime: 5,
      authorId: teacher1.id,
      categoryId: categories[1].id,
      publishedAt: new Date('2026-05-15'),
    },
    {
      title: 'احتفالية يوم الاتحاد في ساحة مدرسة الرازي',
      slug: 'uae-national-day-celebration-2025',
      excerpt: 'أقامت مدرسة الرازي بنين احتفالية رائعة بمناسبة اليوم الوطني الـ54 لدولة الإمارات العربية المتحدة',
      content: `<h2>الاحتفال باليوم الوطني المجيد</h2><p>ارتدت مدرسة الرازي بنين للحلقة الثانية حلّة من الفرح والاحتفاء في ذكرى اليوم الوطني الـ54 لدولة الإمارات العربية المتحدة الشامخة. وقد زُيّنت جنبات المدرسة بالأعلام الوطنية وألوان علم الدولة في مشهد بهيج يعكس الانتماء الحقيقي لهذا الوطن العزيز.</p><h2>فقرات الاحتفالية</h2><p>تضمنت الاحتفالية فقرات متنوعة وشيّقة، أبرزها عرض للفنون الشعبية الإماراتية الأصيلة، وإنشاد الأناشيد الوطنية، وفقرات إبداعية قدّمها الطلاب تُجسّد مسيرة الإمارات وإنجازاتها الباهرة على مدى أكثر من خمسة عقود من الازدهار والتقدم.</p>`,
      status: ArticleStatus.PUBLISHED,
      featured: false,
      views: 312,
      readTime: 4,
      authorId: editor.id,
      categoryId: categories[3].id,
      publishedAt: new Date('2025-12-02'),
    },
    {
      title: 'مشروع طلابي مبتكر لتنقية المياه بالطاقة الشمسية',
      slug: 'water-purification-solar-project',
      excerpt: 'ابتكر طلاب الصف التاسع مشروعاً فريداً لتنقية المياه الجوفية باستخدام ألواح شمسية محلية الصنع',
      content: `<h2>الابتكار في خدمة البيئة</h2><p>أثبت طلاب الصف التاسع بمدرسة الرازي بنين أن الإبداع لا يعرف حدوداً، حين قدّموا مشروعاً بيئياً مبتكراً لتنقية المياه الجوفية باستخدام الطاقة الشمسية النظيفة. المشروع الذي نال إعجاب المختصين يعتمد على تقنية التقطير الشمسي المحسّنة بخوارزميات ذكية للتحكم في العملية.</p><h2>المراحل التقنية للمشروع</h2><p>يعمل النظام عبر ثلاث مراحل رئيسية: جمع أشعة الشمس بكفاءة عالية، وتحويلها إلى حرارة لتبخير الماء، وتكثيف البخار لإنتاج مياه نقية خالية من الشوائب. وقد أظهرت التجارب قدرة النظام على إنتاج ما يصل إلى 15 لتراً يومياً في الظروف المناخية لمنطقة دبي.</p>`,
      status: ArticleStatus.REVIEW,
      featured: false,
      views: 0,
      readTime: 6,
      authorId: teacher2.id,
      categoryId: categories[4].id,
    },
    {
      title: 'الرازي بطل دوري كرة القدم على مستوى المنطقة',
      slug: 'razi-football-championship',
      excerpt: 'حقق فريق كرة القدم لمدرسة الرازي بنين بطولة دوري المنطقة للمرة الثالثة على التوالي',
      content: `<h2>ثلاثية تاريخية</h2><p>كتب فريق كرة القدم لمدرسة الرازي بنين صفحة ذهبية جديدة في تاريخه المشرف، بتحقيقه لقب بطولة دوري المنطقة للمرة الثالثة على التوالي، في إنجاز رياضي نادر يشهد له الجميع بالتميز والمثابرة.</p><h2>نهائي مثير</h2><p>جاء النهائي الحاسم مثيراً للغاية، إذ واجه فريق الرازي منتخب مدرسة القدس في مباراة نارية انتهت بفوز الرازي بثلاثة أهداف مقابل هدف واحد. وقد سجّل الثلاثي أحمد وخالد وسلطان أهداف الفريق في ليلة لا تُنسى.</p>`,
      status: ArticleStatus.PUBLISHED,
      featured: false,
      views: 567,
      readTime: 4,
      authorId: teacher1.id,
      categoryId: categories[5].id,
      publishedAt: new Date('2026-05-05'),
    },
    {
      title: 'ورشة تعلم الآلة للطلاب بالتعاون مع مايكروسوفت',
      slug: 'microsoft-ai-workshop-2026',
      excerpt: 'نظّمت المدرسة ورشة عمل متخصصة في تعلم الآلة والذكاء الاصطناعي بمشاركة خبراء من شركة مايكروسوفت الإمارات',
      content: `<h2>شراكة استراتيجية مع مايكروسوفت</h2><p>في إطار توجهات الإمارات نحو بناء اقتصاد المعرفة وتطوير كفاءات الجيل الجديد، أبرمت مدرسة الرازي بنين شراكة مثمرة مع شركة مايكروسوفت الإمارات لتنظيم ورشة عمل متخصصة في مجال تعلم الآلة والذكاء الاصطناعي استفاد منها أكثر من 120 طالباً.</p><h2>محاور الورشة</h2><p>غطّت الورشة التي امتدت على مدى يومين كاملين محاور متعددة تشمل: أساسيات الذكاء الاصطناعي، وتطبيقات Azure AI، وبناء نماذج التعرف على الصور، وتطوير روبوتات المحادثة الذكية. وقد حصل جميع المشاركين على شهادات معتمدة من مايكروسوفت.</p>`,
      status: ArticleStatus.DRAFT,
      featured: false,
      views: 0,
      readTime: 7,
      authorId: student1.id,
      categoryId: categories[4].id,
    },
    {
      title: 'الفريق الرازي يفوز بأولمبياد الرياضيات الخليجي',
      slug: 'razi-math-olympiad-gulf',
      excerpt: 'تميّز فريق مدرسة الرازي في المسابقة الخليجية للرياضيات بحصوله على الميدالية الذهبية',
      content: `<h2>ذهبية خليجية</h2><p>أضاف طلاب مدرسة الرازي بنين درّة جديدة إلى تاج إنجازاتهم اللامعة، بفوزهم بالميدالية الذهبية في أولمبياد الرياضيات الخليجي الذي استضافته مدينة الشارقة بمشاركة واسعة من دول مجلس التعاون الخليجي الست.</p><p>تمكّن الطالب المتميز يوسف خالد من حل مسألة رياضية بالغة التعقيد في رقم قياسي زمني أبهر لجنة التحكيم الدولية، ليحصد بذلك لقب الفردي بجانب اللقب الجماعي.</p>`,
      status: ArticleStatus.PUBLISHED,
      featured: true,
      views: 289,
      readTime: 5,
      authorId: teacher2.id,
      categoryId: categories[1].id,
      publishedAt: new Date('2026-05-18'),
    },
  ]

  for (const article of articlesData) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    })
  }

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      siteName: 'مجلة الرازي المدرسية الرقمية',
      siteDesc: 'منصة رقمية تفاعلية تعكس إنجازات وأنشطة مدرسة الرازي بنين - الحلقة الثانية',
      email: 'hany.aboueldahab@moe.sch.ae',
      phone: '+971-4-XXX-XXXX',
      address: 'دبي، الإمارات العربية المتحدة',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin credentials: admin@alrazi.ae / password123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
