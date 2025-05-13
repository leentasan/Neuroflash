// frontend/src/app/flashcard-set/[id]/FlashcardSetClient.tsx
"use client";

import { useState } from 'react';
import Header from '../../components/header';

interface Deck {
  id: string;
  name: string;
  cards: number;
}

interface FlashcardSetClientProps {
  initialDeck: Deck;
}

export default function FlashcardSetClient({ initialDeck }: FlashcardSetClientProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'decks'>('about');
  const [deck] = useState<Deck>(initialDeck);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Deck Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{deck.name}</h1>
            <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800">
              STUDY
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`${
                activeTab === 'about'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('decks')}
              className={`${
                activeTab === 'decks'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Decks ({deck.cards})
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'about' ? (
          <div className="prose max-w-none">
            <p>This deck contains flashcards about cellular respiration.</p>
          </div>
        ) : (
          <div>
            {/* General Deck */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium text-gray-900">General</h3>
                <span className="text-sm text-gray-500">0 cards</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  ADD CARD
                </button>
                <button className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add Deck Button */}
            <button className="mt-4 w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add new deck
            </button>
          </div>
        )}
      </main>
    </div>
  );
}