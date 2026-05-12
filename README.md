# 🏫 مجلة الرازي المدرسية الرقمية

منصة رقمية تفاعلية لمدرسة الرازي بنين - الحلقة الثانية، دولة الإمارات العربية المتحدة.

## ✨ المميزات

- 📰 صفحة رئيسية احترافية مع Hero Section متحرك
- 📝 نظام مقالات متكامل مع Rich Text Editor
- 🔍 بحث وفلترة متقدمة للمقالات
- 👨‍💼 لوحة تحكم Admin شاملة
- ✅ نظام مراجعة المقالات (قبول/رفض)
- 👥 إدارة المستخدمين والصلاحيات
- 📄 تصدير PDF للمقالات والمجلة كاملة
- 💬 نظام تعليقات وإعجابات
- 📱 تصميم Responsive لجميع الأجهزة
- 🇦🇪 دعم كامل للغة العربية RTL
- 🎨 تصميم Premium بـ Glassmorphism وتأثيرات متحركة

## 🚀 التقنيات

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL (Prisma ORM)
- **Storage**: Supabase (للصور)
- **PDF**: jsPDF
- **Hosting**: Railway.app

## 📦 التثبيت المحلي

```bash
# 1. استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/alrazi-magazine.git
cd alrazi-magazine

# 2. تثبيت الاعتمادات
npm install

# 3. إعداد متغيرات البيئة
cp .env.example .env.local
# عدّل .env.local وأضف بياناتك

# 4. إعداد قاعدة البيانات
npx prisma db push
npx prisma generate
npm run db:seed

# 5. تشغيل المشروع
npm run dev
```

افتح http://localhost:3000

## 🌐 النشر على Railway

### الطريقة السريعة (GitHub + Railway)

1. **ارفع المشروع على GitHub:**
```bash
git init
git add .
git commit -m "initial commit: مجلة الرازي"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alrazi-magazine.git
git push -u origin main
```

2. **أنشئ مشروعاً على Railway:**
   - اذهب إلى [railway.app](https://railway.app)
   - انقر **New Project** → **Deploy from GitHub repo**
   - اختر المستودع

3. **أضف PostgreSQL:**
   - في لوحة Railway: **New** → **Database** → **PostgreSQL**
   - انسخ `DATABASE_URL` و `DIRECT_URL`

4. **أضف متغيرات البيئة** في إعدادات Railway:
```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-32-chars-minimum
NEXTAUTH_URL=https://your-app.railway.app
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

5. **سيُنشر تلقائياً!** 🎉

### بيانات الدخول الافتراضية
بعد تشغيل `npm run db:seed`:
- **المدير**: hany.aboueldahab@moe.sch.ae / password123
- **معلم**: ahmed@alrazi.ae / password123

## 📁 هيكل المشروع

```
alrazi-magazine/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # الصفحة الرئيسية
│   │   ├── archive/            # الأرشيف
│   │   ├── article/[id]/       # صفحة المقال
│   │   ├── editor/             # محرر المقالات
│   │   ├── admin/              # لوحة التحكم
│   │   │   ├── articles/       # إدارة المقالات
│   │   │   ├── review/         # مراجعة المقالات
│   │   │   ├── users/          # إدارة المستخدمين
│   │   │   └── settings/       # الإعدادات
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── article/            # ArticleCard
│   │   └── ui/                 # Skeleton, AnimatedCounter
│   ├── lib/
│   │   ├── prisma.ts           # Prisma Client
│   │   ├── supabase.ts         # Supabase Client
│   │   ├── pdf.ts              # PDF Export
│   │   └── utils.ts            # Utilities
│   └── types/
│       └── index.ts            # TypeScript Types
├── prisma/
│   ├── schema.prisma           # Database Schema
│   └── seed.ts                 # Demo Data
├── railway.json                # Railway Config
├── Dockerfile                  # Docker Config
└── .env.example                # Environment Template
```

## 🎨 نظام الألوان

| المتغير | اللون | الاستخدام |
|---------|-------|-----------|
| Primary | `#0A3D7A` | الأزرق الملكي - العناصر الرئيسية |
| Accent | `#C9A227` | الذهبي - العناصر المميزة |
| Success | `#2E7D32` | الأخضر - الحالات الناجحة |
| Danger | `#C62828` | الأحمر - التحذيرات |

## 📄 تصدير PDF

```typescript
import { generateArticlePDF, generateMagazinePDF } from '@/lib/pdf'

// تصدير مقال واحد
generateArticlePDF({ title, author, category, date, excerpt, content })

// تصدير المجلة كاملة
generateMagazinePDF(articles, issueNumber)
```

## 📞 التواصل

- 📧 magazine@alrazi.ae
- 🌐 مدرسة الرازي بنين - الحلقة الثانية
- 📍 دبي، الإمارات العربية المتحدة

---

**© 2026 مجلة الرازي المدرسية الرقمية** • جميع الحقوق محفوظة
