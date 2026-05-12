'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Eye, MessageSquare, Clock, User, Tag, Edit3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const initialPending = [
  {
    id: '3', title: 'مشروع طلابي مبتكر لتنقية المياه بالطاقة الشمسية',
    author: 'خالد العبيدي', authorRole: 'معلم', category: 'STEM والتقنية',
    submittedAt: 'منذ ٣ ساعات', readTime: 6, wordCount: 820,
    excerpt: 'ابتكر طلاب الصف التاسع بمدرسة الرازي بنين مشروعاً فريداً لتنقية المياه الجوفية باستخدام ألواح شمسية محلية الصنع. يعمل النظام عبر ثلاث مراحل رئيسية ويُنتج ما يصل إلى 15 لتراً يومياً.',
    content: `<h2>الابتكار في خدمة البيئة</h2><p>أثبت طلاب الصف التاسع بمدرسة الرازي بنين أن الإبداع لا يعرف حدوداً، حين قدّموا مشروعاً بيئياً مبتكراً لتنقية المياه الجوفية باستخدام الطاقة الشمسية النظيفة.</p><h2>المراحل التقنية</h2><p>يعمل النظام عبر ثلاث مراحل رئيسية: جمع أشعة الشمس، وتحويلها إلى حرارة لتبخير الماء، وتكثيف البخار لإنتاج مياه نقية.</p>`,
    note: '',
  },
  {
    id: '6', title: 'زيارة فريق أولمبياد الإمارات للعلوم إلى مدرستنا',
    author: 'أحمد السعيد', authorRole: 'معلم', category: 'أخبار المدرسة',
    submittedAt: 'منذ ٥ ساعات', readTime: 4, wordCount: 620,
    excerpt: 'استقبلت مدرسة الرازي بنين وفداً رفيع المستوى من الفريق الوطني لأولمبياد الإمارات للعلوم في زيارة تفقدية وتشجيعية للطلاب الموهوبين.',
    content: `<h2>استقبال الوفد الوطني</h2><p>في جو من الحفاوة والترحيب، استقبلت مدرسة الرازي بنين وفداً من الفريق الوطني لأولمبياد الإمارات للعلوم في زيارة تفقدية.</p>`,
    note: '',
  },
  {
    id: '7', title: 'بطولة الشطرنج المدرسية السنوية الثالثة',
    author: 'محمد ناصر', authorRole: 'طالب', category: 'الفعاليات',
    submittedAt: 'منذ يوم', readTime: 3, wordCount: 450,
    excerpt: 'أسدل الستار على النسخة الثالثة من بطولة الشطرنج المدرسية السنوية بمشاركة واسعة من طلاب جميع الصفوف في منافسات مثيرة.',
    content: `<h2>بطولة استثنائية</h2><p>شهدت مدرسة الرازي بنين النسخة الثالثة من بطولة الشطرنج المدرسية السنوية التي اجتذبت مشاركة واسعة من الطلاب.</p>`,
    note: '',
  },
]

