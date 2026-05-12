'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/article/ArticleCard'
import { Heart, Eye, Clock, Share2, Download, QrCode, ArrowRight, MessageCircle, Send } from 'lucide-react'
import { formatArabicDate, getInitials } from '@/lib/utils'
import { generateArticlePDF } from '@/lib/pdf'
import toast from 'react-hot-toast'

const article = {
  id: '1', title: 'طلاب الرازي يحصدون المركز الأول في مسابقة الروبوتيكس على مستوى إمارة دبي',
  slug: 'razi-robotics-championship-2026',
  excerpt: 'حقق طلاب مدرسة الرازي بنين إنجازاً باهراً بفوزهم بالمركز الأول في مسابقة الروبوتيكس والذكاء الاصطناعي.',
  content: `<h2>إنجاز يفخر به أبناء الرازي</h2><p>في مشهد احتفالي بهيج، رفع طلاب مدرسة الرازي بنين للحلقة الثانية كأس الفوز في مسابقة الروبوتيكس والذكاء الاصطناعي على مستوى إمارة دبي، محققين بذلك إنجازاً لافتاً يضاف إلى سجل المدرسة الحافل بالنجاحات.</p><h2>تفاصيل المشروع الفائز</h2><p>شارك في المسابقة فريق من أربعة طلاب من الصف الثامن، قضوا أشهراً في التدريب المكثف تحت إشراف المعلم سعيد الرشيد. قدّم الفريق مشروعاً مبتكراً لروبوت يساعد ذوي الاحتياجات الخاصة في التنقل داخل المباني.</p><h2>كلمة مدير المدرسة</h2><p>قال مدير المدرسة الأستاذ محمد العامري: "هذا الإنجاز يعكس مستوى التعليم المتميز الذي تقدمه مدرستنا، ويؤكد التزامنا بإعداد جيل قادر على المنافسة في عصر الذكاء الاصطناعي."</p><h2>الفريق الفائز</h2><p>يتكون الفريق الفائز من: عبدالله محمد (قائد الفريق)، وخالد أحمد (مهندس البرمجيات)، ومحمد ناصر (مصمم الميكانيكا)، وسلطان يوسف (مختبر النظام). أثنت لجنة التحكيم على مستوى الابتكار وقدرة الفريق على حل المشكلات الحقيقية.</p>`,
  coverImage: null, status: 'PUBLISHED' as const, featured: true,
  publishedAt: new Date('2026-05-15'), createdAt: new Date(), updatedAt: new Date(),
  views: 423, readTime: 5,
  author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, bio: 'منسق التعليم التقني', createdAt: new Date() },
  category: { id: 'c2', name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 },
  _count: { comments: 3, likes: 47 },
}

