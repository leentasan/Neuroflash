// frontend/src/app/flashcard-set/[id]/page.tsx
import FlashcardSetClient from './FlashcardSetClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FlashcardSetPage({ params }: PageProps) {
  // Properly handle the async params without Promise.resolve
  const initialDeck = {
    id: params.id,  // Remove await Promise.resolve
    name: "Cellular Respiration",
    cards: 0,
    flashcards: []
  };

  return <FlashcardSetClient initialDeck={initialDeck} />;
} 