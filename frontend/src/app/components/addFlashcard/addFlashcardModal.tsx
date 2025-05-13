// frontend/src/app/components/AddFlashcardModal.tsx
"use client";

import { useState } from 'react';

interface AddFlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (front: string, back: string) => void;
}

export default function AddFlashcardModal({ isOpen, onClose, onAdd }: AddFlashcardModalProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(front, back);
    setFront('');
    setBack('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Front
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
              rows={3}
              value={front}
              onChange={(e) => setFront(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Back
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
              rows={3}
              value={back}
              onChange={(e) => setBack(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}