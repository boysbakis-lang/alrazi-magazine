'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home, BookOpen, Archive, LayoutDashboard, PenLine,
  Search, Bell, Menu, X, ChevronDown, LogIn
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/archive', label: 'الأرشيف', icon: Archive },
  {
    label: 'الأقسام', icon: BookOpen,
    submenu: [
      { href: '/archive?cat=school-news', label: 'أخبار المدرسة', icon: '📰' },
      { href: '/archive?cat=achievements', label: 'إنجازات الطلاب', icon: '🏆' },
      { href: '/archive?cat=events', label: 'الفعاليات', icon: '🎉' },
      { href: '/archive?cat=national-identity', label: 'الهوية الوطنية', icon: '🇦🇪' },
      { href: '/archive?cat=stem', label: 'STEM والتقنية', icon: '🔬' },
      { href: '/archive?cat=sports', label: 'الرياضة', icon: '⚽' },
    ]
  },
  { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <nav className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-primary-DEFAULT/98 backdrop-blur-xl shadow-primary'
          : 'bg-primary-DEFAULT/95 backdrop-blur-lg'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-primary-DEFAULT shadow-gold transition-transform group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #C9A227, #F0C040)' }}>
                ر
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-bold leading-tight" style={{ color: '#F0C040' }}>مجلة الرازي</span>
                <span className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>الحلقة الثانية • بنين</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <div key={link.label} className="relative">
                      <button
                        className={cn(
                          'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          openSubmenu === link.label
                            ? 'text-accent-light bg-white/10'
                            : 'text-white/80 hover:text-accent-light hover:bg-white/10'
                        )}
                        onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)}
                      >
                        <link.icon size={15} />
                        {link.label}
                        <ChevronDown size={13} className={cn('transition-transform', openSubmenu === link.label && 'rotate-180')} />
                      </button>
                      {openSubmenu === link.label && (
                        <div className="absolute top-full right-0 mt-1 w-48 rounded-xl overflow-hidden shadow-card-hover border z-50"
                          style={{ background: 'white', borderColor: 'var(--border)' }}>
                          {link.submenu.map((sub) => (
                            <Link key={sub.href} href={sub.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary-DEFAULT transition-colors"
                              onClick={() => setOpenSubmenu(null)}>
                              <span>{sub.icon}</span>
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link key={link.href} href={link.href!}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname === link.href
                        ? 'text-accent-light bg-white/15 font-semibold'
                        : 'text-white/80 hover:text-accent-light hover:bg-white/10'
                    )}>
                    <link.icon size={15} />
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href="/admin/search"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Search size={18} />
              </Link>
              <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-DEFAULT"></span>
              </button>
              <Link href="/editor"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 text-primary-DEFAULT"
                style={{ background: 'linear-gradient(135deg, #C9A227, #F0C040)', boxShadow: '0 4px 12px rgba(201,162,39,0.35)' }}>
                <PenLine size={15} />
                <span>اكتب مقالاً</span>
              </Link>
              <button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C9A227 30%, #F0C040 50%, #C9A227 70%, transparent)' }} />
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute top-16 right-0 left-0 shadow-xl"
            style={{ background: '#0A3D7A', borderBottom: '2px solid #C9A227' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="p-4 space-y-1">
              {navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <div key={link.label}>
                      <button
                        className="flex items-center justify-between w-full gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/80"
                        onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)}>
                        <span className="flex items-center gap-2"><link.icon size={15} />{link.label}</span>
                        <ChevronDown size={13} className={cn('transition-transform', openSubmenu === link.label && 'rotate-180')} />
                      </button>
                      {openSubmenu === link.label && (
                        <div className="mr-4 mt-1 space-y-0.5">
                          {link.submenu.map((sub) => (
                            <Link key={sub.href} href={sub.href}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10">
                              <span>{sub.icon}</span>{sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link key={link.href} href={link.href!}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      pathname === link.href ? 'bg-white/15 text-accent-light' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    )}>
                    <link.icon size={15} />
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-3 border-t border-white/10 flex gap-2">
                <Link href="/editor" className="flex-1 btn btn-accent btn-sm justify-center">
                  <PenLine size={14} /> اكتب مقالاً
                </Link>
                <button className="flex-1 btn btn-outline btn-sm justify-center text-white border-white/30 hover:bg-white/10">
                  <LogIn size={14} /> دخول
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close submenu */}
      {openSubmenu && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenSubmenu(null)} />
      )}
    </>
  )
}
