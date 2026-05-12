import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatArabicDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('ar-AE', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`
  if (diffHours < 24) return `منذ ${diffHours} ساعة`
  if (diffDays === 1) return 'أمس'
  if (diffDays < 7) return `منذ ${diffDays} أيام`
  return formatArabicDate(d)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\u0600-\u06FF]/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function estimateReadTime(content: string): number {
  const words = stripHtml(content).split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    DRAFT: 'مسودة',
    REVIEW: 'قيد المراجعة',
    PUBLISHED: 'منشور',
    REJECTED: 'مرفوض',
  }
  return map[status] || status
}

export function getRoleLabel(role: string): string {
  const map: Record<string, string> = {
    STUDENT: 'طالب',
    TEACHER: 'معلم',
    EDITOR: 'محرر',
    ADMIN: 'مدير',
  }
  return map[role] || role
}
