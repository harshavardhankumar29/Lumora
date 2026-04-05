import axios from 'axios';
import Cookies from 'js-cookie';

// Using proxy might be better if we configured rewrites in next.config.mjs,
// but for absolute URLs let's define them via env variables with fallbacks.
export const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:5001/api/auth';
export const USER_API_URL = process.env.NEXT_PUBLIC_USER_URL || 'http://localhost:5003/api/user';
export const JOB_API_URL = process.env.NEXT_PUBLIC_JOB_URL || 'http://localhost:5004/api/job';
export const PAYMENT_API_URL = process.env.NEXT_PUBLIC_PAYMENT_URL || 'http://localhost:5005/api/payment';

const getAuthToken = () => {
  return Cookies.get('token');
};

const authInterceptor = (config: any) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = axios.create({
  baseURL: USER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
userApi.interceptors.request.use(authInterceptor);

export const jobApi = axios.create({
  baseURL: JOB_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
jobApi.interceptors.request.use(authInterceptor);

// Helper for multipart/form-data
export const userFormApi = axios.create({
  baseURL: USER_API_URL,
});
userFormApi.interceptors.request.use(authInterceptor);

export const jobFormApi = axios.create({
  baseURL: JOB_API_URL,
});
jobFormApi.interceptors.request.use(authInterceptor);

export const paymentApi = axios.create({
  baseURL: PAYMENT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
paymentApi.interceptors.request.use(authInterceptor);
