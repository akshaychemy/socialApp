import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = (userData) => API.post('/user/register', userData);
export const login = (userData) => API.post('/user/login', userData);
export const fetchPosts = () => API.get('/posts', { headers: getAuthHeaders() });
export const createPost = (postData) => API.post('/posts/', postData, { headers: getAuthHeaders() });
export const likePost = (postId) => API.post(`/posts/${postId}/like`, {}, { headers: getAuthHeaders() });
export const commentOnPost = (postId, commentData) => API.post(`/posts/${postId}/comment`, commentData, { headers: getAuthHeaders() });
export const followUser = (userId) => API.post(`/user/${userId}/follow`, {}, { headers: getAuthHeaders() });
export const unfollowUser = (userId) => API.post(`/user/${userId}/unfollow`, {}, { headers: getAuthHeaders() });
