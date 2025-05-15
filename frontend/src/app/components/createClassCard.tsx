'use client';

import { useState } from 'react';

interface CreateClassCardProps {
  onSubmit: (name: string, description?: string) => Promise<void>;
}

export default function CreateClassCard({ onSubmit }: CreateClassCardProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(name, description);
      setName('');
      setDescription('');
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:border-gray-400 transition-colors"
      >
        <span className="text-gray-500">+ Create New Class</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Class Name"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full mb-4 p-2 border rounded"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsCreating(false)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </form>
  );
}