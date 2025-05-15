import ClassSetsContent from "./ClassSetsContent";

// This is a Server Component
export default async function ClassSetsPage({ params }: { params: { id: string } }) {
  // Await the params in an async component
  const classId = await Promise.resolve(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Class Flashcards</h1>
        <ClassSetsContent classId={classId} />
      </div>
    </div>
  );
}