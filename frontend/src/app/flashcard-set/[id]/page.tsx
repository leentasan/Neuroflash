// frontend/src/app/flashcard-set/[id]/page.tsx
import FlashcardSetClient from './FlashcardSetClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function FlashcardSetPage({ params }: PageProps) {
  const initialDeck = {
    id: params.id,
    name: 'Cellular Respiration',
    cards: 0,
    flashcards: []
  };

  return <FlashcardSetClient initialDeck={initialDeck} />;
}
