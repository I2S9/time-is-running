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
      if (!isSignedIn) {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        router.push('/sign-in');
      }
    }
  }, [isSignedIn, isLoaded, router]);

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

  // Si l'utilisateur n'est pas connecté, ne rien afficher (redirection en cours)
  if (!isSignedIn) {
    return null;
  }

  // Page pour les utilisateurs connectés
  return (
    <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden">
      {/* Animated Cloud decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating clouds from right to left */}
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          width={200}
          height={120}
          className="absolute top-8 w-32 h-20 opacity-80 animate-float-right-to-left-slow"
        />
        <Image
          src="/images/white clouds.png"
          alt="White Cloud"
          width={300}
          height={180}
          className="absolute top-48 w-64 h-40 opacity-90 animate-float-right-to-left-slow"
          style={{ animationDelay: '12s' }}
        />
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          width={200}
          height={120}
          className="absolute top-88 w-28 h-16 opacity-75 animate-float-right-to-left-slow"
          style={{ animationDelay: '25s' }}
        />
        <Image
          src="/images/white clouds.png"
          alt="White Cloud"
          width={300}
          height={180}
          className="absolute top-128 w-56 h-36 opacity-85 animate-float-right-to-left-slow"
          style={{ animationDelay: '38s' }}
        />
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          width={200}
          height={120}
          className="absolute top-168 w-20 h-12 opacity-70 animate-float-right-to-left-slow"
          style={{ animationDelay: '50s' }}
        />
        <Image
          src="/images/white clouds.png"
          alt="White Cloud"
          width={300}
          height={180}
          className="absolute top-208 w-72 h-48 opacity-90 animate-float-right-to-left-slow"
          style={{ animationDelay: '62s' }}
        />
      </div>

      {/* Back to Home Link */}
      <div className="absolute top-6 left-8 z-20">
        <Link href="/" className="block hover:scale-110 transition-transform duration-200">
          <Image
            src="/images/clock.png"
            alt="Alarm Clock - Home"
            width={60}
            height={60}
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-8 md:mb-12" 
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '6px 6px 0px white, -6px -6px 0px white, 6px -6px 0px white, -6px 6px 0px white, 4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            Welcome!
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
             style={{ fontFamily: 'var(--font-playfull-daily)' }}>
            You&apos;re now ready to start managing your time effectively!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Past
              </h3>
              <p className="text-gray-700 mb-4">Track your completed tasks and reflect on your progress</p>
              <Link href="/past" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Explore Past
              </Link>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Present
              </h3>
              <p className="text-gray-700 mb-4">Focus on your current tasks and stay productive</p>
              <Link href="/present" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Focus Now
              </Link>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Future
              </h3>
              <p className="text-gray-700 mb-4">Plan ahead and set goals for your future</p>
              <Link href="/future" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Plan Ahead
              </Link>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              Let&apos;s See How Much Time You&apos;ve Lost
            </h2>
            <p className="text-gray-700 mb-6">
              Take a quick quiz to discover how much time you&apos;re currently wasting 
              and learn how to make better use of every precious moment.
            </p>
            <Link href="/quiz" className="inline-block bg-[#F5F184] text-[#AFA20C] px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all duration-150"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              Take the Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 