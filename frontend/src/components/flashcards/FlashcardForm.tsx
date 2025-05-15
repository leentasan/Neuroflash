import React, { useState } from 'react';
import api from '../../services/api/axios';

interface FlashcardFormProps {
  classId: string;
  onSuccess: () => void;
}

export default function FlashcardForm({ classId, onSuccess }: FlashcardFormProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/flashcards', {
        front,
        back,
        classId
      });
      setFront('');
      setBack('');
      onSuccess();
    } catch (error) {
      console.error('Error creating flashcard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="front" className="block text-sm font-medium text-gray-700">
          Front
        </label>
        <textarea
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="back" className="block text-sm font-medium text-gray-700">
          Back
        </label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Creating...' : 'Create Flashcard'}
      </button>
    </form>
  );
} 