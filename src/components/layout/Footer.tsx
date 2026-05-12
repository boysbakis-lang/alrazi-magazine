import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

const footerLinks = {
  sections: [
    { label: 'أخبار المدرسة', href: '/archive?cat=school-news' },
    { label: 'إنجازات الطلاب', href: '/archive?cat=achievements' },
    { label: 'الفعاليات والأنشطة', href: '/archive?cat=events' },
    { label: 'الهوية الوطنية', href: '/archive?cat=national-identity' },
    { label: 'STEM والتقنية', href: '/archive?cat=stem' },
    { label: 'الرياضة والصحة', href: '/archive?cat=sports' },
  ],
  quick: [
    { label: 'الصفحة الرئيسية', href: '/' },
    { label: 'أرشيف المجلة', href: '/archive' },
    { label: 'أضف مقالاً', href: '/editor' },
    { label: 'لوحة التحكم', href: '/admin' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #071E3D 0%, #0A3D7A 100%)' }}>
      {/* Gold top line */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #C9A227 20%, #F0C040 50%, #C9A227 80%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl text-primary-DEFAULT"
                style={{ background: 'linear-gradient(135deg, #C9A227, #F0C040)' }}>
                ر
              </div>
              <div>
                <div className="font-bold text-white text-sm">مجلة الرازي</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>الحلقة الثانية • بنين</div>
              </div>
            </div>
            <p className="text-sm leading-loose" style={{ color: 'rgba(255,255,255,0.65)' }}>
              منصة رقمية تفاعلية تعكس إنجازات وأنشطة مدرسة الرازي بنين في دولة الإمارات العربية المتحدة. نسعى لتوثيق كل لحظة مشرقة في مسيرتنا التعليمية.
            </p>
            {/* UAE Flag colors */}
            <div className="flex gap-1 mt-4">
              <div className="h-1.5 flex-1 rounded-full bg-uae-green" />
              <div className="h-1.5 flex-1 rounded-full bg-white" />
              <div className="h-1.5 flex-1 rounded-full" style={{ background: '#1A1A1A' }} />
              <div className="h-1.5 w-5 rounded-full bg-uae-red" />
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-sm font-bold mb-4" style={{ color: '#F0C040' }}>أقسام المجلة</h4>
            <ul className="space-y-2">
              {footerLinks.sections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold mb-4" style={{ color: '#F0C040' }}>روابط سريعة</h4>
            <ul className="space-y-2">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold mb-4" style={{ color: '#F0C040' }}>تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:magazine@alrazi.ae"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <Mail size={14} style={{ color: '#F0C040' }} />
                  magazine@alrazi.ae
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <Phone size={14} style={{ color: '#F0C040' }} />
                  +971-4-XXX-XXXX
                </span>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#F0C040' }} />
                  دبي، الإمارات العربية المتحدة
                </span>
              </li>
            </ul>

            {/* Issue badge */}
            <div className="mt-6 p-3 rounded-xl border" style={{ background: 'rgba(201,162,39,0.1)', borderColor: 'rgba(201,162,39,0.3)' }}>
              <div className="text-xs font-bold" style={{ color: '#F0C040' }}>العدد الحالي</div>
              <div className="text-lg font-black text-white">العدد السابع عشر</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>مايو ٢٠٢٦</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 مجلة الرازي المدرسية الرقمية • جميع الحقوق محفوظة
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            مدرسة الرازي بنين - الحلقة الثانية • دبي <ExternalLink size={10} />
          </p>
        </div>
      </div>
    </footer>
  )
}
