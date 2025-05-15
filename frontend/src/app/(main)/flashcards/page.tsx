// frontend/src/app/(main)/flashcards/page.tsx
"use client";

import { useEffect, useState } from 'react';
import SearchBar from "../../components/searchbar";
import ClassCard from "../../components/classcard";
import CreateClassCard from "../../components/createClassCard";
import { classService, Class } from '@/services/api/class';

export default function Home() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await classService.getUserClasses();
      setClasses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (name: string, description?: string) => {
    try {
      await classService.createClass({ name, description });
      loadClasses(); // Reload classes after creation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create class');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar/>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Daftar Class</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls) => (
          <ClassCard
            key={cls.id}
            id={cls.id}
            title={cls.name}
            subject={cls.description || ''}
            flashcardCount={cls.flashcardCount}
            date={cls.createdAt}
            progress={cls.progress}
          />
        ))}

        <ClassCard
          id="cell-bio-2"  // Add unique ID
          title="Cell"
          subject="Bio"
          flashcardCount={2}
          date="2023-10-01"
          progress={50} 
        />

        <CreateClassCard onSubmit={handleCreateClass} />
      </div>
    </div>
  );
}