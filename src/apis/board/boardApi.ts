import { api, fileApi } from '../../apis/api';

interface ApiResponse<T> {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
}

export interface CreatePostRequest {
  title: string;
  contents: string;
  nickname: string;
  password: string;
  category: 'MAIN_DISH' | 'DESSERT';
  images: File[];
  tags: string[];
}

export interface UpdatePostRequest {
  title?: string;
  contents?: string;
  category?: 'MAIN_DISH' | 'DESSERT';
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

export interface CreateCommentRequest {
  contents: string;
  parentId: number | null;
}

// 💬 댓글 단일 아이템 인터페이스 명세
export interface CommentResponse {
  id: number;
  nickname: string;
  contents: string;
  parentId: number | null;
  createdAt: string;
}

// 1.1 게시글 생성
export const createPost = async (requestBody: CreatePostRequest) => {
  const formData = new FormData();
  console.log(requestBody);
  
  formData.append('title', requestBody.title);
  formData.append('contents', requestBody.contents);
  formData.append('nickname', requestBody.nickname);
  formData.append('password', requestBody.password);
  formData.append('category', requestBody.category);

  if (requestBody.tags.length !== 0) {
    requestBody.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
  }

  if (requestBody.images.length !== 0) {
    requestBody.images.forEach((file) => {
      formData.append('images', file);
    });
  }
  console.log(formData);

  const response = await fileApi.post('/posts', formData);
  return response.data.result;
};

// 1.2 게시글 목록 조회
export const getPostList = async () => {
  const response = await api.get<ApiResponse<PostDetailResponse[]>>('/posts');
  return response.data.result;
};

// 1.3 게시글 상세 조회
export const getPostDetail = async (postId: string) => {
  const response = await api.get<ApiResponse<PostDetailResponse>>(`/posts/${postId}`);
  return response.data.result;
};

// 1.4 게시글 수정
export const updatePost = async (postId: string, requestBody: UpdatePostRequest) => {
  const response = await api.patch<ApiResponse<{ id: number }>>(`/posts/${postId}`, requestBody);
  return response.data.result;
};

// 1.5 인기 게시글 조회
export const getPostRanking = async () => {
  const response = await api.get<ApiResponse<PostDetailResponse[]>>('/posts/ranking');
  return response.data.result;
};

// 1.6 게시글 검색
export const searchPosts = async (keyword: string) => {
  const response = await api.get<ApiResponse<PostDetailResponse[]>>(
    `/posts/search?keyword=${encodeURIComponent(keyword)}`
  );
  return response.data.result;
};

// 1.7 댓글 및 대댓글 작성
export const createComment = async (postId: string, requestBody: CreateCommentRequest) => {
  const response = await api.post<ApiResponse<any>>(`/posts/${postId}/comments`, requestBody);
  return response.data.result;
};

// 🌟 1.8 댓글 목록 조회 API 연동 (반환 제네릭 타입 명시적 교정)
export const getComments = async (postId: string) => {
  const response = await api.get<ApiResponse<CommentResponse[]>>(`/posts/${postId}/comments`);
  return response.data.result;
};

