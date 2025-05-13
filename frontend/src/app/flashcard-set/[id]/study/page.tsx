// frontend/src/app/flashcard-set/[id]/study/page.tsx
import StudyModeClient from './StudyModeClient';

interface PageProps {
  params: { id: string };
}

// ✅ Mark function as async and await `params`
export default async function StudyModePage({ params }: PageProps) {
  const { id } = params; // This is now fine because function is async
  return <StudyModeClient deckId={id} />;
}