// frontend/src/app/flashcard-set/[id]/study/StudyModeClient.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudyCard from '../../../components/study/StudyCard';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface StudyModeClientProps {
  deckId: string;
}

export default function StudyModeClient({ deckId }: StudyModeClientProps) {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<Flashcard[]>([]);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    // This would normally be an API call
    setCards([
      { id: '1', front: 'Blue', back: 'Biru' },
      // Add more cards here
    ]);
  }, [deckId]);

  const handleResponse = (response: 'again' | 'hard' | 'good' | 'easy') => {
    // Here you would normally update the card's study progress
    console.log(`Response for card ${currentCardIndex}: ${response}`);

    // Move to next card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Study session complete
      router.push(`/flashcard-set/${deckId}`);
    }
  };

  if (cards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push(`/flashcard-set/${deckId}`)}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Deck
        </button>

        <StudyCard
          front={cards[currentCardIndex].front}
          back={cards[currentCardIndex].back}
          onResponse={handleResponse}
          currentIndex={currentCardIndex}
          totalCards={cards.length}
        />
      </div>
    </div>
  );
}