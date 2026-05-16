import axios from 'axios';

// .env.development의 VITE_API_BASE_URL=/api 값을 읽어옵니다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5초 동안 응답 없으면 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});