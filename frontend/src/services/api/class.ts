const API_BASE_URL = 'http://localhost:5000/api';

export interface Class {
    id: string;
    name: string;
    description?: string;
    flashcardCount: number;
    progress: number;
    createdAt: string;
  }

export const classService = {
    async createClass(data: { name: string; description?: string }) {
        const response = await fetch(`${API_BASE_URL}/classes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to create class');
        }
    
        return response.json();
      },

  async getUserClasses() {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch classes');
    }

    return response.json();
  },

  async updateClass(id: string, data: { name?: string; description?: string }) {
    const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update class');
    }

    return response.json();
  },

  async deleteClass(id: string) {
    const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete class');
    }
  },
};