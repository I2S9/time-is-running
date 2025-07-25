'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../components/AuthButtons';
import Calendar from '../components/Calendar';
import { useState } from 'react';

// Sample journal entries for demonstration
const sampleJournalEntries = [
  {
    id: '1',
    date: '2024-01-15',
    timeSpent: '8 hours working, 2 hours reading',
    mood: 'happy' as const,
    content: 'Had a productive day at work. Finished the project ahead of schedule and felt really accomplished. Spent some time reading in the evening which was relaxing.'
  },
  {
    id: '2',
    date: '2024-01-14',
    timeSpent: '6 hours working, 1 hour exercise, 3 hours with family',
    mood: 'neutral' as const,
    content: 'Regular day at work. Did some exercise in the afternoon which felt good. Spent time with family in the evening.'
  },
  {
    id: '3',
    date: '2024-01-13',
    timeSpent: '4 hours working, 2 hours gaming, 2 hours cooking',
    mood: 'sad' as const,
    content: 'Had a difficult day at work. Some issues with the project made me stressed. Tried to relax with some gaming and cooking.'
  }
];

export default function PastPage() {
  const [journalEntries, setJournalEntries] = useState(sampleJournalEntries);

  const handleDayClick = (date: Date) => {
    console.log('Day clicked:', date);
  };

  return (
    <div className="min-h-screen bg-[#B2E4F6]">
      {/* Header Navigation - Shorter with equidistant elements */}
      <header className="relative z-10 px-8 pt-4">
        <SignedOut>
          <nav className="bg-white rounded-full mx-auto max-w-3xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
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
                <Link href="/past" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
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
      <main className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
                style={{
                  fontFamily: 'var(--font-playfull-daily)',
                  textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
                }}>
              PAST
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore your past days, track your time, and reflect on your journey through your personal journal.
            </p>
          </div>
          
          {/* Calendar Component */}
          <Calendar 
            onDayClick={handleDayClick}
            journalEntries={journalEntries}
          />
        </div>
      </main>
    </div>
  );
} 