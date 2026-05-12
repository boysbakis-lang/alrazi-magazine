import type { Metadata } from 'next'
import { Cairo, Tajawal } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | مجلة الرازي المدرسية',
    default: 'مجلة الرازي المدرسية الرقمية',
  },
  description: 'منصة رقمية تفاعلية تعكس إنجازات وأنشطة مدرسة الرازي بنين - الحلقة الثانية في دولة الإمارات العربية المتحدة',
  keywords: ['مدرسة الرازي', 'مجلة مدرسية', 'دبي', 'الإمارات', 'تعليم'],
  authors: [{ name: 'مدرسة الرازي بنين' }],
  openGraph: {
    title: 'مجلة الرازي المدرسية الرقمية',
    description: 'منصة رقمية تفاعلية لمدرسة الرازي بنين - الحلقة الثانية',
    locale: 'ar_AE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-cairo bg-gray-50 text-gray-900 antialiased">
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'var(--font-cairo)',
              direction: 'rtl',
              background: '#0A3D7A',
              color: '#fff',
              borderRadius: '12px',
              padding: '14px 20px',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
