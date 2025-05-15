"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Flashcard } from '@/services/flashcardService';
import FlashcardForm from '@/components/flashcards/FlashcardForm';
import api from '@/services/api/axios';

export default function ClassFlashcardsPage() {
  const params = useParams();
  const classId = params.classId as string;
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadFlashcards();
  }, [classId]);

  const loadFlashcards = async () => {
    try {
      const response = await api.get(`/flashcards/class/${classId}`);
      setFlashcards(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flashcards');
    } finally {
      setLoading(false);
    }
  };

  const handleFlashcardCreated = () => {
    loadFlashcards();
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add Flashcard'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
          <FlashcardForm classId={classId} onSuccess={handleFlashcardCreated} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Front</h3>
              <p className="bg-gray-50 p-3 rounded">{flashcard.front}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Back</h3>
              <p className="bg-gray-50 p-3 rounded">{flashcard.back}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 