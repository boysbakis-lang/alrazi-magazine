'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Bold, Italic, Underline, AlignRight, AlignCenter, AlignLeft,
  List, ListOrdered, Link2, Image, Quote, Heading1, Heading2,
  Save, Send, Upload, X, Eye, ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'

const categories = [
  { value: 'school-news', label: 'أخبار المدرسة', icon: '📰' },
  { value: 'achievements', label: 'إنجازات الطلاب', icon: '🏆' },
  { value: 'events', label: 'الفعاليات والأنشطة', icon: '🎉' },
  { value: 'national-identity', label: 'الهوية الوطنية', icon: '🇦🇪' },
  { value: 'stem', label: 'STEM والتقنية', icon: '🔬' },
  { value: 'sports', label: 'الرياضة والصحة', icon: '⚽' },
  { value: 'culture', label: 'الثقافة والأدب', icon: '📚' },
  { value: 'teachers', label: 'مقالات المعلمين', icon: '👨‍🏫' },
]

const roles = [
  { value: 'student', label: 'طالب' },
  { value: 'teacher', label: 'معلم' },
  { value: 'editor', label: 'محرر' },
]

interface ToolbarBtnProps {
  onClick: () => void
  title: string
  children: React.ReactNode
  active?: boolean
}

function ToolbarBtn({ onClick, title, children, active }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all text-sm
        ${active ? 'bg-primary-DEFAULT text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
    >
      {children}
    </button>
  )
}

