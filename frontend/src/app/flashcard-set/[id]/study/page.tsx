import StudyModeClient from './StudyModeClient';

interface PageProps {
  params: { id: string };
}

export default async function StudyModePage({ params }: PageProps) {
  const { id } = await Promise.resolve(params); // ✅ async-safe

  return <StudyModeClient deckId={id} />;
}
