'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../components/AuthButtons';
import { useEffect, useState } from 'react';

export default function PomodoroPage() {
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(30);

  const handleCustomClick = () => {
    setShowCustomPopup(true);
  };

  const handleCustomConfirm = () => {
    window.location.href = `/pomodoro/timer?duration=${customMinutes}&custom=${customMinutes}`;
  };

  const handleCustomCancel = () => {
    setShowCustomPopup(false);
  };

  useEffect(() => {
    document.body.style.overflow = showCustomPopup ? 'hidden' : '';
  }, [showCustomPopup]);

  return (
    <div className="min-h-screen bg-[#B2E4F6] relative">
      {/* Header Navigation */}
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

      {/* Alarm Clock Icon */}
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
      <main className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            POMODORO TIMER
          </h1>

          {/* Timer Card */}
          <div className="bg-white rounded-2xl p-12 shadow-lg mb-8">
            <div className="text-center mb-8">
              <Image
                src="/images/clock-character.png"
                alt="Clock Character"
                width={120}
                height={120}
                className="w-24 h-24 mx-auto mb-6"
              />
              <h2 className="text-3xl font-bold text-black mb-6"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                CHOOSE YOUR TIMER
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Select the duration that works best for your focus session.
              </p>
            </div>

            {/* Timer Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link href="/pomodoro/timer?duration=25">
                <button className="bg-[#B2E4F6] text-black px-6 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 active:bg-gray-400 active:text-gray-600 transition-all duration-150 w-full"
                        style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  25 MINUTES
                </button>
              </Link>
              <Link href="/pomodoro/timer?duration=45">
                <button className="bg-[#B2E4F6] text-black px-6 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 active:bg-gray-400 active:text-gray-600 transition-all duration-150 w-full"
                        style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  45 MINUTES
                </button>
              </Link>
              <button onClick={handleCustomClick}
                className="bg-[#B2E4F6] text-black px-6 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 active:bg-gray-400 active:text-gray-600 transition-all duration-150 w-full"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                CUSTOM
              </button>
            </div>

            <Link href="/present">
              <button className="bg-gray-300 text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-gray-400 transition-all duration-150"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                GO BACK TO PRESENT
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Custom Timer Popup */}
      {showCustomPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-4 relative">
            <button
              onClick={handleCustomCancel}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                SET CUSTOM TIME
              </h3>
              <p className="text-gray-600 mb-6">Choose your custom timer duration</p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setCustomMinutes((prev) => Math.max(1, prev - 1))}
                className="bg-[#B2E4F6] text-black w-12 h-12 rounded-full text-xl font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 transition-all duration-150"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                -
              </button>
              <div
                className="text-4xl font-bold text-black px-8"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                {customMinutes}
              </div>
              <button
                onClick={() => setCustomMinutes((prev) => Math.min(120, prev + 1))}
                className="bg-[#B2E4F6] text-black w-12 h-12 rounded-full text-xl font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 transition-all duration-150"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                +
              </button>
            </div>

            <div className="text-center text-gray-500 mb-8">minutes</div>

            <div className="flex gap-4">
              <button
                onClick={handleCustomCancel}
                className="flex-1 bg-gray-300 text-black px-6 py-3 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-gray-400 transition-all duration-150"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                CANCEL
              </button>
              <button
                onClick={handleCustomConfirm}
                className="flex-1 bg-[#B2E4F6] text-black px-6 py-3 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white transition-all duration-150"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                START
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
