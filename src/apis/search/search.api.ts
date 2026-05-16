import axios from 'axios'
import type { SearchResponse } from './search.types'

// 공통 baseURL 설정 (토큰 등 공통 헤더 필요 시 여기에 interceptor 추가)
const axiosInstance = axios.create({
  baseURL: 'http://churai.kro.kr/api/v1',
})

export async function searchPosts(keyword: string, page: number): Promise<SearchResponse> {
  const { data } = await axiosInstance.get<SearchResponse>('/posts/search', {
    params: { keyword, page, size: 20 },
  })
  return data
}
