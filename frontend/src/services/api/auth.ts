import api from './axios';

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: User;
}

export const authService = {
  async register(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post('/auth/register', { email, password });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Logout failed');
    }
  },

  async getCurrentUser(): Promise<AuthResponse | null> {
    try {
      const { data } = await api.get('/auth/me');
      return data;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};