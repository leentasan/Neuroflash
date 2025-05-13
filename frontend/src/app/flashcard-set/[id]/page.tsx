// frontend/src/app/flashcard-set/[id]/page.tsx
import FlashcardSetClient from './FlashcardSetClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FlashcardSetPage({ params }: PageProps) {
  // You would typically fetch the deck data here
  const initialDeck = {
    id: await Promise.resolve(params.id), // Handle the async params
    name: "Cellular Respiration",
    cards: 0,
    flashcards: []
  };

  return <FlashcardSetClient initialDeck={initialDeck} />;
} 