export default function AdminReviewPage() {
  const [items, setItems] = useState(initialPending)
  const [selected, setSelected] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const selectedItem = items.find((i) => i.id === selected)

  const handleApprove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    setSelected(null)
    toast.success('✅ تم قبول المقال ونشره بنجاح!')
  }

  const handleReject = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    setSelected(null)
    toast.error('❌ تم رفض المقال وإعادته للكاتب')
  }

  const handleApproveWithNote = (id: string) => {
    const note = notes[id]
    if (note?.trim()) toast.success(`✅ تم القبول مع ملاحظة: "${note.slice(0, 30)}..."`)
    else toast.success('✅ تم قبول المقال!')
    setItems((prev) => prev.filter((i) => i.id !== id))
    setSelected(null)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Clock size={22} style={{ color: 'var(--accent)' }} /> مراجعة المقالات
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length > 0
              ? <><span className="font-bold text-orange-600">{items.length}</span> مقالات بانتظار مراجعتك</>
              : 'لا توجد مقالات بانتظار المراجعة ✅'}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-16 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-lg font-bold text-gray-700 mb-2">جميع المقالات تمت مراجعتها</h2>
          <p className="text-sm text-gray-400">لا توجد مقالات جديدة تحتاج إلى مراجعة الآن</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id}
                onClick={() => setSelected(item.id)}
                className={cn(
                  'bg-white rounded-2xl border p-4 cursor-pointer transition-all',
                  selected === item.id
                    ? 'border-primary-DEFAULT shadow-card-hover ring-1 ring-primary-DEFAULT/20'
                    : 'border-gray-100 shadow-card hover:border-gray-200 hover:shadow-card-hover'
                )}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                    style={{ background: 'var(--primary)' }}>
                    {item.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User size={11} />{item.author}</span>
                      <span className="flex items-center gap-1"><Tag size={11} />{item.category}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{item.submittedAt}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={(e) => { e.stopPropagation(); handleApprove(item.id) }}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-colors">
                        <CheckCircle size={12} /> قبول
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleReject(item.id) }}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors">
                        <XCircle size={12} /> رفض
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            {selectedItem ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden sticky top-20">
                {/* Header */}
                <div className="p-5 border-b border-gray-100" style={{ background: 'linear-gradient(135deg,#F4F7FC,#fff)' }}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="badge badge-warning mb-2">⏳ بانتظار المراجعة</span>
                      <h2 className="text-base font-black text-gray-900 leading-snug">{selectedItem.title}</h2>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><User size={12} />{selectedItem.author} • {selectedItem.authorRole}</span>
                    <span className="flex items-center gap-1"><Tag size={12} />{selectedItem.category}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{selectedItem.readTime} دقائق قراءة</span>
                    <span className="flex items-center gap-1"><Edit3 size={12} />{selectedItem.wordCount} كلمة</span>
                    <span>{selectedItem.submittedAt}</span>
                  </div>
                </div>

                {/* Content preview */}
                <div className="p-5 border-b border-gray-100 max-h-64 overflow-y-auto">
                  <p className="text-sm font-semibold text-gray-700 mb-2">📄 ملخص المقال</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{selectedItem.excerpt}</p>
                  <button
                    onClick={() => setExpandedId(expandedId === selectedItem.id ? null : selectedItem.id)}
                    className="text-xs text-primary-DEFAULT font-semibold hover:underline flex items-center gap-1">
                    <Eye size={12} /> {expandedId === selectedItem.id ? 'إخفاء' : 'عرض'} المحتوى الكامل
                  </button>
                  {expandedId === selectedItem.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100 article-content text-xs"
                      dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
                  )}
                </div>

                {/* Notes */}
                <div className="p-5 border-b border-gray-100">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    <MessageSquare size={14} className="inline ml-1" />
                    ملاحظات للكاتب (اختياري)
                  </label>
                  <textarea
                    className="textarea text-sm"
                    rows={3}
                    placeholder="أضف ملاحظاتك أو تعديلاتك المقترحة هنا..."
                    value={notes[selectedItem.id] || ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [selectedItem.id]: e.target.value }))}
                  />
                </div>

                {/* Actions */}
                <div className="p-5 flex gap-3">
                  <button
                    onClick={() => handleApproveWithNote(selectedItem.id)}
                    className="flex-1 btn btn-sm flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg,#2E7D32,#388E3C)' }}>
                    <CheckCircle size={16} /> قبول ونشر المقال
                  </button>
                  <button
                    onClick={() => handleReject(selectedItem.id)}
                    className="flex-1 btn btn-sm flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg,#C62828,#D32F2F)' }}>
                    <XCircle size={16} /> رفض المقال
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-16 text-center h-full flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">👆</div>
                <h3 className="text-base font-bold text-gray-600 mb-2">اختر مقالاً للمراجعة</h3>
                <p className="text-sm text-gray-400">انقر على أي مقال من القائمة لعرض تفاصيله ومراجعته</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
