'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GetStartedPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      // Rediriger directement vers le quiz pour tous les utilisateurs
      router.push('/quiz');
    }
  }, [isLoaded, router]);

  // Afficher un loader pendant que Clerk charge
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#B2E4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black text-lg" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }



  // Page de transition (ne devrait pas s'afficher longtemps)
  return (
    <div className="min-h-screen bg-[#B2E4F6] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-black text-lg" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
          Redirecting to quiz...
        </p>
      </div>
    </div>
  );
} 