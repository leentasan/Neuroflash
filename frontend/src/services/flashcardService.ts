import api  from '../services/api/axios';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFlashcardDTO {
  front: string;
  back: string;
  deckId: string;
}

export interface UpdateFlashcardDTO {
  front: string;
  back: string;
}

const flashcardService = {
  // Create a new flashcard
  async create(data: CreateFlashcardDTO): Promise<Flashcard> {
    const response = await api.post('/flashcards', data);
    return response.data;
  },

  // Get all flashcards for a deck
  async getAllByDeck(deckId: string): Promise<Flashcard[]> {
    const response = await api.get(`/flashcards/deck/${deckId}`);
    return response.data;
  },

  // Update a flashcard
  async update(id: string, data: UpdateFlashcardDTO): Promise<Flashcard> {
    const response = await api.put(`/flashcards/${id}`, data);
    return response.data;
  },

  // Delete a flashcard
  async delete(id: string): Promise<void> {
    await api.delete(`/flashcards/${id}`);
  },
};

export default flashcardService; 