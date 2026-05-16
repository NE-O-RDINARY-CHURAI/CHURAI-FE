import type { SearchResponse } from './search.types'

const BASE_URL = 'http://churai.kro.kr/api/v1'

export async function searchPosts(keyword: string, page: number): Promise<SearchResponse> {
  const res = await fetch(
    `${BASE_URL}/posts/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=20`,
  )
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}
