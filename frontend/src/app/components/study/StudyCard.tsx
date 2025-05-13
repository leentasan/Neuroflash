// frontend/src/app/components/study/StudyCard.tsx
"use client";

import { useState } from 'react';

interface StudyCardProps {
  front: string;
  back: string;
  onResponse: (response: 'again' | 'hard' | 'good' | 'easy') => void;
  currentIndex: number;
  totalCards: number;
}

export default function StudyCard({ front, back, onResponse, currentIndex, totalCards }: StudyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Flashcard {currentIndex + 1}/{totalCards}
        </span>
        <span className="text-sm text-gray-600">
          {isFlipped ? 'Bahasa Inggris' : 'Bahasa Inggris'}
        </span>
      </div>

      {/* Card */}
      <div 
        className="bg-white rounded-lg shadow-lg p-8 min-h-[300px] flex flex-col cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flex justify-end space-x-2 mb-4">
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 18.364a9 9 0 010-12.728M8.464 15.536a5 5 0 010-7.072" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>

        <div className="flex-grow flex items-center justify-center text-3xl font-medium">
          {isFlipped ? back : front}
        </div>
      </div>

      {/* Response buttons - only show when card is flipped */}
      {isFlipped && (
        <div className="mt-6 grid grid-cols-4 gap-4">
          <button
            onClick={() => onResponse('again')}
            className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium"
          >
            Again
          </button>
          <button
            onClick={() => onResponse('hard')}
            className="px-4 py-2 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-sm font-medium"
          >
            Hard
          </button>
          <button
            onClick={() => onResponse('good')}
            className="px-4 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium"
          >
            Good
          </button>
          <button
            onClick={() => onResponse('easy')}
            className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium"
          >
            Easy
          </button>
        </div>
      )}
    </div>
  );
}