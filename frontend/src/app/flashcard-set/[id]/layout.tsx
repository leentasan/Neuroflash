// frontend/src/app/flashcard-set/[id]/layout.tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function FlashcardSetLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}