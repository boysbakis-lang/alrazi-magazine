import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/article/ArticleCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ArrowLeft, BookOpen, Download, ChevronRight, Sparkles, TrendingUp, Users, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'مجلة الرازي المدرسية الرقمية',
  description: 'منصة رقمية لمدرسة الرازي بنين - الحلقة الثانية',
}

// Demo data (replace with DB queries in production)
const featuredArticle = {
  id: '1', title: 'طلاب الرازي يحصدون المركز الأول في مسابقة الروبوتيكس على مستوى إمارة دبي',
  slug: 'razi-robotics-championship-2026',
  excerpt: 'حقق طلاب مدرسة الرازي بنين إنجازاً باهراً بفوزهم بالمركز الأول في مسابقة الروبوتيكس والذكاء الاصطناعي التي أقيمت في مركز دبي للذكاء الاصطناعي، متفوقين على أكثر من 45 مدرسة إماراتية.',
  content: '', coverImage: null, status: 'PUBLISHED' as const, featured: true,
  publishedAt: new Date('2026-05-15'), createdAt: new Date('2026-05-15'), updatedAt: new Date(),
  views: 423, readTime: 5,
  author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, createdAt: new Date() },
  category: { id: 'c2', name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 },
  _count: { comments: 3, likes: 47 },
}

