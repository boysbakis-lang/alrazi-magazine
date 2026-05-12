'use client'

import { useState } from 'react'
import { Save, Globe, Mail, Phone, MapPin, Palette, Shield, Bell, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)

  const [general, setGeneral] = useState({
    siteName: 'مجلة الرازي المدرسية الرقمية',
    siteDesc: 'منصة رقمية تفاعلية تعكس إنجازات وأنشطة مدرسة الرازي بنين - الحلقة الثانية',
    email: 'hany.aboueldahab@moe.sch.ae',
    phone: '+971-4-XXX-XXXX',
    address: 'دبي، الإمارات العربية المتحدة',
    issueNumber: '17',
    schoolYear: '٢٠٢٥-٢٠٢٦',
  })

  const [publishing, setPublishing] = useState({
    autoPublish: false,
    allowStudentPublish: false,
    requireReview: true,
    allowComments: true,
    moderateComments: true,
    allowLikes: true,
  })

  const [notifications, setNotifications] = useState({
    emailOnSubmit: true,
    emailOnApprove: true,
    emailOnReject: true,
    emailOnComment: false,
  })

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(false)
    toast.success('✅ تم حفظ الإعدادات بنجاح!')
  }

  const tabs = [
    { id: 'general', label: 'عام', icon: Globe },
    { id: 'publishing', label: 'النشر', icon: Shield },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: Database },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">⚙️ إعدادات المجلة</h1>
          <p className="text-sm text-gray-500 mt-1">ضبط إعدادات المجلة والنظام</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary">
          {saving
            ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> جاري الحفظ...</>
            : <><Save size={15} /> حفظ التغييرات</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all border-r-2',
                  activeTab === tab.id
                    ? 'text-primary-DEFAULT bg-blue-50/60 border-r-primary-DEFAULT'
                    : 'text-gray-600 hover:bg-gray-50 border-r-transparent'
                )}>
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings panel */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-sm">
                  <Globe size={16} style={{ color: 'var(--primary)' }} /> معلومات المجلة
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم المجلة</label>
                    <input className="input" value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">وصف المجلة</label>
                    <textarea className="textarea" rows={3} value={general.siteDesc} onChange={(e) => setGeneral({ ...general, siteDesc: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم العدد الحالي</label>
                      <input className="input" value={general.issueNumber} onChange={(e) => setGeneral({ ...general, issueNumber: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">العام الدراسي</label>
                      <input className="input" value={general.schoolYear} onChange={(e) => setGeneral({ ...general, schoolYear: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-sm">
                  <Mail size={16} style={{ color: 'var(--primary)' }} /> معلومات التواصل
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><Mail size={13} /> البريد الإلكتروني</label>
                    <input className="input" type="email" value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><Phone size={13} /> رقم الهاتف</label>
                    <input className="input" value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><MapPin size={13} /> العنوان</label>
                    <input className="input" value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'publishing' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-sm">
                <Shield size={16} style={{ color: 'var(--primary)' }} /> إعدادات النشر والمراجعة
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'requireReview', label: 'تطلب مراجعة المقالات قبل النشر', desc: 'يجب على المشرف الموافقة على كل مقال قبل نشره' },
                  { key: 'autoPublish', label: 'نشر تلقائي لمقالات المعلمين', desc: 'ينشر مقالات المعلمين مباشرة دون مراجعة' },
                  { key: 'allowStudentPublish', label: 'السماح للطلاب بالنشر المباشر', desc: 'يتجاوز مرحلة المراجعة لمقالات الطلاب' },
                  { key: 'allowComments', label: 'تفعيل نظام التعليقات', desc: 'يسمح للزوار بإضافة تعليقات على المقالات' },
                  { key: 'moderateComments', label: 'مراجعة التعليقات قبل النشر', desc: 'تحتاج التعليقات لموافقة المشرف أولاً' },
                  { key: 'allowLikes', label: 'تفعيل نظام الإعجابات', desc: 'يسمح بالإعجاب بالمقالات' },
                ].map((s) => (
                  <label key={s.key} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={publishing[s.key as keyof typeof publishing]}
                        onChange={(e) => setPublishing({ ...publishing, [s.key]: e.target.checked })}
                      />
                      <div className={cn(
                        'w-10 h-6 rounded-full transition-all',
                        publishing[s.key as keyof typeof publishing] ? 'bg-primary-DEFAULT' : 'bg-gray-200'
                      )}>
                        <div className={cn(
                          'w-4 h-4 rounded-full bg-white shadow-sm mt-1 transition-all',
                          publishing[s.key as keyof typeof publishing] ? 'mr-5' : 'mr-1'
                        )} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-sm">
                <Bell size={16} style={{ color: 'var(--primary)' }} /> إعدادات الإشعارات
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'emailOnSubmit', label: 'إشعار عند تقديم مقال جديد', desc: 'يُرسل بريد للمشرف عند تقديم مقال للمراجعة' },
                  { key: 'emailOnApprove', label: 'إشعار عند قبول المقال', desc: 'يُبلَّغ الكاتب بقبول مقاله ونشره' },
                  { key: 'emailOnReject', label: 'إشعار عند رفض المقال', desc: 'يُبلَّغ الكاتب بسبب رفض مقاله' },
                  { key: 'emailOnComment', label: 'إشعار عند التعليق', desc: 'يُبلَّغ الكاتب بكل تعليق جديد على مقالاته' },
                ].map((s) => (
                  <label key={s.key} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors">
                    <div className="relative mt-0.5">
                      <input type="checkbox" className="sr-only"
                        checked={notifications[s.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications({ ...notifications, [s.key]: e.target.checked })} />
                      <div className={cn('w-10 h-6 rounded-full transition-all', notifications[s.key as keyof typeof notifications] ? 'bg-primary-DEFAULT' : 'bg-gray-200')}>
                        <div className={cn('w-4 h-4 rounded-full bg-white shadow-sm mt-1 transition-all', notifications[s.key as keyof typeof notifications] ? 'mr-5' : 'mr-1')} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-sm">
                <Database size={16} style={{ color: 'var(--primary)' }} /> النسخ الاحتياطي والبيانات
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'تصدير جميع المقالات (JSON)', desc: 'تنزيل نسخة من جميع المقالات والبيانات', action: () => toast.success('جاري تصدير البيانات...') },
                  { label: 'تصدير المجلة كاملة (PDF)', desc: 'إنشاء ملف PDF يحتوي جميع المقالات المنشورة', action: () => toast.success('جاري إنشاء PDF...') },
                  { label: 'تصدير بيانات المستخدمين (CSV)', desc: 'تنزيل قائمة المستخدمين المسجلين', action: () => toast.success('جاري تصدير بيانات المستخدمين...') },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <button onClick={item.action} className="btn btn-outline btn-sm">تصدير</button>
                  </div>
                ))}

                <div className="mt-6 p-4 rounded-xl border border-red-100 bg-red-50">
                  <h4 className="font-bold text-red-700 text-sm mb-1">⚠️ منطقة الخطر</h4>
                  <p className="text-xs text-red-600 mb-3">هذه الإجراءات لا يمكن التراجع عنها</p>
                  <button onClick={() => toast.error('هذا الإجراء محمي - تواصل مع مسؤول النظام')}
                    className="btn btn-sm bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg px-4 py-2">
                    حذف جميع المسودات
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
