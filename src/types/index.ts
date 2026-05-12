export type Role = 'STUDENT' | 'TEACHER' | 'EDITOR' | 'ADMIN'
export type ArticleStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'REJECTED'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string | null
  grade?: string | null
  bio?: string | null
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  description?: string | null
  order: number
  _count?: { articles: number }
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string | null
  status: ArticleStatus
  featured: boolean
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  views: number
  readTime: number
  author: User
  category: Category
  _count?: {
    comments: number
    likes: number
  }
  tags?: Tag[]
}

export interface Comment {
  id: string
  content: string
  createdAt: Date
  approved: boolean
  author: User
  articleId: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface SiteSettings {
  id: string
  siteName: string
  siteDesc: string
  email: string
  phone: string
  address: string
  logoUrl?: string | null
  primaryColor: string
  accentColor: string
  autoPublish: boolean
  allowStudentPublish: boolean
}

export interface DashboardStats {
  totalArticles: number
  publishedArticles: number
  pendingReview: number
  totalViews: number
  totalUsers: number
  totalComments: number
  monthlyGrowth: number
}
