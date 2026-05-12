'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, Clock, ArrowLeft } from 'lucide-react'
import { cn, formatArabicDate, getInitials, truncate } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
  className?: string
}

const categoryColors: Record<string, string> = {
  'school-news': 'bg-blue-100 text-blue-800',
  'achievements': 'bg-yellow-100 text-yellow-800',
  'events': 'bg-green-100 text-green-800',
  'national-identity': 'bg-red-100 text-red-800',
  'stem': 'bg-indigo-100 text-indigo-800',
  'sports': 'bg-teal-100 text-teal-800',
  'culture': 'bg-purple-100 text-purple-800',
  'teachers': 'bg-gray-100 text-gray-700',
}

const categoryEmoji: Record<string, string> = {
  'school-news': '📰',
  'achievements': '🏆',
  'events': '🎉',
  'national-identity': '🇦🇪',
  'stem': '🔬',
  'sports': '⚽',
  'culture': '📚',
  'teachers': '👨‍🏫',
}

const categoryBg: Record<string, string> = {
  'school-news': 'from-blue-50 to-blue-100',
  'achievements': 'from-yellow-50 to-amber-100',
  'events': 'from-green-50 to-emerald-100',
  'national-identity': 'from-red-50 to-rose-100',
  'stem': 'from-indigo-50 to-blue-100',
  'sports': 'from-teal-50 to-cyan-100',
  'culture': 'from-purple-50 to-violet-100',
  'teachers': 'from-gray-50 to-slate-100',
}

export default function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  const catColor = categoryColors[article.category?.slug] || 'bg-blue-100 text-blue-800'
  const catEmoji = categoryEmoji[article.category?.slug] || '📄'
  const catBg = categoryBg[article.category?.slug] || 'from-gray-50 to-gray-100'

  if (variant === 'featured') {
    return (
      <Link href={`/article/${article.slug}`}
        className={cn('group block card overflow-hidden', className)}>
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className={cn('relative min-h-[260px] bg-gradient-to-br flex items-center justify-center overflow-hidden', catBg)}>
            {article.coverImage ? (
              <Image src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <span className="text-7xl transition-transform duration-500 group-hover:scale-110 select-none">{catEmoji}</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
            {article.featured && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-primary-DEFAULT"
                style={{ background: 'linear-gradient(135deg,#C9A227,#F0C040)' }}>
                ⭐ مميز
              </div>
            )}
          </div>
          {/* Body */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('badge text-xs', catColor)}>{catEmoji} {article.category?.name}</span>
            </div>
            <h2 className="text-xl font-black text-gray-900 leading-snug mb-3 group-hover:text-primary-DEFAULT transition-colors line-clamp-3">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: 'var(--primary)' }}>
                {getInitials(article.author?.name || 'م')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{article.author?.name}</div>
                <div className="text-xs text-gray-400">{formatArabicDate(article.publishedAt || article.createdAt)}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />{article.readTime} د
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`}
        className={cn('group flex gap-4 p-4 rounded-2xl transition-all hover:bg-gray-50 border border-transparent hover:border-gray-100', className)}>
        <div className={cn('w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br text-3xl overflow-hidden', catBg)}>
          {article.coverImage
            ? <Image src={article.coverImage} alt={article.title} width={80} height={80} className="object-cover w-full h-full rounded-xl" />
            : catEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <span className={cn('badge text-xs mb-1', catColor)}>{article.category?.name}</span>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary-DEFAULT transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Eye size={11} />{article.views}</span>
            <span className="flex items-center gap-1"><Heart size={11} />{article._count?.likes || 0}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{article.readTime} د</span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.slug}`}
        className={cn('group block p-4 rounded-xl border transition-all hover:shadow-card hover:border-primary-DEFAULT/20', 'bg-white', className)}>
        <span className={cn('badge text-xs mb-2', catColor)}>{catEmoji} {article.category?.name}</span>
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-primary-DEFAULT transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{article.author?.name}</span>
          <span className="flex items-center gap-1"><Heart size={10} /> {article._count?.likes || 0}</span>
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/article/${article.slug}`}
      className={cn('group card flex flex-col cursor-pointer', className)}>
      {/* Image */}
      <div className={cn('relative h-48 bg-gradient-to-br overflow-hidden flex-shrink-0 flex items-center justify-center', catBg)}>
        {article.coverImage ? (
          <Image src={article.coverImage} alt={article.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <span className="text-6xl transition-transform duration-500 group-hover:scale-110 select-none">{catEmoji}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <span className={cn('absolute top-3 right-3 badge text-xs', catColor)}>
          {catEmoji} {article.category?.name}
        </span>
        {article.featured && (
          <span className="absolute top-3 left-3 badge text-xs bg-yellow-400 text-yellow-900">⭐</span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-relaxed line-clamp-2 mb-2 group-hover:text-primary-DEFAULT transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
          {truncate(article.excerpt, 100)}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--primary)' }}>
            {getInitials(article.author?.name || 'م')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-700 truncate">{article.author?.name}</div>
            <div className="text-xs text-gray-400">{formatArabicDate(article.publishedAt || article.createdAt)}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
              <Heart size={12} />{article._count?.likes || 0}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />{article.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />{article.readTime} دقائق
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-primary-DEFAULT group-hover:gap-2 transition-all">
            اقرأ <ArrowLeft size={11} />
          </span>
        </div>
      </div>
    </Link>
  )
}