const latestArticles = [
  { id: '2', title: 'الفريق الرازي يفوز بأولمبياد الرياضيات الخليجي', slug: 'razi-math-olympiad-gulf', excerpt: 'تميّز فريق مدرسة الرازي في المسابقة الخليجية للرياضيات بحصوله على الميدالية الذهبية في إنجاز تاريخي', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-18'), createdAt: new Date(), updatedAt: new Date(), views: 289, readTime: 5, author: { id: 'a2', name: 'سعيد الرشيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c2', name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 }, _count: { comments: 5, likes: 89 } },
  { id: '3', title: 'احتفالية يوم الاتحاد في ساحة مدرسة الرازي', slug: 'uae-national-day-2025', excerpt: 'أقامت مدرسة الرازي بنين احتفالية رائعة بمناسبة اليوم الوطني الـ54 لدولة الإمارات العربية المتحدة', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2025-12-02'), createdAt: new Date(), updatedAt: new Date(), views: 312, readTime: 4, author: { id: 'a3', name: 'فاطمة النعيمي', email: '', role: 'EDITOR' as const, createdAt: new Date() }, category: { id: 'c4', name: 'الهوية الوطنية', slug: 'national-identity', icon: '🇦🇪', color: '#EF3340', order: 4 }, _count: { comments: 8, likes: 145 } },
  { id: '4', title: 'الرازي بطل دوري كرة القدم على مستوى المنطقة', slug: 'razi-football-2026', excerpt: 'حقق فريق كرة القدم لمدرسة الرازي بنين بطولة دوري المنطقة للمرة الثالثة على التوالي في إنجاز رياضي نادر', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-05'), createdAt: new Date(), updatedAt: new Date(), views: 567, readTime: 4, author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c6', name: 'الرياضة والصحة', slug: 'sports', icon: '⚽', color: '#00838F', order: 6 }, _count: { comments: 12, likes: 213 } },
  { id: '5', title: 'ورشة تعلم الآلة للطلاب بالتعاون مع مايكروسوفت', slug: 'microsoft-ai-workshop', excerpt: 'نظّمت المدرسة ورشة عمل متخصصة في تعلم الآلة والذكاء الاصطناعي بمشاركة خبراء من شركة مايكروسوفت الإمارات', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-04-28'), createdAt: new Date(), updatedAt: new Date(), views: 198, readTime: 7, author: { id: 'a2', name: 'سعيد الرشيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c5', name: 'STEM والتقنية', slug: 'stem', icon: '🔬', color: '#1565C0', order: 5 }, _count: { comments: 6, likes: 98 } },
  { id: '6', title: 'مسرحية الوفاء والكرم في مهرجان الفنون المدرسي', slug: 'school-arts-festival', excerpt: 'عرضت المدرسة مسرحية رائعة تُجسّد القيم الإماراتية الأصيلة في مهرجان الفنون الإبداعية السنوي', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-01'), createdAt: new Date(), updatedAt: new Date(), views: 187, readTime: 4, author: { id: 'a3', name: 'فاطمة النعيمي', email: '', role: 'EDITOR' as const, createdAt: new Date() }, category: { id: 'c7', name: 'الثقافة والأدب', slug: 'culture', icon: '📚', color: '#6A1B9A', order: 7 }, _count: { comments: 4, likes: 54 } },
  { id: '7', title: 'رحلة تعليمية إلى متحف المستقبل بدبي', slug: 'museum-of-future-trip', excerpt: 'استمتع طلاب الصف السابع برحلة ثقافية وتعليمية مميزة إلى متحف المستقبل في قلب دبي المبدعة', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-04-20'), createdAt: new Date(), updatedAt: new Date(), views: 276, readTime: 3, author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c3', name: 'الفعاليات والأنشطة', slug: 'events', icon: '🎉', color: '#2E7D32', order: 3 }, _count: { comments: 9, likes: 134 } },
]

const categories = [
  { name: 'أخبار المدرسة', slug: 'school-news', icon: '📰', color: '#0A3D7A', count: 24 },
  { name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', count: 18 },
  { name: 'الفعاليات', slug: 'events', icon: '🎉', color: '#2E7D32', count: 31 },
  { name: 'الهوية الوطنية', slug: 'national-identity', icon: '🇦🇪', color: '#EF3340', count: 15 },
  { name: 'STEM والتقنية', slug: 'stem', icon: '🔬', color: '#1565C0', count: 22 },
  { name: 'الرياضة', slug: 'sports', icon: '⚽', color: '#00838F', count: 19 },
  { name: 'الثقافة والأدب', slug: 'culture', icon: '📚', color: '#6A1B9A', count: 13 },
  { name: 'مقالات المعلمين', slug: 'teachers', icon: '👨‍🏫', color: '#37474F', count: 28 },
]

const topWriters = [
  { name: 'أحمد السعيد', role: 'معلم', articles: 24, avatar: 'أح' },
  { name: 'سعيد الرشيد', role: 'معلم', articles: 18, avatar: 'سع' },
  { name: 'فاطمة النعيمي', role: 'محررة', articles: 16, avatar: 'فا' },
  { name: 'عبدالله محمد', role: 'طالب', articles: 5, avatar: 'عب' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #C9A227 0%, transparent 50%), radial-gradient(circle at 75% 20%, #fff 0%, transparent 40%), radial-gradient(circle at 60% 80%, #C9A227 0%, transparent 40%)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* Floating orbs */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #C9A227, transparent)', animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #fff, transparent)', animation: 'float 10s ease-in-out infinite reverse' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Issue badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 animate-fade-up"
            style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.35)' }}>
            <Sparkles size={14} style={{ color: '#F0C040' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#F0C040' }}>العدد السابع عشر • مايو ٢٠٢٦</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-up animate-delay-100"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
            مجلة <span className="text-gradient-gold">الرازي</span>
            <br />المدرسية الرقمية
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-loose mb-10 animate-fade-up animate-delay-200">
            منصة تفاعلية تجمع أخبار وإنجازات مدرسة الرازي بنين للحلقة الثانية في دولة الإمارات العربية المتحدة
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-up animate-delay-300">
            <Link href="/archive" className="btn btn-accent btn-lg">
              <BookOpen size={18} /> استعرض المجلة
            </Link>
            <Link href="/editor"
              className="btn btn-lg text-white border border-white/30 hover:bg-white/10 transition-all">
              ✍️ أضف مقالاً
            </Link>
            <button className="btn btn-lg text-white/80 border border-white/20 hover:bg-white/10 transition-all"
              onClick={() => {}}>
              <Download size={18} /> تحميل PDF
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up animate-delay-400">
            {[
              { target: 142, label: 'مقال منشور', icon: '📝' },
              { target: 38, label: 'كاتب نشط', icon: '✍️' },
              { target: 2840, label: 'قراءة شهرية', icon: '👁️' },
              { target: 17, label: 'عدد صدر', icon: '📚' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter target={stat.target} />
                </div>
                <div className="text-xs text-white/65 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-white/60 text-xs">اسحب للأسفل</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/60" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="section pb-8">
        <div className="text-center mb-10">
          <div className="section-tag"><Star size={12} /> المقال المميز</div>
          <h2 className="section-title">أبرز <span style={{ color: 'var(--primary-light)' }}>المحتوى</span></h2>
        </div>
        <ArticleCard article={featuredArticle} variant="featured" />
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="bg-white py-16">
        <div className="section pt-0 pb-0">
          <div className="text-center mb-10">
            <div className="section-tag">📑 الأقسام</div>
            <h2 className="section-title">تصفح <span style={{ color: 'var(--primary-light)' }}>حسب القسم</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/archive?cat=${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-transparent bg-gray-50 hover:border-primary-DEFAULT/20 hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-center">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <span className="text-xs font-bold text-gray-800 leading-tight">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count} مقال</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      <section className="section">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-tag"><TrendingUp size={12} /> الأحدث</div>
            <h2 className="section-title">آخر <span style={{ color: 'var(--primary-light)' }}>المقالات</span></h2>
            <p className="section-subtitle">تابع أحدث المستجدات والأخبار من مدرستنا</p>
          </div>
          <Link href="/archive" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary-DEFAULT hover:gap-2 transition-all">
            عرض الكل <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/archive" className="btn btn-primary">
            عرض جميع المقالات <ArrowLeft size={16} />
          </Link>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section style={{ background: 'linear-gradient(135deg, #0A3D7A, #1565C0)' }} className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
              style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.35)', color: '#F0C040' }}>
              📊 مدرستنا بالأرقام
            </div>
            <h2 className="text-3xl font-black text-white">
              مدرسة الرازي <span className="text-gradient-gold">بالأرقام</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { target: 847, label: 'طالب ملتحق', icon: '👨‍🎓' },
              { target: 64, label: 'معلم متميز', icon: '👨‍🏫' },
              { target: 93, label: 'جائزة وطنية', icon: '🏅' },
              { target: 12, label: 'مختبر علمي', icon: '🔬' },
              { target: 28, label: 'فعالية سنوية', icon: '📅' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-white">
                  <AnimatedCounter target={stat.target} />
                </div>
                <div className="text-xs text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP WRITERS ===== */}
      <section className="bg-white py-16">
        <div className="section pt-0 pb-0">
          <div className="text-center mb-10">
            <div className="section-tag"><Users size={12} /> الكتّاب</div>
            <h2 className="section-title">أبرز <span style={{ color: 'var(--primary-light)' }}>الكتّاب</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topWriters.map((writer, i) => (
              <div key={writer.name} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-primary-DEFAULT/20 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white text-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
                    {writer.avatar}
                  </div>
                  {i < 3 && (
                    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-DEFAULT"
                      style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)' }}>
                      {i + 1}
                    </div>
                  )}
                </div>
                <div className="font-bold text-gray-900 text-sm">{writer.name}</div>
                <div className="text-xs text-gray-500 mt-1 mb-2">{writer.role}</div>
                <div className="text-xs font-bold px-3 py-1 rounded-full inline-block"
                  style={{ background: 'rgba(10,61,122,0.08)', color: 'var(--primary)' }}>
                  {writer.articles} مقال
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #071E3D, #0A3D7A)' }}>
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A227, transparent 60%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">شارك في صنع المجلة</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-loose">
              هل لديك خبر أو مقال أو إنجاز تريد مشاركته مع زملائك؟ انضم إلى فريق كتّاب مجلة الرازي اليوم!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/editor" className="btn btn-accent btn-lg">
                ✍️ ابدأ الكتابة الآن
              </Link>
              <Link href="/archive"
                className="btn btn-lg border border-white/30 text-white hover:bg-white/10 transition-all">
                📖 تصفح المجلة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
