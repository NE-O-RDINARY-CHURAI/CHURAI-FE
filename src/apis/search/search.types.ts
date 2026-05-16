export interface Post {
  postId: number
  title: string
  nickname: string
  category: string
  thumbnailUrl?: string
  heungMiCount: number
  chuRaiCount: number
  commentCount: number
}

export interface SearchResponse {
  content: Post[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}
