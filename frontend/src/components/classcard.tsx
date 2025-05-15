"use client";

import { useRouter } from 'next/navigation';

interface ClassCardProps {
  id: string;
  title: string;
  subject: string;
  flashcardCount: number;
  date: string;
  progress: number;
}

export default function ClassCard({ id, title, subject, flashcardCount, date, progress }: ClassCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/flashcard-set/${id}/flashcards`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{subject}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Flashcards</span>
          <span className="font-medium">{flashcardCount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Created</span>
          <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 