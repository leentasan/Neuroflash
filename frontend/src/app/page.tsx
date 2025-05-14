"use client";
import { useState } from "react";
import { authService } from "@/services/api/auth";

interface FormData {
  email: string;
  password: string;
}
export default function Home() {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      let data;
      if (activeTab === 'register') {
        data = await authService.register(formData.email, formData.password);
      } else {
        data = await authService.login(formData.email, formData.password);
      }

      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setSuccess(activeTab === 'register' ? 'Registration successful!' : 'Login successful!');
      
      // Optional: Redirect to dashboard or other page
      // window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  
  return (
    <div className="flex h-screen w-full">
      {/* Left side - Dark panel with logo */}
      <div className="w-1/2 bg-gray-800 flex items-center justify-center">
        <div className="text-white text-6xl font-bold">LOGO</div>
      </div>
      
      {/* Right side - Form panel */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          {/* Tabs */}
          <div className="flex mb-8">
            <button
              className={`text-xl font-bold mr-6 ${
                activeTab === 'register' 
                  ? 'text-black' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Daftar
            </button>
            <button
              className={`text-xl font-bold ${
                activeTab === 'login' 
                  ? 'text-black' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Masuk
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="text-green-500 text-sm">
                {success}
              </div>
            )}
            
            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              {activeTab === 'register' ? 'Register' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}