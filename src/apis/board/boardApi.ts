import { api } from '../../apis/api';

// 백엔드 명세서 기반 Request 인터페이스
export interface CreatePostRequest {
  title: string;
  contents: string;
  nickname: string;
  password: string;
  category: 'MEAL' | 'DESSERT' | '';
  imageUrls: string[];
  tags: string[];
}

// 🌟 백엔드 Swagger 테이블 스펙과 100% 매칭된 Response 인터페이스
export interface PostDetailResponse {
  postId?: number;
  category: 'MEAL' | 'DESSERT';
  title: string;
  contents: string;
  nickname: string;
  imageUrls: string[];
  tags: string[];
  heungMiCount: number;  // 명세서의 '흥미요' 카운트
  chuRaiCount: number;   // 명세서의 '츄라이' 카운트
  createdAt: string;
}

// 🚀 [1.1 게시글 작성] POST /posts
export const createPost = async (requestBody: CreatePostRequest) => {
  const response = await api.post<{ postId: number }>('/posts', requestBody);
  return response.data;
};

// 🔍 [1.3 게시글 상세 조회] GET /posts/{id}
export const getPostDetail = async (postId: string) => {
  const response = await api.get<PostDetailResponse>(`/posts/${postId}`);
  return response.data;
};