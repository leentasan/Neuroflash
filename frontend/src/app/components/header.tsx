'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Note: Changed from 'next/router' to 'next/navigation'

export default function Header() {
  const router = useRouter();

  const handleNavigation = (path:string) => {
    router.push(path);
  }
  
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
      <div className="font-bold text-xl" onClick={() => handleNavigation('/')}>LOGO</div>
      
      <nav className="flex space-x-8">
        <button onClick={() => handleNavigation('/dashboard')} className="hover:text-gray-500">Dashboard</button>
        <button onClick={() => handleNavigation('/flashcards')} className="hover:text-gray-500">Flashcards</button>
        <button onClick={() => handleNavigation('/quiz')} className="hover:text-gray-500">Quizzes</button>
        <button onClick={() => handleNavigation('/analytics')} className="hover:text-gray-500">Analytics</button>
      </nav>
      <div className="flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-300"></div>
        <div className="h-6 w-6 rounded-full bg-red-300"></div>
      </div>
    </header>
  );
}