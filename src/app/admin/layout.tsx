'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Clock, CheckCircle, Users, Settings,
  BarChart2, MessageSquare, Home, PenLine, Menu, X, Bell, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { section: 'الرئيسية', items: [
    { href: '/admin', label: 'لوحة المعلومات', icon: LayoutDashboard },
    { href: '/admin/analytics', label: 'التحليلات', icon: BarChart2 },
  ]},
  { section: 'المحتوى', items: [
    { href: '/admin/articles', label: 'المقالات', icon: FileText },
    { href: '/admin/review', label: 'المراجعة', icon: Clock, badge: 3 },
    { href: '/admin/comments', label: 'التعليقات', icon: MessageSquare },
  ]},
  { section: 'الإدارة', items: [
    { href: '/admin/users', label: 'المستخدمون', icon: Users },
    { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="fixed top-0 right-0 left-0 z-50 h-14 flex items-center justify-between px-4"
        style={{ background: 'var(--primary)', borderBottom: '2px solid var(--accent)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 transition-all">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-primary-DEFAULT"
              style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)' }}>ر</div>
            <span className="text-white font-bold text-sm hidden sm:block">لوحة تحكم المجلة</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors">
            <Home size={14} /> الموقع
          </Link>
          <Link href="/editor" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary-DEFAULT"
            style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)' }}>
            <PenLine size={13} /> مقال جديد
          </Link>
          <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400" />
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)', color: 'var(--primary)' }}>ه</div>
        </div>
      </div>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className={cn(
          'fixed right-0 top-14 bottom-0 z-40 transition-all duration-300 overflow-y-auto',
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
          style={{ background: 'var(--primary)' }}>
          <div className="p-3 space-y-1">
            {sidebarItems.map((group) => (
              <div key={group.section}>
                <div className="px-3 py-2 text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {group.section}
                </div>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      'border-r-2',
                      pathname === item.href
                        ? 'text-accent-light bg-white/12 border-r-accent-DEFAULT'
                        : 'text-white/70 hover:text-white hover:bg-white/8 border-r-transparent'
                    )}>
                    <item.icon size={17} />
                    <span className="flex-1">{item.label}</span>
                    {'badge' in item && item.badge && (
                      <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-red-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className={cn('flex-1 transition-all duration-300 min-h-screen', sidebarOpen ? 'mr-64' : 'mr-0')}>
          {children}
        </main>
      </div>
    </div>
  )
}
