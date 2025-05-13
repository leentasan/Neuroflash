// frontend/src/app/flashcard-set/[id]/study/layout.tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function StudyLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}