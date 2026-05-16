import { api } from '../api'

interface ApiPost {
  id: number
  title: string
  nickname: string
  category: string
  thumbnailUrl?: string
  interestedCount: number
  churaiCount: number
  commentCount: number
  createdAt?: string
}

interface ApiResponse<T> {
  isSuccess: boolean
  result: T
}

export type Category = 'MAIN_DISH' | 'DESSERT' | ''

export interface RankingPost {
  rank: number
  postId: number
  title: string
  nickname: string
  category: string
  thumbnailUrl?: string
  heungMiCount: number
  chuRaiCount: number
}

export interface BoardPost {
  postId: number
  title: string
  nickname: string
  category: string
  thumbnailUrl?: string
  heungMiCount: number
  chuRaiCount: number
  commentCount: number
  createdAt: string
}

export interface BoardListResponse {
  content: BoardPost[]
  hasNext: boolean
}

const CATEGORY_LABEL: Record<string, string> = {
  MAIN_DISH: '식사',
  DESSERT: '디저트',
}

const normalize = (p: ApiPost): BoardPost => ({
  postId: p.id,
  title: p.title,
  nickname: p.nickname,
  category: CATEGORY_LABEL[p.category] ?? p.category,
  thumbnailUrl: p.thumbnailUrl,
  heungMiCount: p.interestedCount,
  chuRaiCount: p.churaiCount,
  commentCount: p.commentCount,
  createdAt: p.createdAt ?? '',
})

export const getRanking = async (category?: Category, limit = 50): Promise<RankingPost[]> => {
  const { data } = await api.get<ApiResponse<ApiPost[]>>('/posts/ranking', {
    params: { limit },
  })
  const all = (data.result ?? []).map((p, i) => ({ ...normalize(p), rank: i + 1 }))
  if (!category) return all
  const label = CATEGORY_LABEL[category] ?? category
  return all.filter(p => p.category === label).map((p, i) => ({ ...p, rank: i + 1 }))
}

export const getBoardPosts = async (category?: Category): Promise<BoardListResponse> => {
  const { data } = await api.get<ApiResponse<ApiPost[]>>('/posts', {
    params: { ...(category ? { category } : {}) },
  })
  const content = (data.result ?? []).map(normalize)
  return { content, hasNext: false }
}