export default function EditorPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [role, setRole] = useState('student')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [preview, setPreview] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setCharCount(e.target.value.length)
  }

  const insertFormat = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end)
    const newContent = content.slice(0, start) + before + selected + after + content.slice(end)
    setContent(newContent)
    setCharCount(newContent.length)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('الحد الأقصى لحجم الصورة 5MB'); return }
    const reader = new FileReader()
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    toast.success('تم رفع الصورة ✅')
  }

  const handleSaveDraft = async () => {
    if (!title.trim()) { toast.error('أدخل عنوان المقال أولاً'); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(false)
    toast.success('💾 تم الحفظ كمسودة بنجاح!')
  }

  const handleSubmit = async () => {
    if (!title.trim()) { toast.error('أدخل عنوان المقال'); return }
    if (!category) { toast.error('اختر قسم المقال'); return }
    if (content.length < 100) { toast.error('المحتوى قصير جداً (100 حرف على الأقل)'); return }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitting(false)
    toast.success('📨 تم إرسال المقال للمراجعة بنجاح!')
    setTimeout(() => router.push('/'), 2000)
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="pt-16 hero-gradient">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="section-tag inline-flex mb-3"
                style={{ background: 'rgba(201,162,39,0.2)', borderColor: 'rgba(201,162,39,0.35)', color: '#F0C040' }}>
                ✍️ كتابة مقال
              </div>
              <h1 className="text-3xl font-black text-white">إضافة مقال جديد</h1>
              <p className="text-white/65 text-sm mt-1">شارك أفكارك وأخبار مدرستك مع زملائك</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-white/30 text-white hover:bg-white/10 transition-all">
                <Eye size={15} /> {preview ? 'تعديل' : 'معاينة'}
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: '3px', background: 'linear-gradient(90deg,transparent,#C9A227 30%,#F0C040 50%,#C9A227 70%,transparent)' }} />
      </div>

      <div className="section">
        {preview ? (
          /* Preview Mode */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-card-hover border border-gray-100">
              {coverPreview && (
                <img src={coverPreview} alt="cover" className="w-full h-64 object-cover" />
              )}
              <div className="p-8">
                {category && (
                  <span className="badge badge-primary mb-3">
                    {categories.find((c) => c.value === category)?.icon} {categories.find((c) => c.value === category)?.label}
                  </span>
                )}
                <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
                  {title || 'عنوان المقال'}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                  <span>✍️ أنت</span>
                  <span>📅 اليوم</span>
                  <span>⏱️ {readTime} دقائق للقراءة</span>
                  <span>📝 {wordCount} كلمة</span>
                </div>
                <div className="article-content whitespace-pre-wrap leading-relaxed">
                  {content || 'ابدأ الكتابة لرؤية المعاينة هنا...'}
                </div>
                {tags && (
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                    {tags.split(',').map((tag) => (
                      <span key={tag} className="badge badge-primary text-xs">#{tag.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main form */}
              <div className="lg:col-span-2 space-y-5">

                {/* Title */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    عنوان المقال <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input text-lg font-bold"
                    placeholder="اكتب عنواناً جذاباً ومعبراً..."
                    maxLength={200}
                  />
                  <div className="text-xs text-gray-400 mt-1 text-left">{title.length}/200</div>
                </div>

                {/* Rich Editor */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">محتوى المقال <span className="text-red-500">*</span></span>
                    <div className="text-xs text-gray-400">{wordCount} كلمة • {readTime} دقائق قراءة</div>
                  </div>

                  {/* Toolbar */}
                  <div className="px-4 py-2.5 border-b border-gray-100 flex flex-wrap gap-1 bg-gray-50">
                    <ToolbarBtn onClick={() => insertFormat('## ', '')} title="عنوان ثانوي"><Heading1 size={14} /></ToolbarBtn>
                    <ToolbarBtn onClick={() => insertFormat('### ', '')} title="عنوان ثالثي"><Heading2 size={14} /></ToolbarBtn>
                    <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                    <ToolbarBtn onClick={() => insertFormat('**', '**')} title="غامق"><Bold size={14} /></ToolbarBtn>
                    <ToolbarBtn onClick={() => insertFormat('*', '*')} title="مائل"><Italic size={14} /></ToolbarBtn>
                    <ToolbarBtn onClick={() => insertFormat('~~', '~~')} title="يتوسطه خط"><Underline size={14} /></ToolbarBtn>
                    <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                    <ToolbarBtn onClick={() => insertFormat('> ', '')} title="اقتباس"><Quote size={14} /></ToolbarBtn>
                    <ToolbarBtn onClick={() => insertFormat('- ', '')} title="قائمة نقطية"><List size={14} /></ToolbarBtn>
                    <ToolbarBtn onClick={() => insertFormat('1. ', '')} title="قائمة مرقمة"><ListOrdered size={14} /></ToolbarBtn>
                    <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                    <ToolbarBtn onClick={() => insertFormat('[نص الرابط](', ')')} title="رابط"><Link2 size={14} /></ToolbarBtn>
                    <ToolbarBtn onClick={() => insertFormat('![وصف الصورة](', ')')} title="صورة"><Image size={14} /></ToolbarBtn>
                    <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                    <ToolbarBtn onClick={() => insertFormat('\n---\n', '')} title="فاصل"><span className="text-xs font-bold">—</span></ToolbarBtn>
                  </div>

                  {/* Textarea */}
                  <textarea
                    id="content-editor"
                    value={content}
                    onChange={handleContentChange}
                    className="w-full p-5 text-sm leading-loose text-gray-800 outline-none resize-none font-cairo"
                    style={{ minHeight: '360px', background: 'white', direction: 'rtl' }}
                    placeholder={`اكتب محتوى مقالك هنا...

يمكنك استخدام أدوات التنسيق أعلاه، أو كتابة مباشرة.

## عنوان ثانوي
**نص غامق**
*نص مائل*
> اقتباس
- عنصر قائمة`}
                  />
                  <div className="px-5 py-2 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                    <span>{charCount} حرف</span>
                    <span>يدعم Markdown</span>
                  </div>
                </div>

                {/* Cover image */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    📷 الصورة الرئيسية
                  </label>

                  {coverPreview ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={coverPreview} alt="cover" className="w-full h-48 object-cover" />
                      <button
                        onClick={() => setCoverPreview(null)}
                        className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary-DEFAULT hover:bg-blue-50/30 transition-all">
                      <Upload size={28} className="text-gray-300" />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-600">اسحب الصورة هنا أو انقر للاختيار</p>
                        <p className="text-xs text-gray-400 mt-1">PNG، JPG — حتى 5MB</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Category */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    القسم <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.value}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                          category === cat.value
                            ? 'border-primary-DEFAULT bg-blue-50 text-primary-DEFAULT'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                        }`}>
                        <input type="radio" name="category" value={cat.value}
                          checked={category === cat.value}
                          onChange={() => setCategory(cat.value)}
                          className="hidden" />
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm font-medium">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                  <label className="block text-sm font-bold text-gray-800 mb-3">صفتك</label>
                  <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    🏷️ الوسوم (اختياري)
                  </label>
                  <input
                    className="input text-sm"
                    placeholder="روبوتيكس، ذكاء اصطناعي، ..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1">افصل بين الوسوم بفاصلة</p>
                  {tags && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.split(',').filter(Boolean).map((tag) => (
                        <span key={tag} className="badge badge-primary text-xs">#{tag.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article stats preview */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">📊 إحصائيات المقال</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: 'عدد الكلمات', value: wordCount },
                      { label: 'عدد الأحرف', value: charCount },
                      { label: 'وقت القراءة', value: `${readTime} دقيقة` },
                    ].map((s) => (
                      <div key={s.label} className="flex justify-between text-gray-600">
                        <span>{s.label}</span>
                        <span className="font-bold text-gray-900">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleSaveDraft}
                    disabled={saving}
                    className="btn btn-outline w-full justify-center">
                    {saving ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-primary-DEFAULT border-t-transparent rounded-full animate-spin" /> جاري الحفظ...</span>
                    ) : (
                      <><Save size={15} /> حفظ كمسودة</>
                    )}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn btn-primary w-full justify-center">
                    {submitting ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> جاري الإرسال...</span>
                    ) : (
                      <><Send size={15} /> إرسال للمراجعة</>
                    )}
                  </button>
                </div>

                {/* Tips */}
                <div className="rounded-2xl p-4" style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)' }}>
                  <h4 className="text-xs font-bold mb-2" style={{ color: '#7A5900' }}>💡 نصائح للكتابة</h4>
                  <ul className="text-xs space-y-1" style={{ color: '#9E7B0E' }}>
                    <li>• اختر عنواناً جذاباً ومعبراً</li>
                    <li>• أضف صورة عالية الجودة</li>
                    <li>• قسّم المحتوى بعناوين فرعية</li>
                    <li>• تحقق من الإملاء والنحو</li>
                    <li>• الحد الأدنى 100 كلمة</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
