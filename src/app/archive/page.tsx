'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/article/ArticleCard'
import { Search, Filter, Download, Grid, List } from 'lucide-react'
import { generateMagazinePDF } from '@/lib/pdf'
import toast from 'react-hot-toast'

const allArticles = [
  { id: '1', title: 'طلاب الرازي يحصدون المركز الأول في مسابقة الروبوتيكس', slug: 'razi-robotics-2026', excerpt: 'حقق طلاب مدرسة الرازي إنجازاً باهراً بفوزهم بالمركز الأول في مسابقة الروبوتيكس والذكاء الاصطناعي', content: '<p>محتوى المقال...</p>', coverImage: null, status: 'PUBLISHED' as const, featured: true, publishedAt: new Date('2026-05-15'), createdAt: new Date(), updatedAt: new Date(), views: 423, readTime: 5, author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c2', name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 }, _count: { comments: 3, likes: 47 } },
  { id: '2', title: 'الفريق الرازي يفوز بأولمبياد الرياضيات الخليجي', slug: 'math-olympiad', excerpt: 'تميّز فريق مدرسة الرازي في المسابقة الخليجية للرياضيات بحصوله على الميدالية الذهبية', content: '<p>محتوى المقال...</p>', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-18'), createdAt: new Date(), updatedAt: new Date(), views: 289, readTime: 5, author: { id: 'a2', name: 'سعيد الرشيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c2', name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 }, _count: { comments: 5, likes: 89 } },
  { id: '3', title: 'احتفالية اليوم الوطني الـ54 لدولة الإمارات', slug: 'national-day-2025', excerpt: 'أقامت مدرسة الرازي بنين احتفالية رائعة بمناسبة اليوم الوطني المجيد', content: '<p>محتوى المقال...</p>', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2025-12-02'), createdAt: new Date(), updatedAt: new Date(), views: 312, readTime: 4, author: { id: 'a3', name: 'فاطمة النعيمي', email: '', role: 'EDITOR' as const, createdAt: new Date() }, category: { id: 'c4', name: 'الهوية الوطنية', slug: 'national-identity', icon: '🇦🇪', color: '#EF3340', order: 4 }, _count: { comments: 8, likes: 145 } },
  { id: '4', title: 'الرازي بطل دوري كرة القدم على مستوى المنطقة', slug: 'football-2026', excerpt: 'حقق فريق كرة القدم بطولة دوري المنطقة للمرة الثالثة على التوالي', content: '<p>محتوى المقال...</p>', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-05'), createdAt: new Date(), updatedAt: new Date(), views: 567, readTime: 4, author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c6', name: 'الرياضة والصحة', slug: 'sports', icon: '⚽', color: '#00838F', order: 6 }, _count: { comments: 12, likes: 213 } },
  { id: '5', title: 'ورشة تعلم الآلة بالتعاون مع مايكروسوفت الإمارات', slug: 'microsoft-ai', excerpt: 'نظّمت المدرسة ورشة عمل متخصصة في الذكاء الاصطناعي بمشاركة خبراء مايكروسوفت', content: '<p>محتوى المقال...</p>', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-04-28'), createdAt: new Date(), updatedAt: new Date(), views: 198, readTime: 7, author: { id: 'a2', name: 'سعيد الرشيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c5', name: 'STEM والتقنية', slug: 'stem', icon: '🔬', color: '#1565C0', order: 5 }, _count: { comments: 6, likes: 98 } },
  { id: '6', title: 'مسرحية الوفاء والكرم في مهرجان الفنون المدرسي', slug: 'arts-festival', excerpt: 'عرضت المدرسة مسرحية رائعة تُجسّد القيم الإماراتية في مهرجان الفنون السنوي', content: '<p>محتوى المقال...</p>', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-01'), createdAt: new Date(), updatedAt: new Date(), views: 187, readTime: 4, author: { id: 'a3', name: 'فاطمة النعيمي', email: '', role: 'EDITOR' as const, createdAt: new Date() }, category: { id: 'c7', name: 'الثقافة والأدب', slug: 'culture', icon: '📚', color: '#6A1B9A', order: 7 }, _count: { comments: 4, likes: 54 } },
]

const categories = [
  { label: 'الكل', slug: '' },
  { label: 'أخبار المدرسة', slug: 'school-news', icon: '📰' },
  { label: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆' },
  { label: 'الفعاليات', slug: 'events', icon: '🎉' },
  { label: 'الهوية الوطنية', slug: 'national-identity', icon: '🇦🇪' },
  { label: 'STEM والتقنية', slug: 'stem', icon: '🔬' },
  { label: 'الرياضة', slug: 'sports', icon: '⚽' },
  { label: 'الثقافة', slug: 'culture', icon: '📚' },
]

type SortOption = 'newest' | 'popular' | 'most-liked'

export default function ArchivePage() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let result = [...allArticles]
    if (selectedCat) result = result.filter((a) => a.category.slug === selectedCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((a) =>
        a.title.includes(q) || a.excerpt.includes(q) || a.category.name.includes(q) || a.author.name.includes(q)
      )
    }
    if (sort === 'newest') result.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
    else if (sort === 'popular') result.sort((a, b) => b.views - a.views)
    else if (sort === 'most-liked') result.sort((a, b) => (b._count.likes) - (a._count.likes))
    return result
  }, [search, selectedCat, sort])

  const handleDownloadMagazine = () => {
    generateMagazinePDF(allArticles.map((a) => ({
      title: a.title, author: a.author.name, category: a.category.name,
      date: a.publishedAt!.toLocaleDateString('ar-AE'),
      excerpt: a.excerpt, content: a.content,
    })))
    toast.success('جاري تحضير ملف PDF للمجلة... 📖')
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="section-tag inline-flex" style={{ background: 'rgba(201,162,39,0.2)', borderColor: 'rgba(201,162,39,0.35)', color: '#F0C040' }}>
            📁 الأرشيف
          </div>
          <h1 className="text-4xl font-black text-white mt-4 mb-3">أرشيف المجلة</h1>
          <p className="text-white/70 text-sm mb-8">تصفح جميع أعداد ومقالات مجلة الرازي المدرسية</p>
          <button onClick={handleDownloadMagazine}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-DEFAULT transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)' }}>
            <Download size={17} /> تحميل العدد الكامل PDF
          </button>
        </div>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #C9A227 30%, #F0C040 50%, #C9A227 70%, transparent)' }} />
      </div>

      <div className="section">
        {/* Search + filters bar */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن مقال، كاتب، قسم..."
                className="input pr-11"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Sort */}
            <select
              className="select md:w-48"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}>
              <option value="newest">الأحدث أولاً</option>
              <option value="popular">الأكثر مشاهدة</option>
              <option value="most-liked">الأكثر إعجاباً</option>
            </select>
            {/* View toggle */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button onClick={() => setView('grid')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${view === 'grid' ? 'bg-white shadow text-primary-DEFAULT' : 'text-gray-500'}`}>
                <Grid size={15} /> شبكة
              </button>
              <button onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-white shadow text-primary-DEFAULT' : 'text-gray-500'}`}>
                <List size={15} /> قائمة
              </button>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCat(cat.slug)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCat === cat.slug
                ? 'text-white shadow-primary'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-DEFAULT/30 hover:text-primary-DEFAULT'}`}
              style={selectedCat === cat.slug ? { background: 'var(--primary)' } : {}}>
              {cat.icon && <span>{cat.icon}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">{filtered.length}</span> مقال
            {search && <span> عن "<span className="font-bold text-primary-DEFAULT">{search}</span>"</span>}
          </p>
          {(search || selectedCat) && (
            <button
              onClick={() => { setSearch(''); setSelectedCat('') }}
              className="text-xs text-primary-DEFAULT hover:underline flex items-center gap-1">
              <Filter size={12} /> مسح الفلاتر
            </button>
          )}
        </div>

        {/* Articles grid / list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-400 text-sm">جرب كلمات بحث مختلفة أو غيّر الفلتر</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal"
                className="bg-white border border-gray-100 rounded-2xl shadow-sm" />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
