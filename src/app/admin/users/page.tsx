'use client'

import { useState } from 'react'
import { Search, UserPlus, Shield, Edit, Trash2, Mail, BookOpen } from 'lucide-react'
import { cn, getRoleLabel, getInitials } from '@/lib/utils'
import toast from 'react-hot-toast'

const initialUsers = [
  { id: '1', name: 'هاني أبو الدهب', email: 'hany.aboueldahab@moe.sch.ae', role: 'ADMIN', articles: 0, lastActive: 'الآن', grade: null, bio: 'مدير المجلة المدرسية' },
  { id: '2', name: 'أحمد السعيد', email: 'ahmed@alrazi.ae', role: 'TEACHER', articles: 24, lastActive: 'اليوم', grade: 'الحلقة الثانية', bio: 'منسق التعليم التقني' },
  { id: '3', name: 'سعيد الرشيد', email: 'saeed@alrazi.ae', role: 'TEACHER', articles: 18, lastActive: 'أمس', grade: null, bio: 'مشرف الروبوتيكس' },
  { id: '4', name: 'فاطمة النعيمي', email: 'fatima@alrazi.ae', role: 'EDITOR', articles: 16, lastActive: 'منذ يومين', grade: null, bio: 'محررة المجلة' },
  { id: '5', name: 'عبدالله محمد', email: 'abdullah@alrazi.ae', role: 'STUDENT', articles: 5, lastActive: 'منذ ٣ أيام', grade: 'الصف الثامن', bio: null },
  { id: '6', name: 'خالد العبيدي', email: 'khaled@alrazi.ae', role: 'TEACHER', articles: 12, lastActive: 'منذ أسبوع', grade: null, bio: 'معلم العلوم' },
  { id: '7', name: 'يوسف الحمادي', email: 'yousef@alrazi.ae', role: 'STUDENT', articles: 3, lastActive: 'منذ أسبوع', grade: 'الصف التاسع', bio: null },
]

const roleConfig: Record<string, { label: string; cls: string; color: string }> = {
  ADMIN: { label: 'مدير', cls: 'bg-red-50 text-red-700', color: '#C62828' },
  TEACHER: { label: 'معلم', cls: 'bg-blue-50 text-blue-700', color: '#0A3D7A' },
  EDITOR: { label: 'محرر', cls: 'bg-purple-50 text-purple-700', color: '#6A1B9A' },
  STUDENT: { label: 'طالب', cls: 'bg-green-50 text-green-700', color: '#2E7D32' },
}

const roleColors: Record<string, string> = {
  ADMIN: 'from-red-500 to-red-700',
  TEACHER: 'from-blue-600 to-blue-800',
  EDITOR: 'from-purple-500 to-purple-700',
  STUDENT: 'from-teal-500 to-teal-700',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'STUDENT', grade: '' })

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      (!search || u.name.includes(q) || u.email.includes(q)) &&
      (roleFilter === 'ALL' || u.role === roleFilter)
    )
  })

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    toast.success('🗑️ تم حذف المستخدم')
  }

  const handleRoleChange = (id: string, role: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u))
    toast.success(`✅ تم تغيير الصلاحية إلى "${getRoleLabel(role)}"`)
  }

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) { toast.error('يرجى ملء جميع الحقول'); return }
    setUsers((prev) => [...prev, {
      id: String(Date.now()), articles: 0, lastActive: 'الآن', bio: null,
      grade: newUser.grade || null, ...newUser,
    }])
    setNewUser({ name: '', email: '', role: 'STUDENT', grade: '' })
    setShowAddForm(false)
    toast.success('✅ تم إضافة المستخدم بنجاح!')
  }

  const counts = {
    ALL: users.length,
    ADMIN: users.filter((u) => u.role === 'ADMIN').length,
    TEACHER: users.filter((u) => u.role === 'TEACHER').length,
    EDITOR: users.filter((u) => u.role === 'EDITOR').length,
    STUDENT: users.filter((u) => u.role === 'STUDENT').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">👥 إدارة المستخدمين</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} مستخدم مسجل</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary">
          <UserPlus size={16} /> إضافة مستخدم
        </button>
      </div>

      {/* Add user form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">➕ إضافة مستخدم جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="input text-sm" placeholder="الاسم الكامل *" value={newUser.name} onChange={(e) => setNewUser((n) => ({ ...n, name: e.target.value }))} />
            <input className="input text-sm" type="email" placeholder="البريد الإلكتروني *" value={newUser.email} onChange={(e) => setNewUser((n) => ({ ...n, email: e.target.value }))} />
            <select className="select text-sm" value={newUser.role} onChange={(e) => setNewUser((n) => ({ ...n, role: e.target.value }))}>
              <option value="STUDENT">طالب</option>
              <option value="TEACHER">معلم</option>
              <option value="EDITOR">محرر</option>
              <option value="ADMIN">مدير</option>
            </select>
            <input className="input text-sm" placeholder="الصف (للطلاب)" value={newUser.grade} onChange={(e) => setNewUser((n) => ({ ...n, grade: e.target.value }))} />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAddUser} className="btn btn-primary btn-sm">حفظ</button>
            <button onClick={() => setShowAddForm(false)} className="btn btn-outline btn-sm">إلغاء</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { role: 'ADMIN', label: 'مديرون', icon: '🛡️' },
          { role: 'TEACHER', label: 'معلمون', icon: '👨‍🏫' },
          { role: 'EDITOR', label: 'محررون', icon: '✏️' },
          { role: 'STUDENT', label: 'طلاب', icon: '🎓' },
        ].map((s) => (
          <div key={s.role} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-black text-gray-900">{counts[s.role as keyof typeof counts]}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pr-10 text-sm" placeholder="بحث بالاسم أو البريد..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['ALL', 'ADMIN', 'TEACHER', 'EDITOR', 'STUDENT'].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={cn('px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                roleFilter === r ? 'bg-primary-DEFAULT text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-DEFAULT/30')}>
              {r === 'ALL' ? 'الكل' : getRoleLabel(r)}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>البريد الإلكتروني</th>
              <th>الدور</th>
              <th>المقالات</th>
              <th>آخر نشاط</th>
              <th>تغيير الدور</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const rc = roleConfig[user.role]
              return (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br flex-shrink-0', roleColors[user.role])}>
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">{user.name}</p>
                        {user.grade && <p className="text-xs text-gray-400">{user.grade}</p>}
                        {user.bio && <p className="text-xs text-gray-400">{user.bio}</p>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="flex items-center gap-1 text-xs text-primary-DEFAULT hover:underline">
                      <Mail size={11} /> {user.email}
                    </a>
                  </td>
                  <td>
                    <span className={cn('badge text-xs', rc.cls)}>
                      <Shield size={10} /> {rc.label}
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <BookOpen size={11} /> {user.articles}
                    </span>
                  </td>
                  <td className="text-xs text-gray-500">{user.lastActive}</td>
                  <td>
                    {user.role !== 'ADMIN' && (
                      <select
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 cursor-pointer"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                        <option value="STUDENT">طالب</option>
                        <option value="TEACHER">معلم</option>
                        <option value="EDITOR">محرر</option>
                        <option value="ADMIN">مدير</option>
                      </select>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        onClick={() => toast.success(`تعديل: ${user.name}`)}>
                        <Edit size={13} />
                      </button>
                      {user.role !== 'ADMIN' && (
                        <button onClick={() => handleDelete(user.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                          <Trash2 size={13} />
                        </button>
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
  )
}
