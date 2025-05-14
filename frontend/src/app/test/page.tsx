'use client';

import { useState } from 'react';
import { userApi } from '@/services/api/users';

export default function TestPage() {
    type ApiResponse = {
        user?: {
          id: string;
          email: string;
          created_at: string;
        };
        token?: string;
        preferences?: {
          default_visibility: 'private' | 'public' | 'shared';
          cards_per_session: number;
          review_interval: number;
          notifications_enabled: boolean;
        };
      };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      console.log('Sending registration data:', { email, password }); // Debug log
      const data = await userApi.register(email, password);
      setResult(data);
      setError(null);
      localStorage.setItem('token', data.token);
    } catch (err) {
      console.error('Registration error details:', err); // Debug log
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
};

  const handleLogin = async () => {
    try {
      const data = await userApi.login(email, password);
      setResult(data);
      setError(null);
      // Store token for future authenticated requests
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleGetPreferences = async () => {
    try {
      const data = await userApi.getPreferences();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get preferences');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test User API</h1>
      
      <div className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={handleGetPreferences}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Get Preferences
          </button>
        </div>

        {error && (
          <div className="text-red-500">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h2 className="text-xl mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}