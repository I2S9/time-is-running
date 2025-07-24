'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../../components/AuthButtons';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PomodoroTimerPage() {
  const searchParams = useSearchParams();
  const duration = searchParams.get('duration') || '25';
  const customTime = searchParams.get('custom') || '';
  
  const [timeLeft, setTimeLeft] = useState(parseInt(duration) * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  // Handle start/pause
  const toggleTimer = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  // Handle restart
  const restartTimer = () => {
    setTimeLeft(parseInt(duration) * 60);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Get display text
  const getDisplayText = () => {
    if (customTime) {
      return `${customTime} MINUTES`;
    }
    return `${duration} MINUTES`;
  };

  return (
    <div className="min-h-screen bg-[#B2E4F6]">
      {/* Header Navigation - Shorter with equidistant elements */}
      <header className="relative z-10 px-8 pt-4">
        <SignedOut>
          <nav className="bg-white rounded-full mx-auto max-w-3xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedOut>
        <SignedIn>
          <nav className="bg-white rounded-full mx-auto max-w-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedIn>
      </header>

      {/* Alarm Clock Icon - Top Left */}
      <div className="absolute top-8 left-8 z-20">
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
      <main className="relative z-10 px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          {/* Timer Display */}
          <div className="mb-12">
            <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-black mb-8"
                 style={{ 
                   fontFamily: 'var(--font-playfull-daily)',
                   textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
                 }}>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center gap-6 mb-8">
            <button 
              onClick={toggleTimer}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-gray-100 active:scale-95 active:bg-gray-200 active:text-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none transition-all duration-150 relative z-10 cursor-pointer"
              style={{ fontFamily: 'var(--font-playfull-daily)' }}
            >
              {isRunning && !isPaused ? 'PAUSE' : 'RESUME'}
            </button>
            <button 
              onClick={restartTimer}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-gray-100 active:scale-95 active:bg-gray-200 active:text-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none transition-all duration-150 relative z-10 cursor-pointer"
              style={{ fontFamily: 'var(--font-playfull-daily)' }}
            >
              RESTART
            </button>
          </div>

          {/* Back to Timer Selection */}
          <div className="relative inline-block">
            <Link href="/pomodoro">
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-gray-100 active:scale-95 active:bg-gray-200 active:text-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none transition-all duration-150 relative z-10 cursor-pointer"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                GO BACK TO POMODORO
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 