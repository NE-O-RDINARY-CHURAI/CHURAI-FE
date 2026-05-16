import { api } from '../../apis/api';

interface ApiResponse<T> {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
}

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

export interface PostDetailResponse {
  id: number;
  category: string;
  title: string;
  nickname: string;
  thumbnailUrl: string;
  tags: string[];
  interestedCount: number;
  churaiCount: number;
  commentCount: number;
  views: number;
  createdAt: string;
  contents?: string;
  imageUrls?: string[];
}

export const createPost = async (requestBody: CreatePostRequest) => {
  const response = await api.post<ApiResponse<{ id: number }>>('/posts', requestBody);
  return response.data.result;
};

export const getPostList = async () => {
  const response = await api.get<ApiResponse<PostDetailResponse[]>>('/posts');
  return response.data.result;
};

export const getPostDetail = async (postId: string) => {
  const response = await api.get<ApiResponse<PostDetailResponse>>(`/posts/${postId}`);
  return response.data.result;
};

export const updatePost = async (postId: string, requestBody: UpdatePostRequest) => {
  const response = await api.patch<ApiResponse<{ id: number }>>(`/posts/${postId}`, requestBody);
  return response.data.result;
};

export const getPostRanking = async () => {
  const response = await api.get<ApiResponse<PostDetailResponse[]>>('/posts/ranking');
  return response.data.result;
};

export const searchPosts = async (keyword: string) => {
  const response = await api.get<ApiResponse<PostDetailResponse[]>>(`/posts/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data.result;
};