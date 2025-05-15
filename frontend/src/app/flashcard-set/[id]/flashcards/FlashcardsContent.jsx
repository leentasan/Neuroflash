'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  setId: string;
  createdAt: string;
}

interface FlashcardsContentProps {
  setId: string;
}

export default function FlashcardsContent({ setId }: FlashcardsContentProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const fetchFlashcards = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/flashcards/set/${setId}`);
      if (!response.ok) throw new Error('Failed to fetch flashcards');
      const data = await response.json();
      setFlashcards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch flashcards');
    } finally {
      setLoading(false);
    }
  };

  const createFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          setId
        }),
      });

      if (!response.ok) throw new Error('Failed to create flashcard');
      
      await fetchFlashcards();
      setIsCreating(false);
      setNewQuestion('');
      setNewAnswer('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create flashcard');
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [setId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Flashcard Button */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Flashcard
        </button>
      )}

      {/* Create Flashcard Form */}
      {isCreating && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <form onSubmit={createFlashcard} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Flashcards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {flashcards.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No flashcards yet. Create your first one!</p>
          </div>
        ) : (
          flashcards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-m