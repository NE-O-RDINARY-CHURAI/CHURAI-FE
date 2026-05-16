import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// 1. 기존 공통 JSON 인스턴스 (그대로 유지)
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 🌟 새로 추가하는 파일 업로드 전용 인스턴스
export const fileApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 파일 업로드는 시간이 걸릴 수 있으므로 10초로 버퍼 업!
  headers: {
    'Content-Type': 'multipart/form-data', // 👈 디폴트를 멀티파트로 박제
  },
});