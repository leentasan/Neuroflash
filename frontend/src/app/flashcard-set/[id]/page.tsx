import FlashcardSetClient from './FlashcardSetClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FlashcardSetPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params); // ✅ ensures async handling

  const initialDeck = {
    id,
    name: 'Cellular Respiration',
    cards: 0,
    flashcards: []
  };

  return <FlashcardSetClient initialDeck={initialDeck} />;
}