const relatedArticles = [
  { id: '2', title: 'الفريق الرازي يفوز بأولمبياد الرياضيات الخليجي', slug: 'razi-math-olympiad', excerpt: 'تميّز فريق مدرسة الرازي بالميدالية الذهبية في المسابقة الخليجية للرياضيات', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-18'), createdAt: new Date(), updatedAt: new Date(), views: 289, readTime: 5, author: { id: 'a2', name: 'سعيد الرشيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c2', name: 'إنجازات الطلاب', slug: 'achievements', icon: '🏆', color: '#C9A227', order: 2 }, _count: { comments: 5, likes: 89 } },
  { id: '4', title: 'الرازي بطل دوري كرة القدم على مستوى المنطقة', slug: 'razi-football-2026', excerpt: 'حقق فريق الرازي بطولة دوري المنطقة للمرة الثالثة على التوالي', content: '', coverImage: null, status: 'PUBLISHED' as const, featured: false, publishedAt: new Date('2026-05-05'), createdAt: new Date(), updatedAt: new Date(), views: 567, readTime: 4, author: { id: 'a1', name: 'أحمد السعيد', email: '', role: 'TEACHER' as const, createdAt: new Date() }, category: { id: 'c6', name: 'الرياضة والصحة', slug: 'sports', icon: '⚽', color: '#00838F', order: 6 }, _count: { comments: 12, likes: 213 } },
]

const initialComments = [
  { id: 'c1', content: 'إنجاز رائع يفخر به كل أبناء مدرسة الرازي! أتمنى للفريق مزيداً من النجاح 🎉', createdAt: new Date(Date.now() - 7200000), approved: true, author: { id: 'u1', name: 'عبدالرحمن الحمادي', email: '', role: 'STUDENT' as const, createdAt: new Date() }, articleId: '1' },
  { id: 'c2', content: 'ما شاء الله، جهد كبير وثمرة حلوة. نحن نفخر بكم يا أبطال الرازي!', createdAt: new Date(Date.now() - 18000000), approved: true, author: { id: 'u2', name: 'خالد المنصوري', email: '', role: 'TEACHER' as const, createdAt: new Date() }, articleId: '1' },
  { id: 'c3', content: 'تهانينا للفريق وللمعلم المشرف. هذا هو التعليم الحقيقي الذي يصنع الأجيال.', createdAt: new Date(Date.now() - 86400000), approved: true, author: { id: 'u3', name: 'منى الزهراني', email: '', role: 'TEACHER' as const, createdAt: new Date() }, articleId: '1' },
]

export default function ArticlePage() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(article._count.likes)
  const [comments, setComments] = useState(initialComments)
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    if (!liked) toast.success('تم تسجيل إعجابك! ❤️')
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('تم نسخ الرابط! 🔗')
    }
  }

  const handlePDF = () => {
    generateArticlePDF({
      title: article.title,
      author: article.author.name,
      category: article.category.name,
      date: formatArabicDate(article.publishedAt!),
      excerpt: article.excerpt,
      content: article.content,
      views: article.views,
    })
    toast.success('جاري تحميل PDF... 📄')
  }

  const handleAddComment = () => {
    if (!commentText.trim()) { toast.error('اكتب تعليقاً أولاً'); return }
    setComments([{
      id: `c${Date.now()}`,
      content: commentText,
      createdAt: new Date(),
      approved: true,
      author: { id: 'me', name: 'أنت', email: '', role: 'STUDENT' as const, createdAt: new Date() },
      articleId: article.id
    }, ...comments])
    setCommentText('')
    toast.success('تم إضافة تعليقك ✅')
  }

  const timeAgo = (date: Date) => {
    const diffMs = Date.now() - date.getTime()
    const h = Math.floor(diffMs / 3600000)
    if (h < 1) return 'منذ دقائق'
    if (h < 24) return `منذ ${h} ساعة`
    if (h < 48) return 'أمس'
    return formatArabicDate(date)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-16 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A227, transparent 60%), radial-gradient(circle at 70% 30%, #fff, transparent 50%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          {/* Category */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#F0C040' }}>
              {article.category.icon} {article.category.name}
            </span>
          </div>
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-snug mb-6"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            {article.title}
          </h1>
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-DEFAULT"
                style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)' }}>
                {getInitials(article.author.name)}
              </div>
              {article.author.name}
            </span>
            <span className="flex items-center gap-1"><Clock size={14} />{article.readTime} دقائق للقراءة</span>
            <span className="flex items-center gap-1"><Eye size={14} />{article.views} مشاهدة</span>
            <span>{formatArabicDate(article.publishedAt!)}</span>
          </div>
        </div>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #C9A227 30%, #F0C040 50%, #C9A227 70%, transparent)' }} />
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Cover image placeholder */}
            <div className="rounded-2xl overflow-hidden mb-8 h-64 flex items-center justify-center text-7xl"
              style={{ background: 'linear-gradient(135deg,#E3F2FD,#BBDEFB)' }}>
              🏆
            </div>

            {/* Content */}
            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Action bar */}
            <div className="flex flex-wrap items-center gap-3 py-5 border-t border-b border-gray-100 my-8">
              <button
                onClick={handleLike}
                className={`btn btn-sm flex items-center gap-2 transition-all ${liked ? 'bg-red-50 border-red-300 text-red-500' : 'btn-outline'}`}>
                <Heart size={15} className={liked ? 'fill-red-500' : ''} />
                {likeCount} إعجاب
              </button>
              <button onClick={handleShare} className="btn btn-outline btn-sm">
                <Share2 size={15} /> مشاركة
              </button>
              <button onClick={handlePDF} className="btn btn-outline btn-sm">
                <Download size={15} /> PDF
              </button>
              <button onClick={() => toast.success('تم إنشاء QR Code! 📱')} className="btn btn-outline btn-sm">
                <QrCode size={15} /> QR
              </button>
            </div>

            {/* Author card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-light))' }}>
                  {getInitials(article.author.name)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{article.author.name}</div>
                  <div className="text-sm text-gray-500">{article.author.bio || 'كاتب في مجلة الرازي'}</div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle size={20} style={{ color: 'var(--primary)' }} />
                التعليقات
                <span className="text-sm font-normal text-gray-400">({comments.length})</span>
              </h3>

              {/* Comment form */}
              <div className="mb-6">
                <textarea
                  className="textarea mb-3"
                  placeholder="اكتب تعليقك هنا..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleAddComment} className="btn btn-primary">
                  <Send size={15} /> إرسال التعليق
                </button>
              </div>

              {/* Comments list */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: 'var(--primary)' }}>
                      {getInitials(comment.author.name)}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-gray-900">{comment.author.name}</span>
                        <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article info */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
              <h4 className="font-bold text-gray-900 mb-4 text-sm">معلومات المقال</h4>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'القسم', value: `${article.category.icon} ${article.category.name}` },
                  { label: 'الكاتب', value: article.author.name },
                  { label: 'تاريخ النشر', value: formatArabicDate(article.publishedAt!) },
                  { label: 'وقت القراءة', value: `${article.readTime} دقائق` },
                  { label: 'المشاهدات', value: article.views.toLocaleString('ar-AE') },
                  { label: 'الإعجابات', value: likeCount },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">مقالات ذات صلة</h4>
              <div className="space-y-2">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="btn btn-outline inline-flex items-center gap-2">
            <ArrowRight size={15} /> العودة للرئيسية
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
