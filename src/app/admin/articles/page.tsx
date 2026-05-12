'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter, Plus, Eye, Edit, Trash2, CheckCircle, XCircle, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const allArticles = [
  { id: '1', title: 'طلاب الرازي يحصدون المركز الأول في مسابقة الروبوتيكس', author: 'أحمد السعيد', category: 'إنجازات الطلاب', date: '١٥ مايو ٢٠٢٦', status: 'PUBLISHED', views: 423, likes: 47 },
  { id: '2', title: 'الفريق الرازي يفوز بأولمبياد الرياضيات الخليجي', author: 'سعيد الرشيد', category: 'إنجازات الطلاب', date: '١٨ مايو ٢٠٢٦', status: 'PUBLISHED', views: 289, likes: 89 },
  { id: '3', title: 'مشروع تنقية المياه بالطاقة الشمسية', author: 'خالد العبيدي', category: 'STEM والتقنية', date: '٢٠ مايو ٢٠٢٦', status: 'REVIEW', views: 0, likes: 0 },
  { id: '4', title: 'الرازي بطل دوري كرة القدم على مستوى المنطقة', author: 'يوسف الحمادي', category: 'الرياضة والصحة', date: '٥ مايو ٢٠٢٦', status: 'PUBLISHED', views: 567, likes: 213 },
  { id: '5', title: 'ورشة تعلم الآلة بالتعاون مع مايكروسوفت', author: 'عبدالله محمد', category: 'STEM والتقنية', date: '٢٨ أبريل ٢٠٢٦', status: 'DRAFT', views: 0, likes: 0 },
  { id: '6', title: 'مسرحية الوفاء والكرم في مهرجان الفنون', author: 'فاطمة النعيمي', category: 'الثقافة والأدب', date: '١ مايو ٢٠٢٦', status: 'PUBLISHED', views: 187, likes: 54 },
  { id: '7', title: 'زيارة فريق أولمبياد الإمارات للعلوم', author: 'أحمد السعيد', category: 'أخبار المدرسة', date: '١٢ مايو ٢٠٢٦', status: 'REVIEW', views: 0, likes: 0 },
  { id: '8', title: 'بطولة الشطرنج المدرسية السنوية', author: 'محمد ناصر', category: 'الفعاليات', date: '١٠ مايو ٢٠٢٦', status: 'REVIEW', views: 0, likes: 0 },
  { id: '9', title: 'رحلة إلى متحف المستقبل بدبي', author: 'أحمد السعيد', category: 'الفعاليات', date: '٢٠ أبريل ٢٠٢٦', status: 'PUBLISHED', views: 276, likes: 134 },
  { id: '10', title: 'احتفالية اليوم الوطني الـ54', author: 'فاطمة النعيمي', category: 'الهوية الوطنية', date: '٢ ديسمبر ٢٠٢٥', status: 'PUBLISHED', views: 312, likes: 145 },
]

const statusConfig: Record<string, { label: string; cls: string }> = {
  PUBLISHED: { label: 'منشور', cls: 'status-published' },
  REVIEW: { label: 'قيد المراجعة', cls: 'status-review' },
  DRAFT: { label: 'مسودة', cls: 'status-draft' },
  REJECTED: { label: 'مرفوض', cls: 'status-rejected' },
}

