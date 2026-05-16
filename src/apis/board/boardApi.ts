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
  comments?: { id: number; nickname: string; contents: string; parentId: number | null; createdAt: string }[];
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

// 🌟 1.7 댓글 및 대댓글 작성 (스웨거 명세 규격 밀착 매칭)
export const createComment = async (postId: string, requestBody: CreateCommentRequest) => {
  // 백엔드가 요구하는 { contents, parentId } 구조와 명시적으로 1:1 결합 유도
  const finalBody = {
    contents: requestBody.contents,
    parentId: requestBody.parentId // 일반 댓글일 때는 null, 대댓글일 때는 부모 ID가 깨끗하게 전달됩니다.
  };

  const response = await api.post<ApiResponse<any>>(`/posts/${postId}/comments`, finalBody);
  return response.data.result;
};