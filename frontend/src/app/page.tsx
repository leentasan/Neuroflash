"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('register'); // 'register' or 'login'
  
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
          <form className="space-y-6">
            {/* Name field - only show in register tab */}
            {activeTab === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
            )}
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your email"
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
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}