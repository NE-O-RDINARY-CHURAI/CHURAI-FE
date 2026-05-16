// 🌟 재범님 프로젝트의 실제 axiosInstance 위치(`../../apis/api`)로 완벽 매칭했습니다!
import { api } from '../../apis/api';

// 🚀 [Request] 1.1 게시글 작성 시 백엔드로 보낼 데이터 규격
export interface CreatePostRequest {
  title: string;
  contents: string;
  nickname: string;
  password: string;
  category: 'MEAL' | 'DESSERT' | '';
  imageUrls: string[];
  tags: string[];
}

// 📝 [Request] 1.4 게시글 수정(PATCH) 시 보낼 데이터 규격
export interface UpdatePostRequest {
  title?: string;
  contents?: string;
  category?: 'MEAL' | 'DESSERT';
  imageUrls?: string[];
  tags?: string[];
}

// 🔍 [Response] 1.3 게시글 상세 조회 시 백엔드가 넘겨주는 진짜 응답 구조
export interface PostDetailResponse {
  postId?: number;
  category: 'MEAL' | 'DESSERT';
  title: string;
  contents: string;
  nickname: string;
  imageUrls: string[];
  tags: string[];
  heungMiCount: number;  // 백엔드 Swagger 명세서에 적힌 진짜 '흥미요' 변수명
  chuRaiCount: number;   // 백엔드 Swagger 명세서에 적힌 진짜 '츄라이' 변수명
  createdAt: string;
}

// 🚀 [1.1 게시글 작성 API] 메서드: POST / 경로: /posts
export const createPost = async (requestBody: CreatePostRequest) => {
  const response = await api.post<{ postId: number }>('/posts', requestBody);
  return response.data; // { postId: 42 } 양식 리턴
};

// 🔍 [1.2 게시글 목록 전체 조회 API] 메서드: GET / 경로: /posts
export const getPostList = async () => {
  const response = await api.get<PostDetailResponse[]>('/posts');
  return response.data;
};

// 🔍 [1.3 게시글 상세 조회 API] 메서드: GET / 경로: /posts/{id}
export const getPostDetail = async (postId: string) => {
  const response = await api.get<PostDetailResponse>(`/posts/${postId}`);
  return response.data;
};

// 🛠️ [1.4 게시글 수정 API] 메서드: PATCH / 경로: /posts/{id}
export const updatePost = async (postId: string, requestBody: UpdatePostRequest) => {
  const response = await api.patch<{ postId: number }>(`/posts/${postId}`, requestBody);
  return response.data;
};

// 👑 [1.5 실시간 츄라이 랭킹 조회 API] 메서드: GET / 경로: /posts/ranking
export const getPostRanking = async () => {
  const response = await api.get<PostDetailResponse[]>('/posts/ranking');
  return response.data;
};

// 🔍 [1.6 게시글 검색 API] 메서드: GET / 경로: /posts/search
export const searchPosts = async (keyword: string) => {
  const response = await api.get<PostDetailResponse[]>(`/posts/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};