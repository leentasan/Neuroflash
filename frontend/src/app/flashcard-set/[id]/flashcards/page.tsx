import FlashcardsContent from "./FlashcardsContent";

export default async function FlashcardsPage({ params }: { params: { id: string } }) {
  const setId = await Promise.resolve(params.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Flashcards</h1>
        <FlashcardsContent setId={setId} />
      </div>
    </div>
  );
} 