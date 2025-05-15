// frontend/src/app/components/classcard.tsx
"use client";
// import { BookOpen } from "lucide-react";
import Link from 'next/link';

type ClassCardProps = {
    id: string; // Add id prop
    title: string;
    subject: string;
    flashcardCount: number;
    date: string;
    progress: number;
};

export default function ClassCard({
    id,
    title,
    subject,
    flashcardCount,
    date,
    progress,
  }: ClassCardProps) {
    return (
      <Link href={`/flashcard-set/${id}`}>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{subject}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{flashcardCount} flashcards</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  }