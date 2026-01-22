import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '@/types';

type Payload = Record<string, unknown>;

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    apiClient.post<AuthResponse>('/api/auth/register', { email, password, name }),
  
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/api/auth/login', { email, password }),
  
  logout: () =>
    apiClient.post('/api/auth/logout'),
  
  me: () =>
    apiClient.get('/api/auth/me'),
  
  refreshToken: () =>
    apiClient.post('/api/auth/refresh'),
};

// Products endpoints
export const productsAPI = {
  list: (page = 1, pageSize = 20, category?: string, search?: string) =>
    apiClient.get('/api/products', {
      params: { page, pageSize, category, search },
    }),
  
  get: (id: string) =>
    apiClient.get(`/api/products/${id}`),
  
  trending: () =>
    apiClient.get('/api/products/trending'),
  
  create: (data: Payload) =>
    apiClient.post('/api/products', data),
  
  update: (id: string, data: Payload) =>
    apiClient.put(`/api/products/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/api/products/${id}`),
};

// Cart endpoints
export const cartAPI = {
  get: () =>
    apiClient.get('/api/cart'),
  
  addItem: (productId: string, quantity: number) =>
    apiClient.post('/api/cart/items', { productId, quantity }),
  
  updateItem: (productId: string, quantity: number) =>
    apiClient.put(`/api/cart/items/${productId}`, { quantity }),
  
  removeItem: (productId: string) =>
    apiClient.delete(`/api/cart/items/${productId}`),
  
  clear: () =>
    apiClient.delete('/api/cart'),
};

// Orders endpoints
export const ordersAPI = {
  list: (page = 1, pageSize = 10) =>
    apiClient.get('/api/orders', { params: { page, pageSize } }),
  
  get: (id: string) =>
    apiClient.get(`/api/orders/${id}`),
  
  create: (data: Payload) =>
    apiClient.post('/api/orders', data),
  
  cancel: (id: string) =>
    apiClient.post(`/api/orders/${id}/cancel`),
  
  track: (id: string) =>
    apiClient.get(`/api/orders/${id}/track`),
};

// Payments endpoints
export const paymentsAPI = {
  createPaymentIntent: (amount: number, orderId?: string) =>
    apiClient.post('/api/payments/intent', { amount, orderId }),
  
  confirmPayment: (paymentIntentId: string) =>
    apiClient.post('/api/payments/confirm', { paymentIntentId }),
  
  listMethods: () =>
    apiClient.get('/api/payments/methods'),
  
  addMethod: (data: Payload) =>
    apiClient.post('/api/payments/methods', data),
  
  deleteMethod: (id: string) =>
    apiClient.delete(`/api/payments/methods/${id}`),
};

// Users endpoints
export const usersAPI = {
  getProfile: () =>
    apiClient.get('/api/users/profile'),
  
  updateProfile: (data: Payload) =>
    apiClient.put('/api/users/profile', data),
  
  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/api/users/change-password', { oldPassword, newPassword }),
  
  addAddress: (data: Payload) =>
    apiClient.post('/api/users/addresses', data),
  
  listAddresses: () =>
    apiClient.get('/api/users/addresses'),
  
  deleteAddress: (id: string) =>
    apiClient.delete(`/api/users/addresses/${id}`),
};

// Wishlist endpoints
export const wishlistAPI = {
  list: () =>
    apiClient.get('/api/wishlist'),
  
  add: (productId: string) =>
    apiClient.post('/api/wishlist', { productId }),
  
  remove: (productId: string) =>
    apiClient.delete(`/api/wishlist/${productId}`),
};

// Contact endpoint
export const contactAPI = {
  submit: (name: string, email: string, message: string) =>
    apiClient.post('/api/contact', { name, email, message }),
};

export default apiClient;