type Status = 'ALL' | 'PUBLISHED' | 'REVIEW' | 'DRAFT' | 'REJECTED'

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(allArticles)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status>('ALL')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch = !search || a.title.includes(search) || a.author.includes(search) || a.category.includes(search)
      const matchStatus = statusFilter === 'ALL' || a.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [articles, search, statusFilter])

  const toggleSelect = (id: string) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

  const selectAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((a) => a.id))

  const handleApprove = (id: string) => {
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: 'PUBLISHED' } : a))
    toast.success('✅ تم نشر المقال بنجاح!')
  }

  const handleReject = (id: string) => {
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: 'REJECTED' } : a))
    toast.error('❌ تم رفض المقال')
  }

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
    setSelected((s) => s.filter((x) => x !== id))
    toast.success('🗑️ تم حذف المقال')
  }

  const counts = {
    ALL: articles.length,
    PUBLISHED: articles.filter((a) => a.status === 'PUBLISHED').length,
    REVIEW: articles.filter((a) => a.status === 'REVIEW').length,
    DRAFT: articles.filter((a) => a.status === 'DRAFT').length,
    REJECTED: articles.filter((a) => a.status === 'REJECTED').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">📝 إدارة المقالات</h1>
          <p className="text-sm text-gray-500 mt-1">{articles.length} مقال إجمالاً</p>
        </div>
        <Link href="/editor" className="btn btn-primary">
          <Plus size={16} /> مقال جديد
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {([
          ['ALL', 'الكل'],
          ['PUBLISHED', 'منشور'],
          ['REVIEW', 'قيد المراجعة'],
          ['DRAFT', 'مسودة'],
          ['REJECTED', 'مرفوض'],
        ] as [Status, string][]).map(([val, label]) => (
          <button key={val} onClick={() => setStatusFilter(val)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              statusFilter === val
                ? 'bg-primary-DEFAULT text-white shadow-primary'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-DEFAULT/30'
            )}>
            {label}
            <span className={cn(
              'w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold',
              statusFilter === val ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            )}>
              {counts[val]}
            </span>
          </button>
        ))}
      </div>

      {/* Search + bulk */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 mb-5">
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input pr-10 text-sm" placeholder="بحث في المقالات..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{selected.length} محدد</span>
              <button onClick={() => { selected.forEach(handleApprove); setSelected([]) }}
                className="btn btn-sm bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded-lg px-3 py-2">
                <CheckCircle size={14} /> قبول الكل
              </button>
              <button onClick={() => { selected.forEach(handleDelete); setSelected([]) }}
                className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg px-3 py-2">
                <Trash2 size={14} /> حذف الكل
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-10">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={selectAll}
                    className="rounded border-gray-300 text-primary-DEFAULT cursor-pointer" />
                </th>
                <th>العنوان</th>
                <th>الكاتب</th>
                <th>القسم</th>
                <th>التاريخ</th>
                <th>مشاهدات</th>
                <th>إعجابات</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    <div className="text-4xl mb-2">📭</div>
                    <p>لا توجد مقالات مطابقة</p>
                  </td>
                </tr>
              ) : filtered.map((article) => {
                const sc = statusConfig[article.status]
                return (
                  <tr key={article.id} className={selected.includes(article.id) ? 'bg-blue-50/50' : ''}>
                    <td>
                      <input type="checkbox" checked={selected.includes(article.id)}
                        onChange={() => toggleSelect(article.id)}
                        className="rounded border-gray-300 text-primary-DEFAULT cursor-pointer" />
                    </td>
                    <td>
                      <p className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2 max-w-xs">{article.title}</p>
                    </td>
                    <td className="text-xs text-gray-600 whitespace-nowrap">{article.author}</td>
                    <td><span className="badge badge-primary text-xs">{article.category}</span></td>
                    <td className="text-xs text-gray-500 whitespace-nowrap">{article.date}</td>
                    <td className="text-xs text-gray-600 font-medium">{article.views.toLocaleString('ar-AE')}</td>
                    <td className="text-xs text-gray-600 font-medium">{article.likes}</td>
                    <td><span className={sc.cls}>{sc.label}</span></td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link href="/article/razi-robotics-championship-2026"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Eye size={13} />
                        </Link>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                          onClick={() => toast.success('فتح محرر المقال...')}>
                          <Edit size={13} />
                        </button>
                        {article.status === 'REVIEW' && (
                          <>
                            <button onClick={() => handleApprove(article.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                              <CheckCircle size={13} />
                            </button>
                            <button onClick={() => handleReject(article.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                              <XCircle size={13} />
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDelete(article.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>عرض {filtered.length} من {articles.length} مقال</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p}
                className={cn('w-8 h-8 rounded-lg text-sm font-medium transition-all',
                  p === 1 ? 'bg-primary-DEFAULT text-white' : 'hover:bg-gray-100 text-gray-600')}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
