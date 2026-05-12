'use client'

import Link from 'next/link'
import { FileText, Eye, Users, Clock, TrendingUp, CheckCircle, XCircle, BarChart2, ChevronRight } from 'lucide-react'
import { cn, formatArabicDate, getStatusLabel } from '@/lib/utils'
import toast from 'react-hot-toast'

const stats = [
  { label: 'إجمالي المقالات', value: 142, change: '+8 هذا الشهر', changePos: true, icon: FileText, color: 'bg-blue-50 text-blue-600' },
  { label: 'بانتظار المراجعة', value: 3, change: '⚠️ تحتاج مراجعة', changePos: false, icon: Clock, color: 'bg-orange-50 text-orange-600' },
  { label: 'مقالات منشورة', value: 128, change: 'نسبة نشر 90%', changePos: true, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
  { label: 'مشاهدة هذا الشهر', value: 2840, change: '+340 عن الشهر', changePos: true, icon: Eye, color: 'bg-purple-50 text-purple-600' },
  { label: 'إجمالي المستخدمين', value: 47, change: '+5 جديد', changePos: true, icon: Users, color: 'bg-teal-50 text-teal-600' },
  { label: 'نسبة التفاعل', value: '78%', change: '↑ ممتازة', changePos: true, icon: BarChart2, color: 'bg-pink-50 text-pink-600' },
]

const recentArticles = [
  { id: '1', title: 'طلاب الرازي يحصدون المركز الأول في مسابقة الروبوتيكس', author: 'أحمد السعيد', category: 'إنجازات الطلاب', date: '١٥ مايو ٢٠٢٦', status: 'PUBLISHED', views: 423 },
  { id: '2', title: 'الفريق الرازي يفوز بأولمبياد الرياضيات الخليجي', author: 'سعيد الرشيد', category: 'إنجازات الطلاب', date: '١٨ مايو ٢٠٢٦', status: 'PUBLISHED', views: 289 },
  { id: '3', title: 'مشروع تنقية المياه بالطاقة الشمسية', author: 'خالد العبيدي', category: 'STEM والتقنية', date: '٢٠ مايو ٢٠٢٦', status: 'REVIEW', views: 0 },
  { id: '4', title: 'الرازي بطل دوري كرة القدم', author: 'يوسف الحمادي', category: 'الرياضة والصحة', date: '٥ مايو ٢٠٢٦', status: 'PUBLISHED', views: 567 },
  { id: '5', title: 'ورشة تعلم الآلة مع مايكروسوفت', author: 'عبدالله محمد', category: 'STEM والتقنية', date: '٢٨ أبريل ٢٠٢٦', status: 'DRAFT', views: 0 },
]

const pendingReview = [
  { id: '3', title: 'مشروع تنقية المياه بالطاقة الشمسية', author: 'خالد العبيدي', category: 'STEM', excerpt: 'ابتكر طلاب الصف التاسع مشروعاً فريداً لتنقية المياه...' },
  { id: '6', title: 'زيارة فريق أولمبياد الإمارات للعلوم', author: 'أحمد السعيد', category: 'أخبار المدرسة', excerpt: 'استقبلت المدرسة وفداً من الفريق الوطني لأولمبياد العلوم...' },
  { id: '7', title: 'بطولة الشطرنج المدرسية السنوية', author: 'محمد ناصر', category: 'فعاليات', excerpt: 'أسدل الستار على النسخة السنوية لبطولة الشطرنج...' },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  PUBLISHED: { label: 'منشور', className: 'status-published' },
  REVIEW: { label: 'قيد المراجعة', className: 'status-review' },
  DRAFT: { label: 'مسودة', className: 'status-draft' },
  REJECTED: { label: 'مرفوض', className: 'status-rejected' },
}

export default function AdminDashboard() {
  const handleApprove = (id: string) => toast.success(`✅ تم قبول المقال #${id} ونشره!`)
  const handleReject = (id: string) => toast.error(`❌ تم رفض المقال #${id}`)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">لوحة المعلومات</h1>
          <p className="text-sm text-gray-500 mt-1">مرحباً، الأستاذ هاني أبو الدهب 👋</p>
        </div>
        <Link href="/editor" className="btn btn-primary text-sm">
          + مقال جديد
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.color)}>
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-black text-gray-900">{typeof stat.value === 'number' ? stat.value.toLocaleString('ar-AE') : stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</div>
            <div className={cn('text-xs mt-1 font-medium', stat.changePos ? 'text-green-600' : 'text-orange-600')}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent articles table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <FileText size={16} style={{ color: 'var(--primary)' }} /> أحدث المقالات
            </h2>
            <Link href="/admin/articles" className="text-xs font-semibold text-primary-DEFAULT hover:underline flex items-center gap-1">
              عرض الكل <ChevronRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>العنوان</th>
                  <th>الكاتب</th>
                  <th>القسم</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article) => {
                  const sc = statusConfig[article.status]
                  return (
                    <tr key={article.id}>
                      <td className="max-w-[200px]">
                        <p className="truncate font-medium text-gray-900 text-xs">{article.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{article.date}</p>
                      </td>
                      <td className="text-xs text-gray-600">{article.author}</td>
                      <td>
                        <span className="badge badge-primary text-xs">{article.category}</span>
                      </td>
                      <td>
                        <span className={sc.className}>{sc.label}</span>
                      </td>
                      <td>
                        <div className="flex gap-1.5">
                          <Link href="/article/razi-robotics-championship-2026"
                            className="btn btn-ghost btn-sm text-xs px-2 py-1">عرض</Link>
                          <button className="btn btn-ghost btn-sm text-xs px-2 py-1 text-blue-600">تعديل</button>
                          {article.status === 'REVIEW' && (
                            <>
                              <button onClick={() => handleApprove(article.id)}
                                className="btn btn-sm text-xs px-2 py-1 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-lg">قبول</button>
                              <button onClick={() => handleReject(article.id)}
                                className="btn btn-sm text-xs px-2 py-1 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg">رفض</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending review */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Clock size={16} className="text-orange-500" /> بانتظار المراجعة
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                {pendingReview.length}
              </span>
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingReview.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="badge badge-warning text-xs">{item.category}</span>
                </div>
                <h3 className="text-xs font-bold text-gray-900 leading-snug mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.excerpt}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-colors">
                    <CheckCircle size={12} /> قبول
                  </button>
                  <button onClick={() => handleReject(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors">
                    <XCircle size={12} /> رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'تحميل المجلة PDF', icon: '📄', href: '/archive', color: 'from-blue-500 to-blue-700' },
          { label: 'إضافة مقال', icon: '✍️', href: '/editor', color: 'from-amber-500 to-yellow-600' },
          { label: 'إدارة المستخدمين', icon: '👥', href: '/admin/users', color: 'from-purple-500 to-violet-700' },
          { label: 'إعدادات المجلة', icon: '⚙️', href: '/admin/settings', color: 'from-teal-500 to-cyan-700' },
        ].map((action) => (
          <Link key={action.label} href={action.href}
            className={cn('flex flex-col items-center justify-center gap-3 p-5 rounded-2xl text-white font-bold text-sm bg-gradient-to-br hover:scale-105 transition-transform shadow-card', action.color)}>
            <span className="text-3xl">{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
