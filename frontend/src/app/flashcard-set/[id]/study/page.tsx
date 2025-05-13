// frontend/src/app/flashcard-set/[id]/study/page.tsx
import StudyModeClient from './StudyModeClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function StudyModePage({ params }: PageProps) {
  return <StudyModeClient deckId={params.id} />;
}