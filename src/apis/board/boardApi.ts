import { api } from '../api';

// 작성 페이지에서 쓰던 Request 인터페이스 유지
export interface CreatePostRequest {
  title: string;
  contents: string;
  nickname: string;
  password: string;
  category: 'MEAL' | 'DESSERT' | '';
  imageUrls: string[];
  tags: string[];
}

// 🌟 [추가] 백엔드 명세서 기반 GET /posts/{postId} Response 인터페이스 정의
export interface PostDetailResponse {
  category: 'MEAL' | 'DESSERT';
  title: string;
  contents: string;
  nickname: string;
  imageUrls: string[];
  tags: string[];
  views: number;
}

// 📸 4.1 이미지 업로드 API 함수
export const uploadImages = async (formData: FormData) => {
  const response = await api.post<{ imageUrls: string[] }>('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// 🚀 1.1 게시글 작성 API 함수
export const createPost = async (requestBody: CreatePostRequest) => {
  const response = await api.post<{ postId: number }>('/posts', requestBody);
  return response.data;
};

// 🔍 [추가] 1.3 게시글 상세 조회 API 함수
export const getPostDetail = async (postId: string) => {
  // 인스턴스를 거쳐 VITE_API_BASE_URL/posts/{postId} 로 요청이 날아갑니다.
  const response = await api.get<PostDetailResponse>(`/posts/${postId}`);
  return response.data;
};