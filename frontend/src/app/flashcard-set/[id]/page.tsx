// frontend/src/app/flashcard-set/[id]/page.tsx
import FlashcardSetClient from './FlashcardSetClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FlashcardSetPage({ params }: PageProps) {
  // You can fetch initial data here if needed
  const initialDeck = {
    id: params.id,
    name: "Cellular Respiration",
    cards: 1
  };

  return <FlashcardSetClient initialDeck={initialDeck} />;
}