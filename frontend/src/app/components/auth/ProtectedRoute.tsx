'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}