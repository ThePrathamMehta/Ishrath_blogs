import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.client.post('/api/auth/login', { email, password });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  logout() {
    this.clearToken();
  }

  // Blog
  async getAllPosts(params?: { page?: number; limit?: number }) {
    const response = await this.client.get('/api/blog/admin/all', { params });
    return response.data;
  }

  async getPostBySlug(slug: string) {
    const response = await this.client.get(`/api/blog/${slug}`);
    return response.data;
  }

  async createPost(data: any, coverImage?: File) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('excerpt', data.excerpt);
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('published', data.published?.toString() || 'false');

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    const response = await this.client.post('/api/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updatePost(slug: string, data: any) {
    const response = await this.client.put(`/api/blog/${slug}`, data);
    return response.data;
  }

  async publishPost(slug: string, published: boolean) {
    const response = await this.client.patch(`/api/blog/${slug}/publish`, { published });
    return response.data;
  }

  async deletePost(slug: string) {
    const response = await this.client.delete(`/api/blog/${slug}`);
    return response.data;
  }

  // Image Upload
  async uploadCoverImage(file: File): Promise<{ key: string; url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const token = this.getToken();
    const response = await fetch(`${API_URL}/api/upload/cover`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    return { key: data.key, url: data.url };
  }

  async uploadContentImage(file: File): Promise<{ key: string; url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const token = this.getToken();
    const response = await fetch(`${API_URL}/api/upload/content`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    return { key: data.key, url: data.url };
  }

  // Newsletter
  async getSubscribers(subscribed?: boolean) {
    const params = subscribed !== undefined ? { subscribed: 'true' } : {};
    const response = await this.client.get('/api/newsletter/subscribers', { params });
    return response.data;
  }

  // Contact
  async getContactSubmissions(unread?: boolean) {
    const params = unread ? { unread: 'true' } : {};
    const response = await this.client.get('/api/contact/submissions', { params });
    return response.data;
  }

  async markContactAsRead(id: number) {
    const response = await this.client.patch(`/api/contact/${id}/read`);
    return response.data;
  }

  async deleteContactSubmission(id: number) {
    const response = await this.client.delete(`/api/contact/${id}`);
    return response.data;
  }
}

export const api = new ApiClient();
