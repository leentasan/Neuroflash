'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'; // Make sure to install react-icons

interface Set {
  id: string;
  name: string;
  description: string;
  classId: string;
  createdAt: string;
}

interface ClassSetsContentProps {
  classId: string;
}

export default function ClassSetsContent({ classId }: ClassSetsContentProps) {
  const [sets, setSets] = useState<Set[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [newSetDescription, setNewSetDescription] = useState('');

  const fetchSets = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/sets/class/${classId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch sets: ${response.statusText}`);
      }
      const data = await response.json();
      setSets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newSetName,
          description: newSetDescription,
          classId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create set');
      }

      await fetchSets();
      setIsCreating(false);
      setNewSetName('');
      setNewSetDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create set');
    }
  };

  useEffect(() => {
    fetchSets();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Set Button */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Create New Set
        </button>
      )}

      {/* Create Set Form */}
      {isCreating && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <form onSubmit={createSet} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Set Name
              </label>
              <input
                type="text"
                value={newSetName}
                onChange={(e) => setNewSetName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter set name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newSetDescription}
                onChange={(e) => setNewSetDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter set description"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Set
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sets List */}
      <div className="grid gap-4">
        {sets.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No flashcard sets found. Create your first set!</p>
          </div>
        ) : (
          sets.map((set) => (
            <div
              key={set.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{set.name}</h3>
                  <p className="text-gray-600 mt-1">{set.description}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Created: {new Date(set.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit Set"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Set"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 