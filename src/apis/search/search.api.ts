import { api } from '../api'
import type { SearchResponse } from './search.types'

interface ApiPost {
  id: number
  title: string
  nickname: string
  category: string
  thumbnailUrl?: string
  interestedCount: number
  churaiCount: number
  commentCount: number
}

interface ApiResponse<T> {
  isSuccess: boolean
  result: T
}

const CATEGORY_LABEL: Record<string, string> = { MAIN_DISH: '식사', DESSERT: '디저트' }

export async function searchPosts(keyword: string): Promise<SearchResponse> {
  const { data } = await api.get<ApiResponse<ApiPost[]>>('/posts/search', {
    params: { keyword },
  })
  const posts = (data.result ?? []).map(p => ({
    postId: p.id,
    title: p.title,
    nickname: p.nickname,
    category: CATEGORY_LABEL[p.category] ?? p.category,
    thumbnailUrl: p.thumbnailUrl,
    heungMiCount: p.interestedCount,
    chuRaiCount: p.churaiCount,
    commentCount: p.commentCount,
  }))
  return { content: posts, page: 0, size: posts.length, totalElements: posts.length, totalPages: 1, hasNext: false }
}
