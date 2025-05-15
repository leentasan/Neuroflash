const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Set {
  id: string;
  name: string;
  description?: string;
  classId: string;
  createdAt: string;
  updatedAt: string;
  decks: unknown[]; // You can define a proper Deck interface later
}

export const setService = {
  async createSet(data: { name: string; description?: string; classId: string }) {
    const response = await fetch(`${API_BASE_URL}/sets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create set');
    }

    return response.json();
  },

  async getClassSets(classId: string) {
    const response = await fetch(`${API_BASE_URL}/sets/class/${classId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch sets');
    }

    return response.json();
  },

  async updateSet(id: string, data: { name?: string; description?: string }) {
    const response = await fetch(`${API_BASE_URL}/sets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update set');
    }

    return response.json();
  },

  async deleteSet(id: string) {
    const response = await fetch(`${API_BASE_URL}/sets/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete set');
    }
  },
}; 